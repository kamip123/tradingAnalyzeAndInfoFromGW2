const initState = {
    plans: []
};

const planReducer = ( state = initState, action) => {
    switch(action.type){
        case 'CREATE_PLAN':
            return state;
        case 'CREATE_PLAN_ERROR':
            return state;
        default:
            return state;
    }
};

export default planReducer