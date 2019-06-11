// 2019/4/1 
import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
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
 * */ 

fetch.post = async (  url , data = {},   success = () => {}  ) => {
    if(!url || !data || !success ){
        throw  new Error('fetch.post 缺少必要参数')
    }
  
    // 配置签名
    let nameArr=[];
    let names = "" ;
    let AppKey = 'ZTc7byw9';
    let AppSecret = 'st8NEBINYSEUsZ26C2sTQjJaEmXpaN2k'
    for(let name in data){
        nameArr.push(name);
    }
    nameArr = nameArr.sort();
    nameArr.map((item) => {
        if (typeof data[item] === 'object') {
            names += item +"="+JSON.stringify((data[item]))+"&";
        } else {
            names += item+"="+data[item]+"&";
        }
        return names
    });
    names += '$_app_key='+ AppKey +'&$_app_secret='+AppSecret;
    const result = md5(names)

    let par = Object.assign(data, {
        $_sign:result
    })
    
    let params = qs.stringify(par)
    
    return await axios.post(url, params,{  
        headers: {
            'App-Key': AppKey,
        }
    }).then((res) => {
            success(res)
        }).catch((error) => {
            console.log('Has Error POST====>', error)
        })
}

export default  fetch;
