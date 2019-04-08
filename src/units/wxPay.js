// 2019/4/4
import fetch from './api'
/**
 * 微信支付
 * @param {string} url -- 微信支付调用的接口
 * @param {object} data -- 调用接口需要传的参数，不需要可以传{}
 * @param {function} callback -- 接口请求成功的回调
 * @param {function} paySuccess -- 支付成功的回调
 * */ 
export default class WxPay {
    constructor({
        url,
        data,
        callback = () => {},
        paySuccess = () => {}
    }){
        Object.assign(this, {
            url,
            data,
            callback,
            paySuccess
        })
        this.orderInfo = null
        this.init()
    }
    /**
    * 初始化请求接口
    */
    init(){
        const _this = this;
        fetch.post(this.url, this.data , (res) => {
            if(res.data.success && res.data.data) {
                _this.orderInfo = JSON.parse(res.data.data.wechat_param);
                _this.callback()
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady);
                    }
                }else{
                    _this.onBridgeReady();
                }
            } else {
                if(res.data.msg && res.data.msg !== ''){
                    window.global.showMsg(res.data.msg,true)
                }
            }
        },(error) => {
            if(error.data && error.data.msg !==''){
                window.global.showMsg(error.data.msg,true)
            }
        })
    }
    /**
    * 微信内置支付成功或失败的回调
    */
    onBridgeReady(){
        const _this = this;
        WeixinJSBridge.invoke( 
            'getBrandWCPayRequest', _this.orderInfo,
            (res) => { 
               if( res.err_msg && res.err_msg === "get_brand_wcpay_request:ok") {
                    _this.paySuccess()
               } else  {
                    _this.refreshPageNew()
                    console.log('非手机微信环境或支付取消')
               }
            }
        )
    }
    /**
     * 刷新时间戳
    */
    refreshPageNew(){
       
        if (window.location.href.indexOf('&t=') >  -1 ){
            const url = window.location.href.split('&t=')[0]
            window.location.href = url + '&t='+((new Date()).getTime());
        } else if(window.location.href.indexOf('?t=') >  -1) {
            const url = window.location.href.split('?t=')[0]
            window.location.href = url + '?t='+((new Date()).getTime());
        } else {
            window.location.href =  window.location.href + '?t='+((new Date()).getTime());
        }
    }
}