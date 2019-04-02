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
        throw  new Error('缺少必要参数')
    }
    return await axios.get(url)
        .then((res) => {
            success(res)
        }).catch((error) => {
            console.log('Has Error====>', error)
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
        throw  new Error('缺少必要参数')
    }
    let params
    if( data ) { params = qs.stringify(data) } 
    return await axios.post(url,{
            data:params,
        }).then((res) => {
            success(res)
        }).catch((error) => {
            fail(error)
            window.global.dialog(error, true)
            console.log('Has Error====>', error)
        })
}

export default  fetch;
