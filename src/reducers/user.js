import * as actionType from '../actions/constants';

export function userIsLoading(state = false, action){
    switch (action.type) {
        case actionType.USER_IS_LOADING:
            return action.isLoaing;
        default:
            return state;
    }
}
export function user(state = "", action){
    switch (action.type) {
        case actionType.USER_GET_SUCCESS:
            return action.user;
        default:
            return state;
    }
}
export function userHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userIsAuth(state = false, action){
    switch (action.type) {
        case actionType.USER_IS_AUTH:
            return action.isAuth;
        default:
            return state;
    }
}
export function userErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export function userSubscriptionIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.USER_SUBSCRIPTION_IS_UPDATING:
            return action.isUpdating;
        default:
            return state;
    }
}
export function userSubscriptionHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_SUBSCRIPTION_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userSubscriptionErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_SUBSCRIPTION_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export function userIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.USER_IS_UPDATING:
            return action.isUpdating;
        default:
            return state;
    }
}
export function userUpdateHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_UPDATE_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userUpdateErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_UPDATE_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export function userLoginRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_LOGIN_REQUEST:
            return action.loginRequest;
        default:
            return state;
    }
}
export function userLoginHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_LOGIN_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userLoginErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_LOGIN_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export function userLogoutRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_LOGOUT_REQUEST:
            return action.logoutRequest;
        default:
            return state;
    }
}
export function userLogoutHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_LOGOUT_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userLogoutErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_LOGOUT_ERRORS:
            return action.errors;
        default:
            return state;
    }
}



export function userRestoreRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_RESTORE_REQUEST:
            return action.restoreRequest;
        default:
            return state;
    }
}
export function userRestoreHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_RESTORE_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userRestoreErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_RESTORE_ERRORS:
            return action.errors;
        default:
            return state;
    }
}
export function userRestoreSuccess(state = false, action){
    switch (action.type) {
        case actionType.USER_RESTORE_SUCCESS:
            return action.restoreSuccess;
        default:
            return state;
    }
}


export function userRegisterRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_REGISTER_REQUEST:
            return action.registerRequest;

        default:
            return state;
    }
}
export function userRegisterHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_REGISTER_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userRegisterErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_REGISTER_ERRORS:
            return action.errors;

        default:
            return state;
    }
}

export function userFastRegisterRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_FAST_REGISTER_REQUEST:
            return action.registerRequest;

        default:
            return state;
    }
}
export function userFastRegisterHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_FAST_REGISTER_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userFastRegisterErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_FAST_REGISTER_ERRORS:
            return action.errors;

        default:
            return state;
    }
}
export function userFastRegisterForm(state = {}, action){
    switch (action.type) {
        case actionType.USER_FAST_REGISTER_FORM:
            return action.form;

        default:
            return state;
    }
}

export function userChangePassRequest(state = false, action){
    switch (action.type) {
        case actionType.USER_CHANGE_PASS_REQUEST:
            return action.changePassRequest;

        default:
            return state;
    }
}
export function userChangePassHasErrored(state = false, action){
    switch (action.type) {
        case actionType.USER_CHANGE_PASS_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}
export function userChangePassErrors(state = [], action){
    switch (action.type) {
        case actionType.USER_CHANGE_PASS_ERRORS:
            return action.errors;

        default:
            return state;
    }
}
