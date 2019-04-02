import * as type from './actionTypes'
const stateDefault = {
    list:[],
    showModle: false
}

export default (state = stateDefault, action) => {
    switch(action.type) {
        case type.GETLIST: {
            return {
                ...state,
                list: action.value
            }
        }
        case type.OPENMODEL: {
            return{
                ...state,
                showModle: true
            }
        }
        case type.HIDEMODEL: {
            return{
                ...state,
                showModle: false
            }
        }
        default: {
            return state
        }
    }
}