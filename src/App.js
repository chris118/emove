import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';

import history from './Router/history';

import reducer from './reducers';
import Login from './components/Login';
import Home from './components/Home/index';
import authHOC from './components/AuthHOC';

let store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router touchstart={this.touchstart} touchmove={this.touchmove} history={history} >
          <Switch>
            <Route path='/app' component={authHOC(Home)}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
