//action creators
import axios from 'axios';
import * as api from './_urls';
import * as actionType from './constants';
import { checkErrorsDeeper } from '../utils/';
import { fetchCartPassive } from './cart_new';
import { fastOrder } from './orders';

//Main user actions
export function userIsLoading(bool) {
    return {
        type: actionType.USER_IS_LOADING,
        isLoaing: bool
    };
}
export function userGetSuccess(user) {
    return {
        type: actionType.USER_GET_SUCCESS,
        user
    };
}
export function userHasErrored(bool) {
    return {
        type: actionType.USER_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userIsAuth(bool) {
    return {
        type: actionType.USER_IS_AUTH,
        isAuth: bool
    };
}
export function userErrors(errors) {
    return {
        type: actionType.USER_ERRORS,
        errors: errors
    };
}
//Subscribe actions
export function userSubscriptionIsUpdating(bool) {
    return {
        type: actionType.USER_SUBSCRIPTION_IS_UPDATING,
        isUpdating: bool
    };
}
export function userSubscriptionHasErrored(bool) {
    return {
        type: actionType.USER_SUBSCRIPTION_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userSubscriptionErrors(errors) {
    return {
        type: actionType.USER_SUBSCRIPTION_ERRORS,
        errors: errors
    };
}
//Update actions
export function userIsUpdating(bool) {
    return {
        type: actionType.USER_IS_UPDATING,
        isUpdating: bool
    };
}
export function userUpdateHasErrored(bool) {
    return {
        type: actionType.USER_UPDATE_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userUpdateErrors(errors) {
    return {
        type: actionType.USER_UPDATE_ERRORS,
        errors: errors
    };
}
//Login actions
export function userLoginRequest(bool) {
    return {
        type: actionType.USER_LOGIN_REQUEST,
        loginRequest: bool
    };
}
export function userLoginHasErrored(bool) {
    return {
        type: actionType.USER_LOGIN_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userLoginErrors(errors) {
    return {
        type: actionType.USER_LOGIN_ERRORS,
        errors: errors
    };
}
//Restore actions
export function userRestoreRequest(bool) {
    return {
        type: actionType.USER_RESTORE_REQUEST,
        restoreRequest: bool
    };
}
export function userRestoreHasErrored(bool) {
    return {
        type: actionType.USER_RESTORE_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userRestoreErrors(errors) {
    return {
        type: actionType.USER_RESTORE_ERRORS,
        errors: errors
    };
}
export function userRestoreSuccess(bool) {
    return {
        type: actionType.USER_RESTORE_SUCCESS,
        restoreSuccess: bool
    };
}
//Register actions
export function userRegisterRequest(bool) {
    return {
        type: actionType.USER_REGISTER_REQUEST,
        registerRequest: bool
    };
}
export function userRegisterHasErrored(bool) {
    return {
        type: actionType.USER_REGISTER_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userRegisterErrors(errors) {
    return {
        type: actionType.USER_REGISTER_ERRORS,
        errors: errors
    };
}

//Fast Register actions
export function userFastRegisterRequest(bool) {
    return {
        type: actionType.USER_FAST_REGISTER_REQUEST,
        registerRequest: bool
    };
}
export function userFastRegisterHasErrored(bool) {
    return {
        type: actionType.USER_FAST_REGISTER_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userFastRegisterErrors(errors) {
    return {
        type: actionType.USER_FAST_REGISTER_ERRORS,
        errors: errors
    };
}

export function userFastRegisterForm(form) {
    return {
        type: actionType.USER_FAST_REGISTER_FORM,
        form
    };
}

//Logout actions
export function userLogoutRequest(bool) {
    return {
        type: actionType.USER_LOGOUT_REQUEST,
        logoutRequest: bool
    };
}
export function userLogoutHasErrored(bool) {
    return {
        type: actionType.USER_LOGOUT_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userLogoutErrors(errors) {
    return {
        type: actionType.USER_LOGOUT_ERRORS,
        errors: errors
    };
}
//change pass actions
export function userChangePassRequest(bool) {
    return {
        type: actionType.USER_CHANGE_PASS_REQUEST,
        changePassRequest: bool
    };
}
export function userChangePassHasErrored(bool) {
    return {
        type: actionType.USER_CHANGE_PASS_HAS_ERRORED,
        hasErrored: bool
    };
}
export function userChangePassErrors(errors) {
    return {
        type: actionType.USER_CHANGE_PASS_ERRORS,
        errors: errors
    };
}

export function updateUserPass(data){
    return (dispatch) => {
        dispatch(userChangePassErrors([]));
        dispatch(userChangePassHasErrored(false));
        dispatch(userChangePassRequest(true));
        axios.patch(api.url_user_password, data)
          .then((response) => {
            dispatch(userChangePassRequest(false));
            return response;
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userChangePassErrors(errors));
                dispatch(userChangePassHasErrored(true));
                dispatch(userChangePassRequest(false));
            }
        })
    }
}

export function restorePass(email){
    return (dispatch) => {
        dispatch(userRestoreErrors([]));
        dispatch(userRestoreHasErrored(false));
        dispatch(userRestoreSuccess(false));
        dispatch(userRestoreRequest(true));
        axios.post(api.url_user_resetpass, email)
        .then((response) => {
            if(response.data && response.data.success === true){
                dispatch(userRestoreSuccess(true));
            }
            dispatch(userRestoreRequest(false));
            return response
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                errors.push(err.response.data.reason);
                // var target = err.response.data.errors.children;
                // checkErrorsDeeper(target,errors,"errors");
                dispatch(userRestoreErrors(errors));
                dispatch(userRestoreHasErrored(true));
                dispatch(userRestoreRequest(false));
            }
        })
    }
}

export function updateUserData(data){
    return (dispatch) => {
        dispatch(userUpdateErrors([]));
        dispatch(userUpdateHasErrored(false));
        dispatch(userIsUpdating(true));
        axios.post(api.url_user, data)
        .then((response) => {
            dispatch(fetchUserDataPassive())
            return response
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                // errors.push(err.response.data.reason)
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userUpdateErrors(errors));
                dispatch(userUpdateHasErrored(true));
                dispatch(userIsUpdating(false));
            }
        })
    }
}

export function updateUserSubscription(data){
    return (dispatch) => {
        dispatch(userSubscriptionErrors([]));
        dispatch(userSubscriptionHasErrored(false));
        dispatch(userSubscriptionIsUpdating(true));
        axios.post(api.url_user, data)
        .then((response) => {
            dispatch(fetchUserDataPassive())
            return response
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                // errors.push(err.response.data.reason)
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userSubscriptionErrors(errors));
                dispatch(userSubscriptionHasErrored(true));
                dispatch(userSubscriptionIsUpdating(false));
            }
        })
    }
}

export function fetchUserDataPassive(){
    return (dispatch) => {
        dispatch(userErrors([]));
        dispatch(userHasErrored(false));
        dispatch(userIsUpdating(true));
        axios.get(api.url_user)
        .then((response) => {
            return response.data
        })
        .then((user) => {
            dispatch(userGetSuccess(user));
            if(Object.keys(user).length === 0){
                dispatch(userIsAuth(false));
            } else {
                dispatch(userIsAuth(true));
            }
            dispatch(userIsUpdating(false));
            dispatch(userSubscriptionIsUpdating(false));
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                // errors.push(err.response.data.reason)
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userErrors(errors));
                dispatch(userHasErrored(true));
                dispatch(userIsUpdating(false));
            }
        })
    }
}

export function fetchUserData(){
    return (dispatch) => {
        dispatch(userErrors([]));
        dispatch(userHasErrored(false));
        dispatch(userIsLoading(true));
        axios.get(api.url_user)
        .then((response) => {
            return response.data
        })
        .then((user) => {
            dispatch(userGetSuccess(user));
            if(Object.keys(user).length === 0){
                dispatch(userIsAuth(false));
            } else {
                dispatch(userIsAuth(true));
            }
            dispatch(userIsLoading(false));
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                // errors.push(err.response.data.reason)
                // var target = err.response.data.errors.children;
                // checkErrorsDeeper(target,errors,"errors");
                dispatch(userErrors(errors));
                dispatch(userHasErrored(true));
                dispatch(userIsLoading(false));
            }
        })
    }
}

export function logout(){
    return (dispatch) => {
        dispatch(userLogoutErrors([]));
        dispatch(userLoginHasErrored(false));
        dispatch(userLogoutRequest(true));
        axios.post('/logout').then(function () {
            dispatch(userLogoutRequest(false))
            window.location.reload()
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                errors.push(err.response.data.reason)
                // var target = err.response.data.errors.children;
                // checkErrorsDeeper(target,errors,"errors");
                dispatch(userLogoutErrors(errors));
                dispatch(userLoginHasErrored(true));
                dispatch(userLogoutRequest(false));
            }
        })
    }
}

export function login(data){
    return (dispatch) => {
        dispatch(userLoginErrors([]));
        dispatch(userLoginHasErrored(false));
        dispatch(userLoginRequest(true));
        axios.post(api.url_login, data)
        .then(res => {
            dispatch(fetchUserData())
            dispatch(fetchCartPassive())
            dispatch(userLoginRequest(true))
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                errors.push(err.response.data.reason);
                // var target = err.response.data.errors.children;
                // checkErrorsDeeper(target,errors,"errors");
                dispatch(userLoginErrors(errors));
                dispatch(userLoginHasErrored(true));
                dispatch(userLoginRequest(false));
            }
        })
    }
}

export function register(form){
    return (dispatch) => {
        dispatch(userRegisterErrors([]));
        dispatch(userRegisterHasErrored(false));
        dispatch(userRegisterRequest(true));
        var form_data = new FormData();
        for ( var key in form ){
            var fieldvalue = form[key];
            if (key === "fos_user_registration_form[phone]"){
                fieldvalue = fieldvalue.replace(/[^0-9]/gim,'');
            }
            form_data.append(key, fieldvalue);
        };
        axios.post(api.url_register, form_data)
        .then(res => {
            dispatch(fetchUserData());
            dispatch(userRegisterRequest(false));
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                console.log(err)
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userRegisterErrors(errors));
                dispatch(userRegisterHasErrored(true));
                dispatch(userRegisterRequest(false));
            }
        })
    }
}

export function fastRegister(form){
    return (dispatch, getState) => {
        dispatch(userFastRegisterErrors([]));
        dispatch(userFastRegisterHasErrored(false));
        dispatch(userFastRegisterRequest(true));
        var summary = getState().cartSummary;
        var delivery = summary.delivery.id;
        var payment = summary.payment.id;
        form.phone = form.phone.replace(/[^0-9]/gim,'');
        axios.post(api.url_fast_register, form)
        .then(res => {
            // dispatch(fetchUserData());
            dispatch(userFastRegisterRequest(false));
            dispatch(fastOrder(delivery, payment));
            dispatch(fetchUserDataPassive());
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                console.log(err)
                // var target = err.response.data.errors.children;
                // checkErrorsDeeper(target,errors,"errors");
                dispatch(userFastRegisterErrors(errors));
                dispatch(userFastRegisterHasErrored(true));
                dispatch(userFastRegisterRequest(false));
            }
        })
    }
}
