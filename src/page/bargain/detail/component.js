import React, { Component } from 'react';
import styleCss from './style.css';
import WxShare from '../../../units/wxshare'
import Bindm from '../../../components/bindm/bindm'
import DownloadBottom from '../../../components/downloadBottom'
import ShareImg from '../../../assets/img/bargain/wxguide.png'
import ShareDialog from '../../../components/shareDialog/index'
import LoadMore from '../../../units/loadMore'
class BargainDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            list:['砍价帮','砍价实况'],
            current:0,
            alertMain: true,
            alertTop: true,
            guidStatus: true,
            getWatch: true,
            receive: true,
            showLogin:true,
        }
    }
     componentDidMount(){
         this.props.getBtnStatus()
        setTimeout(() => {
            if(this.props.data.time){
                this.runTime(this.props.data.time)
            }
        },10)

        this.hadnleWxShare()

        new LoadMore({
            container: this.refs.main,
            listContainer: this.refs.ul,
            callback(currentpage){
                console.log('success', currentpage)
            }
        })
    }
    // 微信分享
    hadnleWxShare(){
        new WxShare({
            shareTit: '微信',
            TimelineTie:'朋友圈',
            shareDesc:'简介',
            shareImg:'',
            WxShareSuccess()  {
                alert('ok')
            },
            WxShareCancel() {
                alert('cancel')
            }
        })

       
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    runTime(data){
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
            }
        },100)
    }
    // 记录当前点击index
    handleTab(e,index){
        this.setState({
            current:index
        })
    }
    // 各个按钮状态
    handleBtnEvent(e){
        console.log(this.props.data.state)
       if(this.props.data.state === 'success' || this.props.data.state === 'ing'){
            this.setState({
                alertMain: false,
                alertTop: true,
            })
       } else if (this.props.data.state === 'fail'){
            this.setState({
                alertMain: false,
                alertTop: false,
            })
       } else if(this.props.data.state === 'get'){
            this.setState({
                alertMain: false,
                alertTop: false,
                getWatch: false,
                receive: false
            })
       }
    }
    handleCloseMain(e){
        e.stopPropagation()
        this.setState({
            alertMain: true,
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
    
    render() {
        // 进度条
        const w =  (Number(this.props.data.alread) / Number(this.props.data.total)) * 100
        const progress_bar_show = {
            width: `${w}%`,
            position: "absolute",
            top: 0,
            left: 0,
            background: "linear-gradient(261deg,rgba(145,129,255,1) 0% ,rgba(105,254,249,1) 100%)",
        }

        return(
            // <div></div> <img src={} alt="" />
            <div onClick = { e => this.handleCloseGuid(e) }>
                <ShareDialog  ShareTitle = '微信分享' ShareDesc = '分享简介' ShareImg = {ShareImg} showMask={ this.state.showMask } />
                <DownloadBottom />
                <Bindm showLogin = {this.state.showLogin}/>
                <div className={styleCss.back_index}>
                    <img className={styleCss.back_img} src={ require("../../../assets/img/bargain/icon-return.png") } alt="" />
                    <div className={styleCss.back_index_text}>
                        砍价免费拿
                    </div>
                </div>

                <div className={styleCss.bargain_detail_main}>
                    <div className={styleCss.detail_main_top}>
                        <div className={styleCss.top_title}>
                            {/* {<!-- tpo -->} */}
                            <div className={styleCss.top_title_top}>
                                <div className={styleCss.top_title_intro}>
                                    <img src={ require("../../../assets/img/201903GiftActive/card2.jpg") } alt="" />
                                    <span>xxx发起</span>
                                </div>
                                <span className={styleCss.top_title_btn}>详细规则</span>
                            </div>
                            {/* {<!-- center -->} */}
                            <div className={styleCss.top_title_center}>
                                <img src={require("../../../assets/img/201903GiftActive/card3.jpg")} alt="" />
                                <div className={styleCss.center_text}>
                                    <p>油呗标准洗车券·杭州</p>
                                    <p>1个即可拿</p>
                                    <p>价值35元 <span>312人已0元拿</span> </p>
                                </div>
                            </div>
                            {/* <!-- bottom progress --> */}
                            <div className={styleCss.bottom_progress}>
                                <div className={styleCss.progress_bar_box}>
                                    <span className={styleCss.bottom_progress_bar}></span>
                                    <span  style={progress_bar_show}>
                                    </span>
                                </div>
                                <div className={styleCss.progress_bar_text}>
                                    <span className={styleCss.alread_bargain}>已砍 <em>29</em> 元
                                        </span>
                                    <span className={styleCss.remain_barmain}>剩余 <em>6</em> 元</span>
                                </div>
                            </div>
                        </div>
                        {
                            <div    onClick={ (e) => this.handleBtnEvent(e) }          className={`${styleCss.detail_main_btn} 
                                        ${this.props.data.state === 'ing' ? styleCss.help_btn : 
                                        (this.props.data.state === 'fail' ? styleCss.end_start_btn : 
                                        (this.props.data.state === 'success' ? styleCss.share_alread_btn : styleCss.success_btn))}`}>

                                        {this.props.data.state === 'ing' ? '喊朋友砍一刀' : 
                                        (this.props.data.state === 'fail' ? '时间已结束，点击重砍' : 
                                        (this.props.data.state === 'success' ? '已领取，分享活动给好友' : '砍价成功，立即领取！')) }
                            </div>
                        }

                        {/* <!-- 结束 --> */}
                        <div className={styleCss.detail_main_time}>
                            <p></p>
                            <p className={styleCss.main_time}>还剩 {this.state.hour}:{this.state.min}:{this.state.sec}结束，抓紧砍价吧</p>
                            <p></p>
                        </div>
                        {/* <!-- 砍价帮 - 砍价实况 --> */}
                        <div className={styleCss.bargain_main} ref="main">
                            <ul className={styleCss.bargain_main_title}>
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                            <li key={index} onClick={(e) => this.handleTab(e,index)} className={`${styleCss.title_item} ${this.state.current === index ? styleCss.active : ''}`}>
                                            {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            <div className={styleCss.bargain_main_cont} ref="ul">
                                {/* <!-- left --> */}
                                <div className={` ${styleCss.main_cont_list} ${this.state.current === 0 ? styleCss.show_cont : ''}`}>
                                        <div className={styleCss.main_cont_item}>
                                            <div className={styleCss.cont_item_left}>
                                                <img  className={styleCss.item_left_img} src={ require('../../../assets/img/bargain/user1.png') } alt="" />

                                                <div className={styleCss.item_left_name}>
                                                    <span className={styleCss.left_name_text}>这是名字 <i className={styleCss.icon_vip}></i> </span>
                                                    <p className={styleCss.left_name_intro}> <span className={styleCss.owner}>喊Ta当店主</span> 快刀斩乱麻</p>
                                                </div>
                                            </div>
                                            <div className={styleCss.cont_item_right}>
                                                砍掉9.5元
                                            </div>
                                        </div>

                                        
                                </div>
                            {/* <!-- right --> */}
                            <div className={`${styleCss.main_cont_list} ${this.state.current === 1 ? styleCss.show_cont : ''}`} >
                                    <div className={styleCss.main_cont_item}>
                                        <div className={styleCss.cont_item_left}>
                                                <img  className={styleCss.item_left_img} src={require("../../../assets/img/201903GiftActive/card1.jpg")} alt="" />
                                                <div className={styleCss.item_left_bargain}>
                                                    <span>名字这么长名字这么长</span>
                                                    0元购买了油呗标准洗车券
                                                </div>
                                        </div>
                                   </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                {/* <!-- 砍价成功弹窗 --> */}
                <div className={`${styleCss.success_main} ${ this.state.alertMain ? styleCss.hide : '' }  `} >
                    <div className={styleCss.success_main_mask}></div>
                    <div className={styleCss.success_main_cont}>
                        <div className={`${styleCss.success_main_cont_top} ${this.state.alertTop ? styleCss.hide : ''} ${this.state.receive ? '' : styleCss.receive_success }`   }>
                            <div className={styleCss.success_top_text}>
                               {
                                this.state.receive ?  `恭喜您，成功砍价 13.7元` : `【油呗标准洗车券占位占位】已放入您的账户中，即刻生效` 
                               }
                            </div>
                        </div>
                        <div className={ `${styleCss.success_main_cont_bottom} ${this.state.receive ?  '' : styleCss.hide}` }>
                            <p className={`${styleCss.center} ${styleCss.share_text1}`}> 立即分享，马上多砍<span className={styleCss.red}>13</span>元</p>
                            <p className={`${styleCss.center} ${styleCss.share_text2}`}>首次分享好友及朋友圈各多砍6.5元</p>
                            <div className={styleCss.success_bottom_share}>
                                <div onClick={ (e) => this.handleWxguid(e) } className={`${styleCss.icont_share} ${ styleCss.center} ${styleCss.wx_friend}`} >
                                    <img src={require("../../../assets/img/bargain/icon-wx.png")} alt="" />
                                    <p>微信好友</p>
                                </div>
                                <div onClick={ (e) => this.handleWxguid(e) }   className={`${styleCss.icont_share} ${styleCss.center} ${styleCss.wx_friend_circle}`} >
                                    <img src={require("../../../assets/img/bargain/friend-c.png")} alt="" />
                                    <p>朋友群</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styleCss.success_main_cont_btnbox} ${this.state.getWatch ? styleCss.hide : ''}`}>
                            <span className={`${styleCss.success_main_cont_btn} ${styleCss.immediately_watch}`}>
                                立即查看
                            </span>
                            {/* <!-- <span className={`${styleCss.success_main_cont_btn} ${styleCss.immediately_btn}`}>
                                立即使用
                            </span> --> */}
                        </div>

                        <div className={styleCss.close_box} onClick={ (e) => this.handleCloseMain(e)}>
                            <img src={require("../../../assets/img/bargain/close.png")} alt="" />
                        </div>
                    </div>

                
                </div>

                <div className={`${styleCss.success_guide} ${this.state.guidStatus ? styleCss.hide : ''}`}>
                    <div className={styleCss.success_guide_mask}></div>
                    <div className={styleCss.success_guide_cont}>
                        <img src={ require("../../../assets/img/bargain/wxguide.png") } alt="" />
                    </div>
                </div>
            </div>
        )
    }
}
export default BargainDetail