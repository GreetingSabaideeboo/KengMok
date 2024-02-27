import { combineReducers } from 'redux'
import { userReducer } from "./userRedux"

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer