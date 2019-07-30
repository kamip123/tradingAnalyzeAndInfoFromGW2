const initState = {
    error: null
};

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error.message
            };
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'SIGNOUT_ERROR':
            return {
                ...state,
                error: null
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                error: action.error.message
            };
        case 'UPDATE_BIO_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'UPDATE_BIO_ERROR':
            return {
                ...state,
                error: action.error.message
            };
        case 'PASSWORD_CHANGE_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'PASSWORD_CHANGE_ERROR':
            return {
                ...state,
                error: action.error.message
            };
        case 'EMAIL_CHANGE_SUCCESS':
            return {
                ...state,
                error: null
            };
        case 'EMAIL_CHANGE_ERROR':
            return {
                ...state,
                error: action.error.message
            };
        default:
            return state;
    }
};

export default authReducer