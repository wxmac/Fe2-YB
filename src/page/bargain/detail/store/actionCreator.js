import * as type from './actionType'
import fetch from '@/units/api'
export const  action_getStatus =  () => {
    return  (dispatch) => {
        fetch.get('/api/state.json', (res) => {
            const action =  post_getStatus(res.data.data)
            dispatch(action)
        })
    }
}

export const post_getStatus = (value) => {
    return{
        type: type.GETSTATUS ,
        value: value
    }
}