import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import reducer from './reducers';
import Login from './components/Login';
import Home from './components/Home/index';
import authHOC from './components/AuthHOC';

let store = createStore(reducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScroller: false,
    };
  }
  touchstart = (el)=> {
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight;
    //If we're at the top or the bottom of the containers
    //scroll, push up or down one pixel.
    //
    //this prevents the scroll from "passing through" to
    //the body.
    if(top === 0) {
      el.scrollTop = 1;
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  }

  touchmove = (el)=> {
    console.log("move ....")
    //if the content is actually scrollable, i.e. the content is long enough
    //that scrolling can occur
    if(el.offsetHeight < el.scrollHeight)
      this.setState({
        isScroller: true,
      })
  }
  componentDidMount() {
    let _this = this
    // this.overscroll(document.querySelector('.scroll'));
    document.body.addEventListener('touchmove', function(evt) {
      evt.preventDefault();
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router touchstart={this.touchstart} touchmove={this.touchmove}>
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
