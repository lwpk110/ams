import React, {Component, PropTypes} from 'react';
import {Table} from 'antd';
var moment = require('moment');

export default class ChannelTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
    }

    onEditItem(data){
        this.props.onEditItem(data);
        console.log("--++++++----->>>"+data.id+data.name)
    }

    render() {
        let channelCol = [
                {
                    title: '通道名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: '15%'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                    width: '25%'
                },
                {
                    title: '最大数量',
                    dataIndex: 'maxNumLimit',
                    key: 'maxNumLimit',
                    width: ''
                },
                {
                    title: '费用',
                    dataIndex: 'fee',
                    key: 'fee',
                    width: ''
                }, {
                    title: '排序',
                    dataIndex: 'sequence',
                    key: 'sequence',
                    width: ''

                },
                {
                    title: '是否禁用',
                    dataIndex: 'disabled',
                    key: 'disabled',
                    width: '',
                    render: (text, record, index) => {
                        let type = text,
                            result = '';

                        switch (type) {
                            case true:
                                result = '是';
                                break;

                            case false:
                                result = '否';
                                break;
                            default:
                                break;
                        }

                        return (
                            <div>{result}</div>
                        )
                    }
                },{
                    title: '是否退订',
                    dataIndex: 'unsubscribeLink',
                    key: 'unsubscribeLink',
                    width: '',
                    render: (text, record, index) => {
                        let type = text,
                            result = '';

                        switch (type) {
                            case false:
                                result = '否';
                                break;

                            case true:
                                result = '是';
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
                    title: '通道编码',
                    dataIndex: 'channelCode',
                    key: 'channelCode',
                    width: ''
                },{
                title: '操作',
                key: 'operation',
                width: 100,
                render: (text, record) => (
                    <p>
                        <a onClick={() => this.onEditItem(record)} style={{
                            marginRight: 4
                        }}>编辑</a>

                    </p>
                )
            }
            ];

        return (
            <Table pagination = {false}
                   rowKey="channelCode"
                   size="middle"
                   loading={this.props.loading}
                   columns={ channelCol }
                   dataSource={this.props.dataSource}/>
        )
    }
}

