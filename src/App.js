import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import reducer from './reducers';
import { routers } from './router'

let store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Router children = {routers}/>
            </Provider>
        );
    }
}

export default App;
