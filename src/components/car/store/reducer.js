import * as types from './actionType'
const defaultState = {
    list:[],
    secondList:[],
    threeList:[],
    carInfo:{}
}
export default (state = defaultState, action) => {
    switch(action.type){
        case types.GETCARLIST : {
            return {
                ...state,
                list: action.value
            }
        }
        case types.GETSECONDCARLIST : {
            return {
                ...state,
                secondList: action.value
            }
        }
        case types.GETTHREELIST : {
            return {
                ...state,
                threeList: action.value
            }
        }
        case types.POSTCAR: {
            return{
                ...state,
                carInfo: action.value
            }
        }
        
        default : {
            return state
        }
    }
}