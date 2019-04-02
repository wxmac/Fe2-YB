import * as types from './actionType'
const defaultState = {
    data:{}
}
export default (state = defaultState, action) => {
    switch(action.type) {
        case types.GETSTATUS: {
            return{
                ...state,
                data: action.value
            }
        }
        default:{
            return state
        }
    }
}