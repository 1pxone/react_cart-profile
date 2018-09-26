import axios from 'axios';
import * as api from './_urls';
import * as actionType from './constants';
import { addressParams } from './addresses_new';
import dataLayer from '../utils/dataLayer';


// PROMO

export function promoIsLoading(bool) {
    return {
        type: actionType.PROMO_IS_LOADING,
        isLoading: bool
    };
}

export function promo(code) {
    return {
        type: actionType.PROMO,
        code
    };
}

export function promoHasErrored(bool) {
    return {
        type: actionType.PROMO_HAS_ERRORED,
        hasErrored: bool
    };
}

export function promoHasFailed(bool) {
    return {
        type: actionType.PROMO_HAS_FAILED,
        hasFailed: bool
    };
}

export function promoNeedAuth(bool) {
    return {
        type: actionType.PROMO_NEED_AUTH,
        needAuth: bool
    };
}

// ADD TO CART

export function addingToCart(bool) {
    return {
        type: actionType.ADDING_TO_CART,
        isAdding: bool
    };
}

export function addToCartSuccess(bool) {
    return {
        type: actionType.ADD_TO_CART_SUSSESS,
        addSuccess: bool
    };
}

export function addToCartHasErrored(bool) {
    return {
        type: actionType.ADD_TO_CART_HAS_ERRORED,
        hasErrored: bool
    };
}

// PREORDER

export function preOrdering(bool) {
    return {
        type: actionType.PRE_ORDERING,
        progress: bool
    };
}

export function preOrderStatus(status) {
    return {
        type: actionType.PRE_ORDER_STATUS,
        status
    };
}


export function preOrderFinally(bool) {
    return {
        type: actionType.PRE_ORDER_FINALLY,
        finally: bool
    };
}

// PAYMENT METHODS

export function paymentMethodsIsLoading(bool) {
    return {
        type: actionType.PAYMENT_IS_LOADING,
        isLoading: bool
    };
}

export function paymentMethods(methods) {
    return {
        type: actionType.PAYMENT_METHODS,
        methods
    };
}

export function paymentMethodsHasErrored(bool) {
    return {
        type: actionType.PAYMENT_HAS_ERRORED,
        hasErrored: bool
    };
}

export function paymentIsUpdating(bool) {
    return {
        type: actionType.PAYMENT_IS_UPDATING,
        isUpdating: bool
    };
}

// DELIVERY_METHODS

export function deliveryMethodsIsLoading(bool) {
    return {
        type: actionType.DELIVERY_IS_LOADING,
        isLoading: bool
    };
}

export function deliveryMethods(methods) {
    return {
        type: actionType.DELIVERY_METHODS,
        methods
    };
}

export function deliveryType(delivery) {
    return {
        type: actionType.DELIVERY_TYPE,
        delivery
    };
}

export function deliveryMethodsHasErrored(bool) {
    return {
        type: actionType.DELIVERY_HAS_ERRORED,
        hasErrored: bool
    };
}

export function deliveryIsUpdating(bool) {
    return {
        type: actionType.DELIVERY_IS_UPDATING,
        isUpdating: bool
    };
}

// CART

export function cartIsLoading(bool) {
    return {
        type: actionType.CART_IS_LOADING,
        isLoading: bool
    };
}

export function cartItems(items) {
    return {
        type: actionType.CART_ITEMS,
        items
    };
}

export function cartAll(cart) {
    return {
        type: actionType.CART_ALL,
        cart
    };
}

export function cartSummary(summary) {
    return {
        type: actionType.CART_SUMMARY,
        summary
    };
}

export function cartHasErrored(bool) {
    return {
        type: actionType.CART_HAS_ERRORED,
        hasErrored: bool
    };
}

export function cartIsUpdating(bool) {
    return {
        type: actionType.CART_IS_UPDATING,
        isUpdating: bool
    };
}

// AUTH DROPDOWN
export function authDropDownVisibility(bool) {
    return {
        type: actionType.AUTH_DROPDOWN_VISIBILITY,
        isOpen: bool
    };
}

// THUNKS

//GET DELIVERY METHODS
export function fetchDeliveryMethods(params){
    return (dispatch,getState) => {
        dispatch(deliveryMethodsIsLoading(true));
        if(params){
            dispatch(addressParams(params))
        }
        axios.get(api.url_delivery_methods + (params ? params : ""))
        .then((response) => {
            return response.data;
        })
        .then((methods) => {
            dispatch(deliveryMethods(methods))
            dispatch(deliveryMethodsIsLoading(false))
            var addresses = getState().addresses;
            var config = getState().getConfigSuccess;
            var addressesExId = addresses.filter(a => ('externalId' in a)).filter(a => (a['isActive'] === true));
            var selfDeliveryMethods = methods.filter(m => config.selfDeliveryMethodIds.includes(m.id));
            var normalMethods = methods.filter(m => !config.selfDeliveryMethodIds.includes(m.id));
            if(addressesExId.length && selfDeliveryMethods.length){
                dispatch(selectDelivery(selfDeliveryMethods[0].id))
            } else if (normalMethods.length === 1) {
                dispatch(selectDelivery(normalMethods[0].id))
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch(deliveryMethodsIsLoading(false))
            dispatch(deliveryMethodsHasErrored(true))
        });
    }
}

//GET DELIVERY METHODS PASSIVE
export function fetchDeliveryMethodsPassive(params){
    return (dispatch, getState) => {
        dispatch(deliveryIsUpdating(true));
        if(params){
            dispatch(addressParams(params))
        }
        axios.get(api.url_delivery_methods + (params ? params : ""))
        .then((response) => {
            return response.data;
        })
        .then((methods) => {
            dispatch(deliveryMethods(methods))
            dispatch(deliveryIsUpdating(false))
            var addresses = getState().addresses;
            var config = getState().getConfigSuccess;
            var addressesExId = addresses.filter(a => ('externalId' in a)).filter(a => (a['isActive'] === true));
            var selfDeliveryMethods = methods.filter(m => config.selfDeliveryMethodIds.includes(m.id));
            var normalMethods = methods.filter(m => !config.selfDeliveryMethodIds.includes(m.id));
            if(addressesExId.length && selfDeliveryMethods.length === 1){
                dispatch(selectDelivery(selfDeliveryMethods[0].id))
            } else if (normalMethods.length === 1) {
                dispatch(selectDelivery(normalMethods[0].id))
            } else {
                dispatch(fetchCartPassive())
                dispatch(fetchPaymentMethods())
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch(deliveryIsUpdating(false))
            dispatch(deliveryMethodsHasErrored(true))
        });
    }
}

//GET PAYMENT METHODS
export function fetchPaymentMethods(params){
    return (dispatch, getState) => {
        dispatch(paymentMethodsIsLoading(true));
        var params = getState().addressParams;
        axios.get(api.url_payment_methods + (params ? params : ""))
        .then((response) => {
            return response.data;
        })
        .then((methods) => {
            if(methods.length && methods.length === 1){
                dispatch(selectPayment(methods[0].id))
            }
            dispatch(paymentMethods(methods))
            dispatch(paymentMethodsIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(paymentMethodsIsLoading(false))
            dispatch(paymentMethodsHasErrored(true))
        });
    }
}

//GET CART
export function fetchCart(){
    return (dispatch) => {
        dispatch(cartIsLoading(true));
        axios.get(api.url_cart)
        .then((response) => {
            return response.data;
        })
        .then((cart) => {
            dispatch(cartItems(cart.items))
            dispatch(cartAll(cart))
            //summary
            dispatch(cartSummary(cart.summary && Object.keys(cart.summary).length ? cart.summary : ""))
            //promocode
            if (typeof cart.promo !== "undefined"){
                if (cart.promo.code){
                    dispatch(promo(cart.promo.code))
                    dispatch(promoHasErrored(false))
                } else if(cart.promo.msg === "fail"){
                    dispatch(promoHasErrored(true))
                } else {
                    dispatch(promo(null))
                    dispatch(promoHasErrored(false))
                }
            } else {
                dispatch(promo(null))
                dispatch(promoHasErrored(false))
            }
            dispatch(cartIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(cartIsLoading(false))
            dispatch(cartHasErrored(true))
        });
    }
}

// GET CART ON DEMAND
export function fetchCartPassive(){
    return (dispatch) => {
        dispatch(cartIsUpdating(true));
        axios.get(api.url_cart)
        .then((response) => {
            return response.data;
        })
        .then((cart) => {
            dispatch(cartItems(cart.items))
            dispatch(cartAll(cart))
            //summary
            dispatch(cartSummary(cart.summary && Object.keys(cart.summary).length ? cart.summary : ""))
            //promocode
            if (typeof cart.promo !== "undefined"){
                if (cart.promo.code){
                    dispatch(promo(cart.promo.code))
                    dispatch(promoHasErrored(false))
                } else if(cart.promo.msg === "fail"){
                    dispatch(promoHasErrored(true))
                } else {
                    dispatch(promo(null))
                    dispatch(promoHasErrored(false))
                }
            } else {
                dispatch(promo(null))
                dispatch(promoHasErrored(false))
            }
            dispatch(cartIsUpdating(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(cartIsUpdating(false))
            dispatch(cartHasErrored(true))
        });
    }
}

// ADD TO CART
export function addToCart(data, sku){
    return (dispatch) => {
        dispatch(addingToCart(true));
        var url = api.url_cart + "/" + sku;
        axios.post(url, data)
        .then((response) => {
            dispatch(addingToCart(false))
            dispatch(addToCartSuccess(true))
            dispatch(fetchCartPassive())
            return response.data;

        })
        .catch((err) => {
            console.log(err)
            dispatch(addingToCart(false))
            dispatch(addToCartHasErrored(true))
        });
    }
}

//PRE-ORDER
export function preOrder(sku) {
    return (dispatch, getState) => {
        const url = `/notify/add_notify_sku/${sku}`;
        const isAuth = getState().userIsAuth;

        if (isAuth) {
            dispatch(preOrdering(true));

            axios.post(url)
                .then((response) => {
                    dispatch(preOrdering(false));
                    dispatch(preOrderStatus(response.status));
                    dispatch(preOrderFinally(true));
                })
                .catch((response) => {
                    dispatch(preOrdering(false));
                    dispatch(preOrderStatus(response.status));
                    dispatch(preOrderFinally(true));
                });
        } else {
            dispatch(authDropDownVisibility(true));
            dispatch(preOrderFinally(true));
            dispatch(preOrderStatus(401));
        }
    }
}

// CHANGE QTY OF ITEM IN CART
export function patchQty(sku, operation, current){
    return (dispatch) => {
        dispatch(cartIsUpdating(true));
        var url = api.url_cart + "/" + sku;
        switch (operation) {
            case "increase":
                axios.patch(url, {"qty": ++current})
                .then((response) => {
                    dispatch(fetchCartPassive())
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(cartIsUpdating(false));
                });
                break;
            case "decrease":
                axios.patch(url, {"qty": --current})
                .then((response) => {
                    if(response.status === 500){
                        throw Error(response.statusText)
                    }
                    dispatch(fetchCartPassive())
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(cartIsUpdating(false));
                });
                break;
            default: break;
        }
    }
}

// DELETE ITEM FROM CART
export function deleteItem(sku){
    return (dispatch) => {
        dispatch(cartIsUpdating(true));
        var url = api.url_cart + "/" + sku;
        axios.delete(url)
        .then((response) => {
            dispatch(fetchCartPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(cartIsUpdating(false));
        });
    }
}

// SELECT DELIVERY METHOD
export function selectDelivery(id){
    return (dispatch) => {
        dispatch(deliveryIsUpdating(true));
        axios.post(api.url_cart, {"delivery": id})
        .then((response) => {
            return response.data;
        })
        .then((cart) => {
            dispatch(cartSummary(cart.summary && Object.keys(cart.summary).length ? cart.summary : ""))
            dispatch(deliveryIsUpdating(false))
            dispatch(fetchPaymentMethods())
            dataLayer(cart, 3)
        })
        .catch((err) => {
            console.log(err)
            dispatch(deliveryIsUpdating(false))
            dispatch(deliveryMethodsHasErrored(true))
        });
    }
}

// SELECT PAYMENT METHOD
export function selectPayment(id){
    return (dispatch) => {
        dispatch(paymentIsUpdating(true));
        axios.post(api.url_cart, {"payment": id})
        .then((response) => {
            return response.data;
        })
        .then((cart) => {
            dispatch(cartSummary(cart.summary && Object.keys(cart.summary).length ? cart.summary : ""))
            dispatch(paymentIsUpdating(false))
            dataLayer(cart, 4)
        })
        .catch((err) => {
            console.log(err)
            dispatch(paymentIsUpdating(false))
            dispatch(paymentMethodsHasErrored(true))
        });
    }
}

// SUBMIT PROMOCODE
export function submitPromo(code, email){
    if(code !== ""){
        return (dispatch, getState) => {

            dispatch(promoNeedAuth(false))
            dispatch(promoHasFailed(false))
            dispatch(promoHasErrored(false))

            var isAuth = getState().userIsAuth;
            dispatch(promoIsLoading(true));
            var data = {"promo": code};
            if (email) {
                data["promo_email"] = email;
            }
            axios.post(api.url_cart, data)
            .then((response) => {
                return response.data;
            })
            .then((cart) => {
                if(!("promo" in cart)){
                    if(!isAuth){
                        dispatch(promoNeedAuth(true))
                    } else {
                        dispatch(promoHasFailed(true))
                    }
                }
                dispatch(promoIsLoading(false))
                dispatch(fetchCartPassive())
            })
            .catch((err) => {
                console.log(err)
                dispatch(promoIsLoading(false))
                dispatch(promoHasErrored(true))
            });
        }
    }
}
