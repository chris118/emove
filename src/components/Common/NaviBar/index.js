import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class NaviBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextTitle: "下一步",
      previousTitle: "上一步"
    };
  }
  componentDidMount() {
    console.log(this.props.nextTitle)
    if(this.props.nextTitle !== undefined){
      this.setState({
        nextTitle: this.props.nextTitle,
      })
    }
    if(this.props.previousTitle !== undefined){
      this.setState({
        previousTitle: this.props.previousTitle,
      })
    }
  }
  previous = (event) => {
    this.props.onPrevious()
  }

  next = (event) => {
    this.props.onNext()
  }

  render() {
    return (
      <div className="navi-bar">
        <Button className="navi-btn" type="primary" onClick={this.previous}>{this.state.previousTitle}</Button>
        <Button className="navi-btn" type="primary" onClick={this.next}>{this.state.nextTitle}</Button>
      </div>
    );
  }
}

export default NaviBar;