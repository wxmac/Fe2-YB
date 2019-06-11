import * as types from './actionType'
const defaultState = {
    list:[],
}
export default (state = defaultState, action) => {
    switch(action.type){
        case types.POSTCAR : {
            return {
                ...state,
                list: action.value
            }
        }
        default : {
            return state
        }
    }
}