import React, {Component, PropTypes} from 'react';
import dva, {connect} from 'dva';

import MarksLogComponent from '../routes/marklog/marklog.component'

function mapStateToProps(state) {
    return {
        tableLoading: state.marklog.tableLoading,
        markLogData: state.marklog.markLogData,
        logDetails: state.marklog.logDetails,
        totalElements: state.marklog.totalElements,
        mailTemplate: state.marklog.mailTemplate
    };
}

function mapDispatchToProps(dispatch) {
    return {
        query(data){
            dispatch({type: 'marklog/query', data});
        },
        searchDetails(data){dispatch({type: 'marklog/searchDetails', data})},

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksLogComponent);
