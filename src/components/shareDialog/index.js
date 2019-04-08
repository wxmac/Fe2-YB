import React, { Component } from 'react'
import styleCss from './style.css'
/**
 *  微信分享引导
 *  需要父元素提供的几个参数：
 *  @param {boolean} showMask -- 控制弹窗显示隐藏
 *  @param {string} ShareTitle -- 引导分享的标题
 *  @param {string} ShareDesc -- 引导分享的简介
 *  @param {string} ShareImg -- 引导分享的图片 需要用 import ShareImg from 'xxxx'的形式 ---> ShareImg = {ShareImg}
 * */  
// 用法：
//  <ShareDialog  ShareTitle = '微信分享' ShareDesc = '分享简介' ShareImg = {ShareImg} showMask={ this.state.showMask } />

export default class ShareDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            current:0,
            guidStatus: true,
            showMain:false
        }
    }
    componentDidMount(){
        
    }
    handleCloseMain(e){
        e.stopPropagation()
        this.setState({
            showMain:true
        })
    }
    handleWxguid(e){
        e.stopPropagation()
        this.setState({
            guidStatus: false,
        })
    }
    handleCloseGuid(){
        this.setState({
            guidStatus: true,
        })
    }
    render(){
        return(
            <div onClick = { e => this.handleCloseGuid(e) } className={this.state.showMain ? styleCss.hide : '' }>
                {/* showMask 为 false 隐藏， showMask从父元素得到 */}
                <div   className={`${styleCss.success_main} ${ this.props.showMask ?  '' : styleCss.hide  } `} >
                    <div className={styleCss.success_main_mask}></div>
                    <div className={styleCss.success_main_cont}>
                        <div className={ `${styleCss.success_main_cont_bottom}` }>
                            <p className={`${styleCss.center} ${styleCss.share_text1}`}> { this.props.ShareTitle }</p>
                            <p className={`${styleCss.center} ${styleCss.share_text2}`}>{this.props.ShareDesc}</p>
                            <div className={styleCss.success_bottom_share}>
                                <div onClick={ (e) => this.handleWxguid(e) } className={`${styleCss.icont_share} ${ styleCss.center} ${styleCss.wx_friend}`} >
                                    <img src={require("../../assets/img/bargain/icon-wx.png")} alt="" />
                                    <p>微信好友</p>
                                </div>
                                <div onClick={ (e) => this.handleWxguid(e) }   className={`${styleCss.icont_share} ${styleCss.center} ${styleCss.wx_friend_circle}`} >
                                    <img src={require("../../assets/img/bargain/friend-c.png")} alt="" />
                                    <p>朋友群</p>
                                </div>
                            </div>
                        </div>

                        <div className={styleCss.close_box} onClick={ (e) => this.handleCloseMain(e)}>
                            <img src={require("../../assets/img/bargain/close.png")} alt="" />
                        </div>
                    </div>
                </div>


                <div className={`${styleCss.success_guide} ${this.state.guidStatus ? styleCss.hide : ''}`}>
                    <div className={styleCss.success_guide_mask}></div>
                    <div className={styleCss.success_guide_cont}>
                        <img src= {this.props.ShareImg} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}