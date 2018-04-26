import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

export default function author(WrappedComponent) {
  class AuthInterceptor extends Component {

    componentWillMount() {
      const isLoggedIn = !!window.localStorage.getItem("pt-uid");

      const {history} = this.props

      //未登陆 跳转到登陆页
      if (!isLoggedIn && this.props.location.pathname !== "/login") {
        history.replace('/login');
      }

      //拦截地址栏直接输入login
      if(isLoggedIn && this.props.location.pathname === '/login'){
        history.replace('/');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(AuthInterceptor);
}

