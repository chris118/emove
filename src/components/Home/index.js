import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import Goods from '../Goods';
import Info from '../Info';
import InfoEx from '../InfoEx';
import Vehicle from '../Vehicle';
import Order from '../Order';
import OrderList from '../OrderList';

import './index.css';

class Home extends Component {

  render() {
    return (
      <div className="home-container">
        <div className="content">
          <Switch>
            <Route path={`${this.props.match.path}`} exact component={Info} />
            <Route path={`${this.props.match.path}/infoex`} component={InfoEx} />
            <Route path={`${this.props.match.path}/goods`} component={Goods} />
            <Route path={`${this.props.match.path}/vehicle`} component={Vehicle} />
            <Route path={`${this.props.match.path}/order`} component={Order} />
            <Route path={`${this.props.match.path}/orderlist`} component={OrderList} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state === reducer
  return {
  };
};

export default connect(mapStateToProps)(Home);
