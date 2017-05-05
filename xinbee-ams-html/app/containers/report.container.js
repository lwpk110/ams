import React, {Component, PropTypes} from 'react';
import dva, {connect} from 'dva';

import ReportComponent from '../routes/report/report.component';

function mapStateToProps(state) {
    return {
        previewData: state.report.previewData,
        sendVolumeData: state.report.sendVolumeData,
        sendQualityX: state.report.sendQualityX,
        mailQualityX: state.report.mailQualityX,
        sendQualityData: state.report.sendQualityData,
        mailQualityData: state.report.mailQualityData,
        chartLoading: state.report.chartLoading,
        channelQualityData: state.report.channelQualityData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        previewSearch(data){
            dispatch({type: 'report/previewSearch', data});
        },
        sendVolumeSearch(data){
            dispatch({type: 'report/sendVolumeSearch', data});
        },
        sendQualitySearch(data){
            dispatch({type: 'report/sendQualitySearch', data});
        },
        mailQualitySearch(data){
            dispatch({type: 'report/mailQualitySearch', data});
        },
        channelQuality(data){
            dispatch({type: 'report/channelQuality', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportComponent);
