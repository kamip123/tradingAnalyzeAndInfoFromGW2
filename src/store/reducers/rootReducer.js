import authReducer from './authReducer'
import planReducer from './planReducer'
import utilityReducer from './utilityReducer'
import guildReducer from './guildReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
   auth: authReducer,
   plan: planReducer,
   utility: utilityReducer,
   guild: guildReducer
});

export default rootReducer