import { combineReducers } from 'redux'
import {
    HeaderReducer,
    BargainBtnStatus,
    GetCityList,
    GetCarList
} from './reducerName'

const reducer = combineReducers({
    header: HeaderReducer,
    bargain: BargainBtnStatus,
    city:GetCityList,
    car:GetCarList
})

export default reducer