import * as types from './actionType'
const defaultState = {
    list:[],
    city:{}
}
export default (state = defaultState, action) => {
    switch(action.type){
        case types.GETCITYLIST : {
            return {
                ...state,
                list: action.value
            }
        }
        case types.POSTCITY: {
            return{
                ...state,
                city: action.value
            }
        }
        default : {
            return state
        }
    }
}