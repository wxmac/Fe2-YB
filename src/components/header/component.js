import React, { Component } from 'react'
import indexCss from './index.css'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
DragDropContext(HTML5Backend)
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            hour:0,
            min:0,
            sec:0
        }
    }
    render(){
        const List = this.props.list.map((item, index) => {
            return <p className={indexCss.list_item} key={item.id}>{item.title}</p>
        })

        const show = this.props.showModle ? 'true' : 'false'
        return (
            <div className={indexCss.container}>
                <div className={indexCss.listbox}>  
                    {List}
                </div>

               {show} 
                
                <div onClick={ this.props.openModel }>
                    点击我改变状态 - true
                </div>

                 <div onClick={ this.props.hideModel }>
                    点击我改变状态 - false
                </div>
                {this.state.hour}:{this.state.min}:{this.state.sec}

            </div>
        )
    }

    componentDidMount(){
        this.props.getList()
        this.runTime(100000)
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
    
}

export default Header; 
 