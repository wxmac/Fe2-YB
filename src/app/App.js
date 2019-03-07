import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './App.css';
import store from '../store/store'
import { view as header } from '../components/header/index'
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <div className="container">
          <BrowserRouter>
            <div>
              <Route path="/" component={ header }></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
      
    );
  }
}

export default App;
