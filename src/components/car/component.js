import React, { Component } from 'react'
import styleCss from './style.css'
class Car extends Component{
    constructor(props){
        super(props)
        this.state = {
           letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
           curr : '',
           brand_name:'',
           series_id:'',
           seriesName:'',
           picPath:'',
           modelId:'',
           modelName:'',
           toggle:false
        }
    }
   
    componentDidMount(){
        this.props.getCarFirstList()
    }
    
    
    scrollToAnchor(anchorName){
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { 
                anchorElement.scrollIntoView({behavior : "smooth"}); 
            }
        }
    }
    handleSetId(e,id,brand_name){
        e.stopPropagation();
        this.setState({
            curr:id,
            brand_name:brand_name
        })
        this.props.getSecondCar(id)
        this.refs.detail_type_box.style.display = 'block'
        this.refs.detail_type_box.style.right = '0rem'
       
    }
    handleThreeCar(e,brand_id,seriesId,seriesName,picPath){
        e.stopPropagation()
        this.setState({
            seriesName,
            picPath,
            series_id:seriesId,
            toggle:!this.state.toggle
        })
        const config = {
            brand_id,
            seriesId
        }
        this.props.getThreeCar(config)
    }
    handleSetModelType(e){
        e.stopPropagation()
        const modelId = e.target.getAttribute('data-id')
        const modelName= e.target.getAttribute('data-name')
        const brandName = this.state.brand_name
        const seriesName = this.state.seriesName
        const picPath = this.state.picPath
        const config = {
            brandName,
            seriesName,
            modelId,
            modelName,
            picPath
        }
        this.props.get_Car(config)
        this.props.history.go(-1)
    }
    
    hadnleHideBox(){
        this.refs.detail_type_box.style.right = '-6.2rem'
        this.refs.detail_type_box.style.display = 'none'
    }
   
    rednerLetter = () => {
        let views = [];
         this.state.letter.map((item,index) => { // eslint-disable-line
            views.push(<li key={index} className={ styleCss.link_item} 
                onClick={()=>this.scrollToAnchor(item)} >
                {item}
         </li>);
        })
        return views;
    }

    handleBack(){
        this.props.history.go(-1)
    }
    render() {

        // 第一层
        const carList = this.props.car.map((item,index) => {
            return (
                <ul className={styleCss.type_All_list} key={index}>
                    <div className={styleCss.type_letter} id={item.type} >
                        { item.type}
                    </div>
                    {
                        item.data.map((it,i) =>{
                            return <li className={it.id === this.state.curr ? styleCss.type_main_active : '' } 
                                     key={it.id} >
                                        <div className={styleCss.sim_list} >
                                            <img className={styleCss.sim_list_img} src={it.pic_logo} alt="" 
                                                data-id={it.id} onClick={(e) => this.handleSetId(e,it.id,it.brand_name)}
                                            />
                                            <div className={styleCss.sim_list_txt} 
                                            data-id={it.id} onClick={(e) => this.handleSetId(e,it.id,it.brand_name)}>
                                            {it.brand_name}
                                            </div>
                                        </div>
                                    </li>
                        })
                    }
                </ul>
            )
        })

        // 第三层
        let ThreeCarList = ''
        if(this.props.ThreeCar){
            ThreeCarList =  this.props.ThreeCar.map((item,index) => {
                return <ul className={`${styleCss.model_pro} `} key={index}>
                        <span className={styleCss.model_pro_time}>{item.type}</span>
                        {
                            item.data.map((it,i) => {
                            return    <div className={`${styleCss.model_pro_type_item} `} data-id={it.id} key={it.id} 
                                        onClick={ (e) => this.handleSetModelType(e) } data-name = {it.model_name}>
                                                <span onClick={ (e) => this.handleSetModelType(e) } data-name = {it.model_name} data-id={it.id}>{it.model_name}</span>
                                                <span onClick={ (e) => this.handleSetModelType(e) } data-name = {it.model_name} data-id={it.id}>{it.model_price}万元</span>
                                            </div>  
                            })
                        }                                   
                 </ul>
            })
        }

        // 第二层
        let SecondCarList = ''
        if(this.props.SecondCar){
            SecondCarList = this.props.SecondCar.map((item,index)=>{
                return <div className={styleCss.detail_type_list} key={index} >
                            <span className={styleCss.type_list_name}>{item.type}</span>
                            {
                                item.data.map((it,i) => {
                                    return <div className={styleCss.type_list_type} 
                                                data-brand_id={it.brand_id}
                                                data-id={it.id} 
                                                data-series_name ={it.series_name}
                                                data-pic_path={it.pic_path} key={it.id} 
                                                onClick = { (e) => this.handleThreeCar(e,it.brand_id,it.id,it.series_name,it.pic_path) }
                                                >
                                                <ul className={styleCss.type_list_model}> 
                                                    <li className={styleCss.type_list_model_infobox}>
                                                        <div className={styleCss.type_list_model_info}>
                                                            <img className={styleCss.model_detail_img} src={it.pic_path} alt="" />
                                                            <div className={styleCss.model_detail_indo}>
                                                                <span>{it.series_name}</span>
                                                                <span></span>
                                                            </div>
                                                            <div className={styleCss.model_detail_arrowBottom}>
                                                            </div>
                                                        </div>
                                                        <div className={`${styleCss.model_pro_listNox} ${ this.state.series_id === it.id && this.state.toggle ? styleCss.show : '' }`}>
                                                            {ThreeCarList}
                                                        </div>
                                                    </li> 
                                                </ul>

                                            </div>
                                })
                            }
                        </div>
            }) 
        }
        

       
        return(
            <div className={ styleCss.container } id="container" onClick={(e) => this.hadnleHideBox(e)}>
                <div className={styleCss.header_comm}>
                    <i className={styleCss.icon_back} onClick={ (e) => {this.handleBack(e)} }></i>
                    <div className={styleCss.header_title}>选择车型</div>
                </div>
                <div className={styleCss.type_box}>

                        {carList}

                    
                    <div className={styleCss.sort_link}>
                        <ul className={styleCss.link_list}>
                            {this.rednerLetter()}
                        </ul>
                    </div>

                    <div className={styleCss.detail_type_box} ref="detail_type_box">
                        {SecondCarList}
                    </div>
                </div>   
            </div>
        )
    }
}
export default Car