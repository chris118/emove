import React, {Component} from 'react';
import {Stepper} from 'antd-mobile';
import {throttle} from '../../../utils'
import './index.css';

class IndexStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val:0
    };
  }

  componentDidMount() {
    console.log(this.stepper.stepperRef.props.style)
  }

  onChange = throttle((val) => {
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
        ref={(stepper) => { this.stepper = stepper; }}
      />
    );
  }
}

export default IndexStepper;