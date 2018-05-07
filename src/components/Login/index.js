import React, {Component} from 'react';
import './index.css';
import {
  InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: 5,
      begin: 0
    };
  }

  beginCountDown = (event) => {
    event.preventDefault();
    console.log(this.state.timeLeft)
    if (this.state.timeLeft > 0) {
      this.setState({
        begin: 1
      })

      let that = this
      let interval = setInterval(function () {
        console.log(that.state.timeLeft)
        if (that.state.timeLeft === 0) {
          clearInterval(interval);
          that.setState({
            begin: 0,
            timeLeft: 5
          })
        } else {
          that.setState({
            timeLeft: that.state.timeLeft - 1
          })
        }
      }, 1000)
    }
  }

  login = (event) => {
    event.preventDefault();

    this.props.history.replace('/app');
  }

  render() {
    return (
      <div className="flex-container">
        <div className="sub-title">手机号</div>

        <WingBlank size="sm">
          <InputItem
            type="phone"
            placeholder="请输入手机号"/>
        </WingBlank>
        <WhiteSpace size="lg" />

        <div className="sub-title">验证码</div>

        <WingBlank size="sm">
          <div className="verify-container">
            <InputItem
              className="input-item"
              type="number"
              placeholder="请输入验证码"/>
            <span className="verify-link" onClick={this.beginCountDown}>
              { this.state.begin === 0 ? '获取验证码' : this.state.timeLeft}
            </span>
          </div>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button type="primary" onClick={this.login}>登录</Button>
      </div>
    );
  }
}

export default Login;