import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
var moment = require('moment');

export default class MasksTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
    }

    render() {
        let maskCol = [
            {
                title: '创建时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                width: '15%',
                render :(text, record, index) => {
                    return(
                        <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                    )
                }
            },
            {
                title: '任务名称',
                dataIndex: 'name',
                key: 'name',
                width: '25%'
            },
            {
                title: '重发次数',
                dataIndex: 'retryCount',
                key: 'retryCount',
                width: ''
            },
            {
                title: '总发送次数',
                dataIndex: 'totalCount',
                key: 'totalCount',
                width: ''
            },
            {
                title: '通道',
                dataIndex: 'channelName',
                key: 'channelName',
                width: ''
            },
            {
                title: '状态',
                dataIndex: 'deliveryStatus',
                key: 'deliveryStatus',
                width: '',
                render : (text, record, index) => {
                    let type = text,
                        result = '';

                    switch(type){
                        case 1:
                           result= '发送中';
                           break;

                        case 3:
                           result= '系统取消';
                           break;

                        case 100:
                           result= '发送成功';
                           break;

                        case 5:
                           result= '已处理';
                           break;

                        default:
                         break;
                    }

                    return (
                        <div>{result}</div>
                    )
                }
            },
            {
                title: '账号',
                dataIndex: 'userKey',
                key: 'userKey',
                width: ''
            }
        ],
        { selectedRowKeys } = this.props,
        rowSelection = {
            selectedRowKeys,
            onChange : (selectedRowKeys)=>{
                this.props.handleSelect(selectedRowKeys);
            },
        };

        return (
            <Table rowSelection={rowSelection}
                rowKey="taskCode"
                size="middle"
                loading= {this.props.loading}
                pagination={false}
                columns={ maskCol }
                dataSource={this.props.dataSource} />
        )
    }
}

