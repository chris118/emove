import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home/index';
import authHOC from '../components/AuthHOC';

export const routers = (
    <Switch>
        <Route exact path='/' component={authHOC(Home)}/>
        <Route path='/login' component={authHOC(Login)}/>
    </Switch>
);