/**
 * Created by girl on 16/8/3.
 * 此组建做一些分页处理,通过不同的链接访问不同的页面
 */
import React from 'react';
import { Route } from 'react-router';
import App from './containes/App';
//import * as containers from './containes';
import CounterPage from  './containes/CounterPage';
import Login from  './containes/Login';
/*eslint-enable*/

//const {
//    CounterPage
//    } = containers;
export default (
    <Route >
        <Route path="/a" component={CounterPage} />
        <Route path="/" component={Login} />
    </Route>
)
