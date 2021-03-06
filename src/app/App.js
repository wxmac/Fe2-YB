import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom"
import  './reset.css';
import store from '@/store/store'
import Main from './routerMain'
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
          <HashRouter>
              <Main/>
          </HashRouter>
      </Provider>
      
    );
  }
}

export default App;
