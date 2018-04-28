import React, {Component} from 'react';
import {Stepper} from 'antd-mobile';
import './index.css';

class IndexStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val:0
    };
  }

  throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1000
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  }

  onChange = this.throttle((val) => {
    console.log(val)
    this.setState({
      val: val
    })
  }, 100)

  render() {
    return (
      <Stepper
        showNumber
        max={100}
        min={0}
        step={1}
        defaultValue={0}
        value={this.state.val}
        onChange={this.onChange}
      />
    );
  }
}

export default IndexStepper;