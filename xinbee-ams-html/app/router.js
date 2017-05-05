import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

const routes = {
    App : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/app.container'))
        }, 'App')
    },

    ReportApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/report.container'))
        }, 'ReportApp')
    },

    masksApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/masks.container'))
        }, 'masksApp')
    },

    mailChannelApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/channel.container'))
        }, 'mailChannelApp')
    },

    taskReportingApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/taskreporting.container'))
        }, 'taskReportingApp')
    },

    benchMarksApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/benchmarks.container'))
        }, 'benchMarksApp')
    },

    markLogApp : (nextState, cb)=>{
        require.ensure([], require => {
            cb(null, require('./containers/marklog.container'))
        }, 'markLogApp')
    },

}

const RouterConfig = ({history}) => {
    return (
            <Router history={history}>
                <Route path="/" getComponent={routes.App}>
                    <IndexRedirect to="/sendreport" />
                    <Route path="/sendreport" getComponent={routes.ReportApp} ></Route>
                    <Route path="/masksmanger" getComponent={routes.masksApp} ></Route>
                    <Route path="/mailchannel" getComponent={routes.mailChannelApp} ></Route>
                    <Route path="/taskreporting" getComponent={routes.taskReportingApp} ></Route>
                    <Route path="/template/benchmarks" getComponent={routes.benchMarksApp} ></Route>
                    <Route path="/template/marklog" getComponent={routes.markLogApp} ></Route>
                </Route>
            </Router>
    );
};

export default RouterConfig;
