import planReducer from './planReducer'
import utilityReducer from './utilityReducer'
import authReducer from './authReducer'
import guildReducer from './guildReducer'
import { combineReducers } from "redux";
import { firestoreReducer  } from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
   auth: authReducer,
   plan: planReducer,
   utility: utilityReducer,
   guild: guildReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer
});

export default rootReducer