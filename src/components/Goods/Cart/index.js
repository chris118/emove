import React, {Component} from 'react';
import {Button, Badge} from 'antd-mobile';
import NaviBar from '../../Common/NaviBar';

import './index.css';

class Cart extends Component {
  render() {
    return (
      <div className="cart-root">
        <div className="cart-top">
          <div className="cart-number">
            <Badge className="cart-badge" text={77}  />
          </div>
          <div className="cart-info">您当前所选物体的总体积</div>
          <div className="cart-info-number">4.5 m³</div>

        </div>

        <div className="cart-bottom">
          <NaviBar/>
        </div>
      </div>
    );
  }
}

export default Cart