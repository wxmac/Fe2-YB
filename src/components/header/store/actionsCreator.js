import * as type from './actionTypes'

export const get_list_info = (data) => {
    return {
        type : type.GETLIST,
        value : data
    }
}

export const get_list = () => {
    return (dispatch) => {
        fetch('/api/header.json')
        .then( res => res.json())
        .then( (res) => {
            if( res && res.ret && res.data ){
                const action1 = get_list_info(res.data.list)
                dispatch(action1)
            }
        })
    }
}

export const open_modle = () => {
    return {
        type : type.OPENMODEL
    }
}

export const hide_model = () => {
    return {
        type : type.HIDEMODEL
    }
}