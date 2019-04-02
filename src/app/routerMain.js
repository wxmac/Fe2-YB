// 引入页面入口
import React, { Component } from 'react';
import { Route } from "react-router-dom"
import  {bargain} from './routerName'
export default class Main extends Component{
    render(){
        return(
            <div>
                <Route path="/bargain" component={ bargain }></Route>
            </div>
        )
    }
}
