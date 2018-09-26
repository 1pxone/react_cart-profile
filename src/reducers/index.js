import { combineReducers } from 'redux';
import { orderIsPlacing, orderId, orderHasErrored, orderPaymentIsLoading, orderPaymentSrc, orderComment, ordersIsLoading, ordersIsUpdating, orders, ordersHasErrored } from './orders';
import { addressParams, addressesHasErrored, addressesIsLoading, addresses, addressesIsUpdating, addressesIsAdding, addressesAddSuccess, addressesAddHasErrored, pickUpPointsHasErrored, pickUpPointsIsLoading, pickUpPoints, geoIpHasErrored, geoIpIsLoading, geoIpData  } from './addresses_new';
import { recipientsHasErrored, recipientsIsLoading, recipients, recipientsIsUpdating, recipientsIsAdding, recipientsAddSuccess, recipientsAddHasErrored } from './recipients';
import { getConfigRequest, getConfigSuccess } from './config';
import { userIsLoading, user, userHasErrored, userIsAuth, userErrors, userSubscriptionIsUpdating, userSubscriptionHasErrored, userSubscriptionErrors, userIsUpdating, userUpdateHasErrored, userUpdateErrors, userLoginRequest, userLoginHasErrored, userLoginErrors, userLogoutRequest, userLogoutHasErrored, userLogoutErrors, userRestoreRequest, userRestoreHasErrored, userRestoreErrors, userRestoreSuccess, userRegisterRequest, userRegisterHasErrored, userRegisterErrors, userChangePassRequest, userChangePassHasErrored, userChangePassErrors, userFastRegisterRequest, userFastRegisterHasErrored, userFastRegisterErrors, userFastRegisterForm } from './user';
import { routerReducer } from 'react-router-redux';
import { cartIsLoading, cartHasErrored, cartItems, cartIsUpdating, cartSummary,
deliveryMethods, deliveryMethodsIsLoading, deliveryMethodsIsUpdating, deliveryMethodsHasErrored, deliveryType,
paymentMethods, paymentMethodsIsLoading, paymentMethodsIsUpdating, paymentMethodsHasErrored,
promoIsLoading, promo, promoHasErrored, promoNeedAuth, promoHasFailed,
addingToCart, addToCartSuccess, addToCartHasErrored, preOrdering, preOrderStatus, preOrderFinally, authDropDownVisibility, cartAll } from './cart_new';

export default combineReducers({
    orderIsPlacing, orderId, orderHasErrored, orderPaymentIsLoading, orderPaymentSrc, orderComment, ordersIsLoading, ordersIsUpdating, orders, ordersHasErrored,
    //updated
    cartIsLoading, cartHasErrored, cartItems, cartIsUpdating, cartSummary,
    deliveryMethods, deliveryMethodsIsLoading, deliveryMethodsIsUpdating, deliveryMethodsHasErrored, deliveryType,
    paymentMethods, paymentMethodsIsLoading, paymentMethodsIsUpdating, paymentMethodsHasErrored,
    promoIsLoading, promo, promoHasErrored, promoNeedAuth, promoHasFailed,
    addingToCart, addToCartSuccess, addToCartHasErrored, preOrdering, preOrderStatus, preOrderFinally, authDropDownVisibility, cartAll,
    addressParams, addressesHasErrored, addressesIsLoading, addresses, addressesIsUpdating, addressesIsAdding, addressesAddSuccess, addressesAddHasErrored, pickUpPointsHasErrored, pickUpPointsIsLoading, pickUpPoints,
    geoIpHasErrored, geoIpIsLoading, geoIpData,
    recipientsHasErrored, recipientsIsLoading, recipients, recipientsIsUpdating, recipientsIsAdding, recipientsAddSuccess, recipientsAddHasErrored,
    //
    userIsLoading, user, userHasErrored, userIsAuth, userErrors, userSubscriptionIsUpdating, userSubscriptionHasErrored, userSubscriptionErrors, userIsUpdating, userUpdateHasErrored, userUpdateErrors, userLoginRequest, userLoginHasErrored, userLoginErrors, userLogoutRequest, userLogoutHasErrored, userLogoutErrors, userRestoreRequest, userRestoreHasErrored, userRestoreErrors, userRestoreSuccess, userRegisterRequest, userRegisterHasErrored, userRegisterErrors, userChangePassRequest, userChangePassHasErrored, userChangePassErrors, userFastRegisterRequest, userFastRegisterHasErrored, userFastRegisterErrors, userFastRegisterForm,
    getConfigRequest, getConfigSuccess,
    routerReducer
});
