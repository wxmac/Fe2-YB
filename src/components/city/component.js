import React, { Component } from 'react'
import styleCss from './style.css'
import { setTimeout } from 'timers';
class City extends Component{
    constructor(props){
        super(props)
        this.state = {
           letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
           hot : [
                {"area_name":'上海',"area_code":"310100","province_name":"上海市","center":"121.473662,31.230372"},
                {"area_name":"北京","area_code":"110100", "province_name":"北京市","center":"116.407394,39.904211" },
                {"area_name":"重庆","area_code":"500100","province_name":"重庆市", "center":"106.551643,29.562849"},
                {"area_name":"杭州","area_code":"330100","province_name":"浙江省","center":"120.209789,30.24692"},
                { "area_name":"深圳","area_code":"440300","province_name":"广东省",  "center":"114.057939,22.543527"}, 
                { "area_name":"武汉","area_code":"420100","province_name":"湖北省",  "center":"114.305469,30.593175"},
                { "area_name":"成都","area_code":"510100","province_name":"四川省", "center":"104.066794,30.572893"}, 
                { "area_name":"南京","area_code":"320100", "province_name":"江苏省",  "center":"118.796682,32.05957"}, 
                { "area_name":"西安","area_code":"610100","province_name":"陕西省", "center":"108.93977,34.341574"}
            ],
            currCity:'',
            cityList:[],
            code:''
        }
    }
   
    componentDidMount(){
        this.props.getListInfo()
        this.hadnleGetLocalCity()
        this.hadnleGetcode()
        setTimeout(() => {
            this.setState({
                cityList:this.props.list
            })
        },1000)

     
        
    }
    hadnleGetLocalCity(){
        const _this = this
        let BMap = global.BMap
        
        let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                let addr = r.address.city
                let data = _this.state.cityList
                let code = ''
                data.map((item,index) => {  // eslint-disable-line
                    item.data.map((it,i) => { // eslint-disable-line
                        if (it.area_name === addr ) {
                             code = it.area_code
                        }
                    })
                })
                _this.setState({
                    code:code,
                    currCity:addr
                })
            });
    }
    hadnleGetcode(){
        
    }
    handleLocalClick(e){
        const config = {
            city:this.state.currCity,
            id:this.state.code
        }
        this.props.get_City(config)
        this.props.history.go(-1)
       
    }
    handleSetCity(e,id){
        const city = e.target.innerHTML
        const config = {
            city,
            id
        }
        this.props.get_City(config)
        this.props.history.go(-1)
    }
    scrollToAnchor(anchorName){
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { 
                anchorElement.scrollIntoView({behavior : "smooth"}); 
            }
        }
    }
    handleBack(){
        this.props.history.go(-1)
    }
    render() {
        // 城市列表
        const listHtml = this.props.list.map((item,index) => {
            return (
                <ul className={ styleCss.city_list} key={index}>
                    <div id={item.letter} className={ styleCss.city_list_letter}>{item.letter}</div>
                   {
                    item.data.map((it,i) => {
                     return  <li className={ styleCss.city_list_item} key={i} data-id={it.area_code} 
                                onClick={(e) => { this.handleSetCity(e,it.area_code) }}>
                                {it.area_name}
                        </li>
                    })
                   }
                </ul>
            )
        })
        // 字母
        const Letter = this.state.letter.map((item,index) => {
            return( <li key={index} className={ styleCss.link_item} 
                        onClick={()=>this.scrollToAnchor(item)} >
                        {item}
                 </li>
            )
        })

        // 热门城市
        const hotCity = this.state.hot.map((item,index) => {
            return(
                 <li className={ styleCss.hot_city_item} key={index} 
                    data-id={item.area_code}
                    onClick={(e) => this.handleSetCity(e,item.area_code)}>
                    {item.area_name}
                </li> 
            )
        })

        return(
            <div className={ styleCss.container } id="container" >
                 <div className={ styleCss.header_comm}>
                    <i className={ styleCss.icon_back} onClick={ (e) => {this.handleBack(e)} }></i>
                    <div className={ styleCss.header_title}>选择城市</div>
                </div>

                <div className={ styleCss.city_box}>
                    <div className={ styleCss.sort_link}>
                        <ul className={ styleCss.link_list}>
                            {Letter}
                        </ul>
                    </div>
                    {/* <!-- 定位 --> */}
                    <div className={ styleCss.position_city}>
                        <img src="/static/web/img/carQuery/posit.png" alt="" />
                        <span className={ styleCss.city_local}>当前定位城市</span>
                        <span className={ styleCss.city_name } onClick={ (e) => this.handleLocalClick(e)}>{this.state.currCity}</span>
                    </div>
                    {/* 热门城市  */}
                    <div className={ styleCss.hot_city}>
                        <span className={ styleCss.hot_city_txt}>热门城市</span>
                        <ul className={ styleCss.hot_city_list}>
                            {hotCity}
                        </ul>
                    </div>
                    {/*  城市列表  */}
                    <div className={ styleCss.city_list_box}>
                        {listHtml}
                    </div>
                </div>
            </div>
        )
    }
}
export default City