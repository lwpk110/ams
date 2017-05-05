import React, { Component } from 'react';
import dva, { connect } from 'dva';

import App from '../app.compontent';

function mapStateToProps(state) {
    return {
        location : state.routing.locationBeforeTransitions.pathname,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
