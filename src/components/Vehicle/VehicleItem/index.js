import React, {Component} from 'react';
import {WhiteSpace} from 'antd-mobile';

import './index.css';

class VehicleItem extends Component {
  render() {
    return (
      <div className="vehicle-item-root">
        {this.props.data.name}
      </div>
    );
  }
}

export default VehicleItem;