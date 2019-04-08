// 2019/4/1 
import axios from 'axios'
import qs from 'qs'
let fetch = {
    get : '',
    post: ''
}
/**
 * axios get请求
 * @param {string} url  --  请求地址
 * @param {function} success -- 请求成功的回调
 * @param {function} error -- 请求失败的回调
 * */ 
 fetch.get = async ( url , success, fail = () => {} ) => {
    if( !url ||  !success || !fail){
        throw  new Error('fetch.get 缺少必要参数')
    }
    return await axios.get(url)
        .then((res) => {
            success(res)
        }).catch((error) => {
            console.log('Has Error GET====>', error)
        })
}

/**
 * axios post请求
 * @param {string} url  --  请求地址
 * @param {object} data -- 发送的数据
 * @param {object} header -- header头，有需要自己加
 * @param {function} success -- 请求成功的回调
 * @param {function} error -- 请求失败的回调
 * */ 
fetch.post = async (  url , data = {}, success , fail = () => {} ) => {
    if(!url || !data || !success || !fail){
        throw  new Error('fetch.post 缺少必要参数')
    }
    return await axios.post(url,
         qs.stringify(data),
        ).then((res) => {
            success(res)
        }).catch((error) => {
            fail(error)
            console.log('Has Error POST====>', error)
        })
}

export default  fetch;
