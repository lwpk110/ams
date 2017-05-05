import React, { Component, PropTypes } from 'react';
import dva, { connect } from 'dva';

import MasksComponent from '../routes/masks/masks.component';

function mapStateToProps(state) {
    return {
        tableLoading : state.masks.tableLoading,
        maskData : state.masks.maskData,
        totalElements : state.masks.totalElements,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchMasks(data){dispatch({type: 'masks/searchMasks', data});},
        handleSend(data){dispatch({type: 'masks/handleSend', data});}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasksComponent);
