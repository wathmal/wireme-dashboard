/**
 * Created by wathmal on 11/30/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';


const app = document.getElementById('app');

// apply react router here
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="login" component={Login} />
        </Route>
    </Router>, app);

// ReactDOM.render(<App><Dashboard /></App>, app);