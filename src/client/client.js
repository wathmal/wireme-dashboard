/**
 * Created by wathmal on 11/30/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

const app = document.getElementById('app');

// apply react router here
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="profile" component={Profile}/>
        </Route>
    </Router>, app);

// ReactDOM.render(<App><Dashboard /></App>, app);