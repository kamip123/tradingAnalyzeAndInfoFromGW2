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
        default:
            return state;
    }
};

export default authReducer