const initState = {
    showDrawer: false
};

const utilityReducer = ( state = initState, action) => {
    if (action.type === 'CHANGE_DRAWER'){
        return{
            ...state,
            showDrawer: action.state
        }
    }
    return state
};

export default utilityReducer