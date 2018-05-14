import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class Stepper extends Component {
  constructor(props){
    super(props)

    this.state = {
      number: 0
    }
  }

  componentWillMount() {
    this.setState({
      number: this.props.number
    })
  }

  plus = (event) => {
    event.preventDefault();
    this.setState({
      number: this.state.number + 1
    })

    this.props.plus(this.state.number + 1)
  }

  minus = (event) => {
    event.preventDefault();
    this.setState({
      number: this.state.number - 1
    })
    this.props.minus(this.state.number - 1)
  }

  render() {
    let minus_button = null;
    let number_input = null;
    if(this.state.number > 0){
      minus_button =  <Button className="minus" onClick={this.minus}>-</Button>
      number_input =  <input readOnly={true} className="number_input" value={this.state.number}/>

    }
    return (
        <div className="container">
          {minus_button}
          {number_input}
          <Button className="plus" onClick={this.plus}>+</Button>
        </div>
    );
  }
}

export default Stepper;