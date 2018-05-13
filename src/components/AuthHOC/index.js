import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Get} from '../../service'

export default function author(WrappedComponent) {
  class AuthInterceptor extends Component {

    componentWillMount() {
      const {history} = this.props
      const isAuthor = !!window.localStorage.getItem("open-id");
      console.log("isAuthor", isAuthor)
      if(this.props.location.pathname === '/login'){
        history.replace('/login');
      }else {
        Get("/test", {redirect_url: 'http://m.ebanjia.cn/'})
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            console.error(error);
            if (error.code === 6004) {//跳转登录页面
              history.replace('/login');
            }else if (error.code === 6005) {
              window.location.href = 'http://oauth.ebanjia.cn/oauth?redirect_url=http://localhost:3000/#/login'
            }
          });
      }


    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(AuthInterceptor);
}

