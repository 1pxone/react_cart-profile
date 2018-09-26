//action creators
import axios from 'axios';
import * as actionType from './constants';
import * as api from './_urls';
import { push } from 'react-router-redux';
import { fetchCartPassive } from './cart_new';
import dataLayer from '../utils/dataLayer';

export function orderIsPlacing(bool) {
    return {
        type: actionType.ORDER_IS_PLACING,
        isPlacing: bool
    };
}

export function orderId(order) {
    return {
        type: actionType.ORDER_ID,
        order
    };
}

export function orderComment(text) {
    return {
        type: actionType.ORDER_COMMENT,
        text
    };
}

export function orderHasErrored(bool) {
    return {
        type: actionType.ORDER_HAS_ERRORED,
        hasErrored: bool
    };
}

export function orderPaymentIsLoading(bool) {
    return {
        type: actionType.ORDER_PAYMENT_IS_LOADING,
        paymentIsLoaing: bool
    };
}

export function orderPaymentSrc(src) {
    return {
        type: actionType.ORDER_PAYMENT_SRC,
        paymentSrc: src
    };
}

export function ordersHasErrored(bool) {
    return {
        type: actionType.ORDERS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function ordersIsLoading(bool) {
    return {
        type: actionType.ORDERS_IS_LOADING,
        isLoading: bool
    };
}

export function ordersIsUpdating(bool) {
    return {
        type: actionType.ORDERS_IS_UPDATING,
        isUpdating: bool
    };
}

export function orders(orders) {
    return {
        type: actionType.ORDERS,
        orders
    };
}

//GET ORDERS
export function getOrders(){
    return (dispatch) => {
        dispatch(ordersIsLoading(true));
        axios.get(api.url_user_order)
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            dispatch(orders(data))
            dispatch(ordersIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(ordersIsLoading(false))
            dispatch(ordersHasErrored(true))
        });
    }
}

export function getOrdersPassive(){
    return (dispatch) => {
        dispatch(ordersIsUpdating(true));
        axios.get(api.url_user_order)
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            dispatch(orders(data))
            dispatch(ordersIsUpdating(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(ordersIsUpdating(false))
            dispatch(ordersHasErrored(true))
        });
    }
}

// PLACE ORDER
export function submitOrder(payment_type){
    return (dispatch, getState) => {
        var cartAll = getState().cartAll;
        var comment = getState().orderComment;
        var data = {"comment": comment};
        dispatch(orderIsPlacing(true));
        axios.post(api.url_order, data)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            dispatch(orderId(response.data.id+""))
            return response;

        })
        .then((response) => {
            if (typeof response.data !== "undefined"){
                if (response.data.success && response.data.id){
                    dispatch(orderIsPlacing(false))
                    if(payment_type && (payment_type === "pay_card" || payment_type === "qiwi" || payment_type === "yandex_money")){
                        dispatch(getPaymentSrc(response.data.id))
                    }
                    cartAll['orderId'] = response.data.id;
                    dispatch(push('/cart/success'))
                    dispatch(fetchCartPassive())
                    dataLayer(cartAll, 5)
                } else {
                    dispatch(orderHasErrored(true))
                    dispatch(orderIsPlacing(false))
                }
            } else {
                dispatch(orderHasErrored(true))
                dispatch(orderIsPlacing(false))
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch(orderHasErrored(true))
            dispatch(orderIsPlacing(false))
        });
    }
}

export function fastOrder(delivery, payment){
    return (dispatch) => {
        axios.post(api.url_cart, {"payment": payment, "delivery": delivery})
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data;
        })
        .then(() => {
            dispatch(submitOrder(payment))
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export function getPaymentSrc(orderid){
    return (dispatch) => {
        dispatch(orderPaymentIsLoading(true));
        axios.get(api.url_uniteller + orderid)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data;
        })
        .then(src => {
            dispatch(orderPaymentSrc(src));
            dispatch(orderPaymentIsLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(orderPaymentIsLoading(false));
        });
    }
}

export function changePaymentType(orderId, paymentId){
    return (dispatch) => {
        dispatch(ordersIsUpdating(true))
        var url = api.url_user_order + "/" + orderId;
        var data = {"paymentType": paymentId};
        axios.patch(url, data)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data;
        })
        .then(() => {
            dispatch(getOrdersPassive())
        })
        .catch((err) => {
            console.log(err);
            dispatch(orderHasErrored(true))
            dispatch(ordersIsUpdating(false))
        });
    }
}
