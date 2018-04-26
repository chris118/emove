import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import authHOC from '../components/AuthHOC';

export const routers = (
    <Switch>
        <Route exact path='/' component={authHOC(Home)}/>
        <Route path='/login' component={authHOC(Login)}/>
    </Switch>
);