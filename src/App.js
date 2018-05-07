import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import reducer from './reducers';
import Login from './components/Login';
import Home from './components/Home/index';
import authHOC from './components/AuthHOC';

let store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Router>
                    <Switch>
                        <Route path='/app' component={authHOC(Home)}/>
                        <Route path='/login' component={authHOC(Login)}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
