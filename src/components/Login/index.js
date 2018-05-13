import React, {Component} from 'react';
import './index.css';
import {
  InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import {Get, Post} from '../../service';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile:"15618516930",
      timeLeft: 5,
      begin: 0
    };
  }

  //获取验证码
  verifyCode = (event) => {
    event.preventDefault();

    console.log(this.state.mobile)
    Get("/send/login-code", {params :{username: this.state.mobile}} )
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.error(error);
      });


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

    Post("/send/login-code", {
      username: this.state.mobile,
      code: '123456'
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  phoneOnChange = (e) => {
    this.setState({
      mobile: e
    })
  }
  render() {
    return (
      <div className="flex-container">
        <div className="sub-title">手机号</div>

        <WingBlank size="sm">
          <InputItem
            placeholder="请输入手机号"
            value={this.state.mobile}
            onChange={this.phoneOnChange}/>
        </WingBlank>
        <WhiteSpace size="lg" />

        <div className="sub-title">验证码</div>

        <WingBlank size="sm">
          <div className="verify-container">
            <InputItem
              className="input-item"
              type="number"
              placeholder="请输入验证码"/>
            <span className="verify-link" onClick={this.verifyCode}>
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