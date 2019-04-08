// 2019/4/1
import wx from 'weixin-js-sdk'
import fetch from './api'

/**
 * 微信分享
 * @param {string} shareTit  --  微信好友分享标题
 * @param {string} TimelineTie -- 微信盆友圈标题
 * @param {string} shareDesc -- 分享简介
 * @param {string} shareImg -- 分享图片
 * @param {function} WxShareSuccess -- 分享成功的回调
 * @param {function} WxShareCancel -- 分享失败的回调
 * */ 
export default class WxShare {
    constructor({
        shareTit,
        TimelineTie,
        shareDesc,
        shareImg,
        WxShareSuccess = () => {},
        WxShareCancel = () => {}
    }){
        Object.assign(this, {
            shareTit,
            TimelineTie,
            shareDesc,
            shareImg,
            WxShareSuccess,
            WxShareCancel
        })
        
        this.init()
    }
    /**
     * 初始化请求
    */
    init(){
        const _this = this
        if (/micromessenger/i.test(navigator.userAgent)) {
            let url = window.location.origin + '/wxConfig.htm'

            fetch.post(url, {
                url: window.location.href.split("#")[0],
            },(res) => {
                if (res.data.success && res.data.data) {
                    _this.setWxConfig(res.data)
                    _this.shareConfig()
                } else {
                    window.global.showMsg('请求出错', true)
                } 
            }, (error) => {
                console.log(error)
            })
            
        } else {
            console.log('非微信环境')
        }
    }
    /**
     * 微信相关参数配置
     * */ 
    setWxConfig(data){
        const res = data.data
        let config = {
            debug: false,
            appId:res.appId,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ]
        };
        wx.config(config);
    }
    /**
     * 微信分享朋友圈、微信好友配置
     * */ 
    shareConfig(){
        const _this = this
        wx.ready(() => {
            wx.onMenuShareAppMessage({
                title: _this.shareTit, // 分享标题
                // link: _this.shareLink, 需要link的，要单独配
                desc: _this.shareDesc, // 分享摘要
                imgUrl: _this.shareImg, // 分享图标
                success: function () {
                    if( typeof(_this.WxShareSuccess) == "function" ){
                        _this.WxShareSuccess() 
                    }
                    
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if( typeof(_this.WxShareSuccess) == "function" ){
                        _this.WxShareCancel() 
                    }
                }
            });

            wx.onMenuShareTimeline({
                title: _this.TimelineTie, // 分享标题
                // link: _this.shareLink, 需要link的，要单独配
                imgUrl: _this.shareImg, // 分享图标
                success: function () {
                    if( typeof(_this.WxShareSuccess) == "function" ){
                        _this.WxShareSuccess() 
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if( typeof(_this.WxShareSuccess) == "function" ){
                        _this.WxShareCancel() 
                    }
                }
            });

        });
    }
} 

