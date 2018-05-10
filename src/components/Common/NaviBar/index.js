import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class NaviBar extends Component {

  previous = (event) => {
    this.props.onPrevious()
  }

  next = (event) => {
    this.props.onNext()
  }

  render() {
    return (
      <div className="navi-bar">
        <Button className="navi-btn" type="primary" onClick={this.previous}>上一步</Button>
        <Button className="navi-btn" type="primary" onClick={this.next}>下一步</Button>
      </div>
    );
  }
}

export default NaviBar;