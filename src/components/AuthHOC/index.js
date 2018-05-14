import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import history from '../../Router/history';
import {KEY_UID, KEY_TOKEN} from '../../utils/index'

export default function author(WrappedComponent) {
  class AuthInterceptor extends Component {

    componentWillMount() {
      console.log(this.props)
      console.log(history)

      const isLogin = !!window.localStorage.getItem("token");
      if(!isLogin) {
        // 如果第一次登录 服务端帮跳转登录页
        // 如果token失效 使用redirect_url进行跳转
        if(history.location.search.indexOf('token') != -1){
          //存储uid&token
          let subStr = history.location.search.substr(1)
          let splites = subStr.split("&")
          let u_array = splites[0].split('=')
          let uid = u_array[1]
          let t_array = splites[1].split('=')
          let token = t_array[1]
          window.localStorage[KEY_UID] = uid;
          window.localStorage[KEY_TOKEN] = token;
        }else {
          window.location.href = 'http://oauth.ebanjia.cn/oauth?redirect_url=' + encodeURIComponent('http://localhost:3000/#/app')
        }
      }
      // if(this.props.location.pathname === '/login'){
      //   history.replace('/login');
      // }else {
      //   Get("/test", {redirect_url: 'http://m.ebanjia.cn/'})
      //     .then(function (res) {
      //       console.log(res);
      //     })
      //     .catch(function (error) {
      //       console.error(error);
      //       if (error.code === 6004) {//跳转登录页面
      //         history.replace('/login');
      //       }else if (error.code === 6005) {
      //         window.location.href = 'http://oauth.ebanjia.cn/oauth?redirect_url=http://localhost:3000/#/login'
      //       }
      //     });
      // }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(AuthInterceptor);
}

