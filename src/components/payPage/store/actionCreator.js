import * as types from './actionType'
// import fetch from '@/units/api'

export const post_Car = (config) => {
    return {
        type:types.POSTCAR,
        value:config
    }
}