import React, {Component, PropTypes} from 'react';
import dva, {connect} from 'dva';

import BenchMarksComponent from '../routes/benchmarks/benchmarks.component'

function mapStateToProps(state) {
    return {
        tableLoading: state.benchmarks.tableLoading,
        benchMarksData: state.benchmarks.benchMarksData,
        modalVisible: state.benchmarks.modalVisible,
        totalElements: state.benchmarks.totalElements
    };
}

function mapDispatchToProps(dispatch) {
    return {
        query(data){
            dispatch({type: 'benchmarks/query', data});
        },
        create(data){dispatch({type: 'benchmarks/create', data})},
        update(data){dispatch({type: 'benchmarks/update', data})},
        deleteItem(data){dispatch({type: 'benchmarks/deleteItem', data})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchMarksComponent);
