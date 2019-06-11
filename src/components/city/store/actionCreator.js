import * as types from './actionType'
import fetch from '@/units/api'
export const get_cityList = () => {
    return (dispatch) => {
        fetch.get('/static/build/api/citylist.json', (res) => {
            if(res.data && res.status === 200){
                const action = post_cityList(res.data)
                dispatch(action)
            }
        })
    }
}

export const post_cityList = (value) => {
    return {
        type:types.GETCITYLIST,
        value:value,
    }
}


export const post_city = (config) => {
    return {
        type:types.POSTCITY,
        value:config
    }
}