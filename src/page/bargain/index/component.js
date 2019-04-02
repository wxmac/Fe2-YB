import React, { Component } from 'react'
import styleCss from './style.css'
import CountUp from 'react-countup';
class Bargain extends Component{
    constructor(props){
        super(props)
        this.state={
            animate:false,
            list:[
               { cont:'111111111111111'},
               { cont:'2222222222222'},
               { cont:'333333333333'}
            ],
            destination:0,

        }
        this.scrollEventInit = this.scrollEventInit.bind(this)
    }
    componentDidMount(){
        setInterval(this.scrollEventInit, 3000)
    }
    scrollEventInit(){
        this.setState({ animate: true });
        setTimeout(() => {
            this.state.list.push(this.state.list[0]);
            this.state.list.shift();  
            this.setState({ animate: false });
            this.forceUpdate()
        }, 500)
    }
    render() {
        const return_img = require('../../../assets/img/bargain/icon-return.png')
        const banner = require('../../../assets/img/bargain/banner.png')
        const list = this.state.list.map((item, index) => {
            return <li  key={index}>{item.cont}</li>
        })
        return(
            // <div></div> <img src={} alt="" />
            <div className={ `${styleCss.bargain_main} ${styleCss.red}` }>
               {/* top */}
               <div className={ styleCss.bargain_main_top }>
                 <img className={ styleCss.main_top_img } src={return_img}   alt=""/>
                 <div className={ styleCss.main_top_text }>砍价免费拿</div>
               </div>
               {/* banner */}
               <img className={ styleCss.banner_img } src={banner} alt="" />
               {/* 滚动字 */}
               <div className={ styleCss.scrollContain }>
                    <ul className={ this.state.animate ? styleCss.anim : styleCss.anim_normal }>
                        {list}
                    </ul>
               </div>
               <CountUp start={0} end={10000} />
            </div>
        )
    }
}
export default Bargain