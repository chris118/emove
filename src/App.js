import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';

import history from './Router/history';

import reducer from './reducers';
import Login from './components/Login';
import Info from './components/Info/index';
import InfoEx from './components/InfoEx/index';
import Goods from './components/Goods/index';
import Vehicle from './components/Vehicle/index';
import Order from './components/Order/index';
import OrderList from './components/OrderList/index';

import authHOC from './components/AuthHOC';

let store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router touchstart={this.touchstart} touchmove={this.touchmove} history={history} >
          <Switch>
            <Route path='/login' component={authHOC(Login)}/>
            <Route path='/app' component={authHOC(Info)}/>
            <Route path='/infoex' component={authHOC(InfoEx)}/>
            <Route path='/goods' component={authHOC(Goods)}/>
            <Route path='/vehicle' component={authHOC(Vehicle)}/>
            <Route path='/order/:id' component={authHOC(Order)}/>
            <Route path='/orderlist' component={authHOC(OrderList)}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
