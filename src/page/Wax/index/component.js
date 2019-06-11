import React, { Component } from 'react'
import styleCss from './style.css'
import {Map, Marker} from 'react-bmap'
// MarkerList
class Wax extends Component{
    constructor(props){
        super(props)
        this.state={
            load: true,
            posi :{
                lng:  120.219375, 
                lat: 30.259245
            }
        }
    }
    // 复位
    handleResetPosition(){
        let BMap = global.BMap
        let point = new BMap.Point(120.219375, 30.259245)
        this.map.setCenter(point)
    }
    handleClick(e){
        console.log(e)
    }
    componentDidMount(){
        this.refs.container.style.height = (window.innerHeight) + 'px'
        this.handleResetPosition()
    }
    render() {
        return(
            <div className={ styleCss.container } ref="container" >
                <Map ref={ref => this.map = ref.map}  center={this.state.posi}   zoom="13" >
                   <Marker position={{lng: 120.219375, lat: 30.259245}} offset={new global.BMap.Size(-15, -40)} >
                        <img src={require('../../../assets/img/shop/active_marker.png')} 
                            onClick={function(e){
                                console.log(e.currentTarget)
                            }
                        } 
                        className={styleCss.icon}alt=""/>
                    </Marker>
                </Map>



                <img alt="" onClick = {(e) => this.handleResetPosition(e)} src={ require('../../../assets/img/shop/icon_get-current.png') } className={ `${styleCss.map_icon} ${styleCss.get_current}`} />
               <div className={ styleCss.main_container} >
             

                    {/* <img alt="" src={ require('../../../assets/img/shop/map_back-cion.png') } className={ `${styleCss.backIcon} ${styleCss.hidden}`} />
                    <div className={ styleCss.shop_shadow}>
                        <img alt="" src={ require('../../../assets/img/shop/icon-plus.png') } className={ `${styleCss.map_icon} ${styleCss.map_plus}`} />
                        <img alt="" src={ require('../../../assets/img/shop/icon-min.png') } className={ `${styleCss.map_icon} ${styleCss.map_min}`} />
                        <div className={ `${styleCss.shop_container} ${styleCss.shop}`} >
                            <div className={ styleCss.top}>
                                <div className={ styleCss.img_c}>
                                    <img alt="" id="shop_img" src="" className={ styleCss.img_b} />
                                    <span id="shop_time" className={ styleCss.img_t}></span>
                                </div>
                                <div className={ styleCss.disc_c}>
                                    <div className={ styleCss.disc_top}>
                                        <span id="shop_name" className={ styleCss.top_name}></span>
                                        <div id="wash_normal" className={ `${styleCss.top_normal} ${styleCss.wash_stand}`}><span>标</span></div>
                                        <div id="wash_clean" className={ `${styleCss.top_clean} ${styleCss.wash_stand}`}><span>精</span></div>
                                    </div>
                                    <div className={ styleCss.disc_center}>
                                        <span className={ styleCss.center_txt}>评分：<span id="shop_grade" className={ styleCss.red}></span></span>
                                        <span className={ styleCss.center_txt}>订单数：<span id="shop_quantity" className={ styleCss.red}></span></span>
                                    </div>
                                    <div className={ styleCss.disc_bottom}>
                                    </div>
                                </div>
                            </div>
                            <div className={ styleCss.bottom}>
                                <div className={ styleCss.position_c}>
                                    <span id="shop_distance" className={ styleCss.distance}></span>
                                    <span id="shop_address" className={ styleCss.position}></span>
                                </div>
                                <span className={ styleCss.icon_positionbox}>
                                    <img alt="" src= { require('../../../assets/img/shop/icon-position.png') }  className={ styleCss.icon_position}/>
                                </span>
                            </div>
                        </div>
                    </div> */}

                    {/* <div id="mapSelectDialog" className={ `${styleCss.map_shadow} ${styleCss.hidden}`}>
                        <div className={ styleCss.dialogBody}>
                            <div className={ styleCss.title_c}>
                                <span>请选择地图</span>
                            </div>
                            <div className={ styleCss.mapItem} data-type="0">
                                <span>高德地图</span>
                            </div>
                            <div className={ styleCss.mapItem} data-type="1">
                                <span>百度地图</span>
                            </div>
                            <div className={ styleCss.cancelBtn}>
                                <span>取消</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default Wax