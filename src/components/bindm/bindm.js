import React, { Component } from 'react'
import styleCss from './bindm.css'
import isWx from '../../units/iswx'
import fetch from '../../units/api'
/**
 * 登录、注册弹窗 -- 关联手机号
 * 需要父元素传入的参数：
 * @param {boolean} showLogin -- 控制弹窗显示、隐藏
*/
// 用法：
// <Bindm showLogin = {this.state.showLogin}/> 

class Bindm extends Component {
    constructor(props){
        super(props)
        this.state = {
            showMask: this.props.showLogin,
            count: 60, // 秒数初始化为60秒
            liked: true, // 文案默认为‘获取验证码‘
            InputValueTel:'', // 输入框的值
            InputValueCode:'', // 验证码框的值
            flag: true, // 限制重复点击
            getUid:null
        }
    }
    
    componentDidMount() {
        this.handleNoScroll()
    }
    // 禁止滚动 目前查到的是这个方法，有更好的方法可以更换。
    handleNoScroll(){
        if(this.state.showMask){
            document.getElementById('nonius').addEventListener("touchmove", (e) => {
                this.sidebarTouchMove(e)  // 执行滚动回调
              }, {
                passive: false //  禁止 passive 效果
              })
        } else {
            document.getElementById('nonius').removeEventListener("touchmove", (e) => {
                this.sidebarTouchMove(e)
              }, {
                passive: true 
              })
        }
    }
    sidebarTouchMove(e){
        e.preventDefault()
    }
    // 获取验证码
    handleSendText(e){
        // liked is false 的时候，不允许再点击
        if (!this.state.liked) {
            return
        }
        // 验证手机号码
        let reg = /^(13|14|15|16|17|18|19)[0-9]{9}$/
        const Inputval = this.state.InputValueTel
        if(Inputval === '') {window.global.showMsg('请输入手机号', true); return;}
        if(!reg.exec(Inputval) && Inputval !== ''){
            window.global.showMsg('手机号不符合格式', true); return ;
        }
        // 获取验证码结果
        this.getCodeUid(Inputval)
        // 倒计时
        let count = this.state.count
        const timer = setInterval(() => {
            this.setState({ 
               count: (count--),
               liked:false
               }, () => {
               if (count === 0) {
                 clearInterval(timer);
                 this.setState({
                   liked: true ,
                   count: 60
                 })
               }
            });
          }, 1000);
    }
    getCodeUid(val){
        // 微信和非微信环境调用的不是同一个接口
        let url = isWx ? '/smscode.htm' : '/washstation/smscode.htm'
        fetch.post(url, {
            mobile:val
        }, (res) => {
            if(res.data && res.data.success && res.data.msg ){
                window.global.showMsg('发送成功', true)
                this.setState({
                    getUid: res.data.msg
                })
            } else if(res.data && !res.data.success && res.data.msg) {
                window.global.showMsg(res.data.msg, true)
            }
        },(err) => {
            let msg = "发送短信失败，请重试";
            if(err && err.data &&  err.data.msg){
                msg = err.data.msg
            }
            window.global.showMsg(msg, true)
        })
    }
    // 关闭弹窗
    handleCloseMask(){
        this.setState({
            showMask: false ,
        })
    }
    // 输入框的值
    handleTelInputVal(e){
        this.setState({
            InputValueTel: e.target.value
        })
    }
     // 验证码框的值
     handleCodeInputVal(e){
        this.setState({
            InputValueCode: e.target.value
        })
    }
    // 提交
     handleSubmit(){
        this.setState({
            flag:false
        })
        const reg = /^\d{4}$/
        const CodeVal = this.state.InputValueCode
        const Inputval = this.state.InputValueTel
        console.log(this.state.flag)
        if(this.state.flag){
            
            setTimeout(() => {
                this.setState({
                    flag: true
                })
           },2000)

            if(CodeVal === '' || Inputval === '') {
                window.global.showMsg('手机号或验证码不能为空', true)
                return
            }
            if( CodeVal !== '' && !reg.exec(CodeVal)){
                window.global.showMsg('请输入四位数字验证码', true)
                return
            }
            this.handlesubEvent()
        }
        
        
        
    }
    handlesubEvent(){
        const CodeVal = this.state.InputValueCode
        const Inputval = this.state.InputValueTel
        let url = isWx ? '/smsverify.htm' : '/washstation/register.htm'
        fetch.post(url, {
            mobile:Inputval,
            code:CodeVal,
            uid: this.state.getUid
        },(res) => {
            console.log('--->', res)
            if(res.data && res.data.success ){
                window.global.showMsg('绑定成功', true)
                window.location.href =  window.location.href + '?t='+((new Date()).getTime());
                this.setState({
                    showMask: false
                })
            } else {
                if(res.data && res.data.msg){
                    window.global.showMsg(res.data.msg, true)
                }
            }
        }, (err) => {
            let msg = "绑定手机号失败，请重试";
            if(err && err.data &&  err.data.msg){
                msg = err.data.msg
            }
            window.global.showMsg(msg, true)
        })
            
    }
    render() {
        return (
            <div id="nonius"  className={`${styleCss.dialog_container}  ${ this.state.showMask ? '' : styleCss.hide }`} >
                <div className={styleCss.dialog_shadow}></div>
                <div className={styleCss.dialog_body_container}>
                    <div className={styleCss.dialog_body}>
                        <div className={styleCss.dialog_title_c}>
                            <div className={styleCss.dialog_title_text}>关联手机号</div>
                        </div>
                        <div className={styleCss.phone_num_container}>
                            <input  onKeyUp = { e => this.handleTelInputVal(e) } type="tel" name="mobile" placeholder="请输入手机号" className={`${styleCss.text_input} ${styleCss.phone}`} />
                            <input type="hidden" id="remind_enter_mobile_tel" value="$!{clientInfo.remind_enter_mobile_tel}"/>
                            <div onClick={ e => this.handleSendText(e) } type="button" className={`${styleCss.submit_btn} ${styleCss.button}`}>
                                <span className={styleCss.num_get_text} id="j_sms_text">
                                {
                                        this.state.liked 
                                        ? 
                                        '获取验证码'
                                        : 
                                        '重新获取' + this.state.count + 's'
                                    }

                                </span>
                            </div>
                        </div>
                        <div className={`${styleCss.phone_num_container} ${styleCss.num}`}>
                            <input onKeyUp = { e => this.handleCodeInputVal(e) }  type="text"  name="code" placeholder="请输入短信验证码" className={styleCss.text_input} />
                        </div>
                        <div className={`${styleCss.next_btn} ${styleCss.button}`} id="next_btn">
                            <input type="hidden" id="j_uid" value="" />
                            <span onClick = { e => this.handleSubmit(e) } className={styleCss.next_btn_text}>提交</span>
                        </div>
                        <img src={ require('../../assets/img/bindm/close_btn@2x.png') } alt="" className={styleCss.close_btn} onClick = { e => this.handleCloseMask(e) } /> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Bindm

