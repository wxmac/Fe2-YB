import React, { Component } from 'react'
import styleCss from './style.css'
import fetch from '@/units/api'
import isWx from '@/units/iswx'
class PayPage extends Component{
    constructor(props){
        super(props)
        this.state = {
           payTxt : [{
               txt:'支付宝支付',
               img:'/static/web/img/product/ali_icon.png'
           },{
               txt:'微信支付',
               img:'/static/web/img/product/wx_icon.png'
           }],
           currIndex : 0,
           flag:true,
           wechat_param:'',
           wxAppOrder_no:'',
           returnUrl:''
        }
    }
   
    componentDidMount(){
        this.refs.container.style.height = (window.innerHeight) + 'px'

        setTimeout(() => {
            this.formatTime(899*10) 
        }, 1000);

        this.handleControllPayStyle()
    }
    handlePayBtn(e,index){
        this.setState({
            currIndex:index
        })
        
    }
    handleControllPayStyle(){
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
        if(isAndroid) {
            // this.setState({
            //     hideWxPay:true
            // })
            if(isWx) {
                this.setState({
                    hideWxPay:false
                })
            }
        }
    }
    handlePayNext(){
        const index = this.state.currIndex

        this.setState({
            flag:false
        })
        let payStyle =   index === 0 ? 'alipay' : 'wxmp'
        if(this.state.flag){

            setTimeout(() => {
                this.setState({
                    flag: true
                })
            },5000)
            const orderNo = 'CW201905201808134161'
            fetch.post('/ylAct/json/pay.htm', {
                payChannel: payStyle,
                orderNo:orderNo
            }, (res) => {
                if(res.data.success && res.data.data ){
                    if(payStyle === 'alipay'){
                        const alipay_param =  JSON.parse(res.data.data.alipay_param);
                        const param = alipay_param.pay_body
                        if(isWx) { // 微信内支付宝支付 -- 浏览器外打开 
                            window.location.href = 'step1Excessive.htm?clientId=$!clientId&inviteCode=$!inviteCode&orderNo='+orderNo+''
                        } else {
                            const newWindow = window.open("", "_self");
                            newWindow.document.write(param);
                            newWindow.focus();
                        }
                    } else {
                        if(isWx) {
                            const wechat_param = JSON.parse(res.data.data.wechat_param)
                            this.setState({
                                wechat_param
                            })
                            if (typeof WeixinJSBridge == "undefined"){
                                if( document.addEventListener ){
                                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                                }else if (document.attachEvent){
                                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                                }
                            }else{
                                this.onBridgeReady();
                            }
                        } else {
                            // 微信APP支付
                            const url = encodeURI("https://wechattest.youbeichefu.com/ylAct/step1Index.htm?payStatus=success")
                            this.setState({
                                wxAppOrder_no:orderNo,
                                returnUrl:url
                            })
                            this.refs.form.submit();
                        }
                    }
                } else if(!res.data.success && res.data.msg) {
                    window.global.showMsg(res.data.msg,true)
                }
            })

           
        }
        
        
    }
    onBridgeReady(){
        WeixinJSBridge.invoke(
        'getBrandWCPayRequest', this.state.wechat_param,
        function(res){
            if(res.err_msg === "get_brand_wcpay_request:ok" ){
                console.log('success')
                //window.location.href = "step1Index.htm?payStatus=success";
            } else {
                console.log('fail')
                //window.location.href =  "step1Index.htm?payStatus=fail";
            }
        });
    }
    formatTime(data){
        this.timer = setInterval( () => {
        let time = --data
        if( time !== 0 ){
            time = parseInt(time / 10, 10)
            let hour = parseInt(time / 3600, 10)
            let min = parseInt((time - (hour * 3600)) / 60, 10)
            let sec = time % 60
            this.setState({
                hour : hour < 10 ? ('0' + hour) : hour,
                min : min < 10 ? ('0' + min) : min,
                sec : sec < 10 ? ('0' + sec) : sec
            })
        } else {
            clearInterval(this.timer)
            alert('结束')
        }
        },100)
    }
   
    render() {

        
        

       
        return(
            <div className={ styleCss.pay_container } ref="container" >
                <div className={ styleCss.pay_top }>
                    <div className={styleCss.pay_time}>
                        <span>支付剩余时间</span>
                        <span>{this.state.min} : {this.state.sec}</span>
                    </div>

                    <div className={styleCss.pay_price}>
                        <span>￥</span>
                        <span>25.00</span>
                    </div>

                    <div className={styleCss.pay_order}>
                        <span>订单号：</span>
                        <span>CW201905201107090075</span>
                    </div>

                </div>


                <div className={styleCss.pay_center}>
                     {
                        this.state.payTxt.map((item,index) => {
                           return  <div className={`${styleCss.pay_selectBox} ${this.state.hideWxPay && index === 1 ? styleCss.hide : ''}`} key={index} >
                                <img src={item.img} alt="" className={styleCss.pay_icon} />
                                <span className={styleCss.pay_txt}>{item.txt}</span>
                                <div className={`${styleCss.pay_selbtn} ${this.state.currIndex === index ? styleCss.selected : styleCss.unSelected}`} 
                                onClick={(e) => this.handlePayBtn(e,index)}></div>
                            </div>
                        })
                     }
                </div>


                <div className={`${styleCss.pay_btn} ${this.state.flag ? '' : styleCss.prohibit}`} onClick={ (e) => this.handlePayNext(e) }>
                    <span>确认支付</span>
                    <span>￥25.00</span>
                </div>

                <form ref="form" action="/product/orderPay/wxwap.htm" method="get" className={styleCss.hide}>
                    <input type="text" name="order_no" value={this.state.wxAppOrder_no} readOnly />
                    <input type="text" name="returnUrl" value={this.state.returnUrl} readOnly />
                </form>
            </div>
        )
    }
}
export default PayPage