import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class NaviBar extends Component {
  render() {
    return (
      <div className="navi-bar">
        <Button className="navi-btn" type="primary" >上一步</Button>
        <Button className="navi-btn" type="primary" >下一步</Button>
      </div>
    );
  }
}

export default NaviBar;