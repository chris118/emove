import React, {Component} from 'react';
import './index.css';
import {
  InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import {Get2, Post} from '../../service';
import {KEY_UID, KEY_TOKEN} from '../../utils/index'


class Login extends Component {
  constructor(props) {
    super(props);

    let open_id = ""
    let param = this.props.location.search
    if (param.indexOf("?") !== -1) {    //判断是否有参数
      let str = param.substr(1) //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      let splites = str.split("=")   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
      open_id = splites[1]
    }

    this.state = {
      open_id: open_id,
      mobile:"15618516930",
      timeLeft: 5,
      begin: 0,
      verifyEnable:true
    };
  }

  //获取验证码
  verifyCode = (event) => {
    event.preventDefault();

    if(!this.state.verifyEnable){
      return
    }

    Get2("/send/login-code", {params :{username: this.state.mobile}} )
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
        // console.log(that.state.timeLeft)
        if (that.state.timeLeft === 0) {
          clearInterval(interval);
          that.setState({
            verifyEnable: true
          })
          that.setState({
            begin: 0,
            timeLeft: 5
          })
        } else {
          that.setState({
            verifyEnable: false
          })
          that.setState({
            timeLeft: that.state.timeLeft - 1
          })
        }
      }, 1000)
    }
  }

  login = (event) => {
    event.preventDefault();

    let that = this
    Post("/code/login", {
      username: this.state.mobile,
      code: '123456',
      openid: this.state.open_id
    })
    .then(function (res) {
       //登录成功 存储uid token
      console.log(res)
      window.localStorage[KEY_UID] = res.result.uid;
      window.localStorage[KEY_TOKEN] = res.result.token;

      that.props.history.replace('/app')
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