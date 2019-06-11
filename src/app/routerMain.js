// 引入页面入口
import React, { Component } from 'react';
import { Route } from "react-router-dom"
import  {
    bargain,
    city,
    car,
} from './routerName'


// console.log('routerNames-->',routerNames)
export default class Main extends Component{
    render(){
        return(
            <div>
                <Route path="/bargain" component={ bargain }></Route>
                <Route path="/city" component={ city }></Route>
                <Route path="/car" component={ car }></Route>
            </div>
        )
    }
}
