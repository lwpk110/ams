import React, {Component, PropTypes} from 'react';
import dva, {connect} from 'dva';

import MailChannelComponent from '../routes/channel/channel.component'

function mapStateToProps(state) {
    return {
        tableLoading: state.mailchannel.tableLoading,
        mailChannelData: state.mailchannel.mailChannelData,
        modalVisible: state.mailchannel.modalVisible,
        currentItem: state.mailchannel.currentItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchMailChannel(data){
            dispatch({type: 'mailchannel/searchMailChannel', data});
        },
        edit(data){dispatch({type: 'mailchannel/edit', data})},
        onEditItem(data){dispatch({type: 'mailchannel/onEditItem', data})},
        clearEditItem(data){dispatch({type: 'mailchannel/clearEditItem'}, data)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailChannelComponent);
