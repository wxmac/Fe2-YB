import { combineReducers } from 'redux'
import {
    HeaderReducer,BargainBtnStatus
} from './reducerName'

const reducer = combineReducers({
    header: HeaderReducer,
    bargain: BargainBtnStatus
})

export default reducer