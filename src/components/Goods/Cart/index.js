import React, {Component} from 'react';
import {Button, Badge} from 'antd-mobile';

import './index.css';

class Cart extends Component {
  render() {
    return (
      <div className="cart-root">
        <div className="cart-number">
          <Badge className="cart-badge" text={77}  />
        </div>
        <div className="cart-btn">
          <Button style={{height:'42px'}}  type="primary" >下一步</Button>
        </div>
      </div>
    );
  }
}

export default Cart