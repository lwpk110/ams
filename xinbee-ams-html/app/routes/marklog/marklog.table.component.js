import React, {Component, PropTypes} from 'react';
import {Table, Pagination, Popconfirm} from 'antd';
var moment = require('moment');

export default class ScoreTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
    }

    onDetails(id) {
        this.props.onDetails(id);
    }

    openTemplate(template) {
        this.props.openTemplate(template);

    }

    render() {
        let markLogCol = [
            {
                title: '调度时间',
                dataIndex: 'invokeDate',
                key: 'invokeDate',
                width: '10%',
                render: (text, record) => (
                    <p>
                        {moment(text).format("YYYY-MM-DD HH:mm")}
                    </p>
                )
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '20%'
            },
            {
                title: '评分',
                dataIndex: 'score',
                key: 'score',
                width: '7%'
            },
            {
                title: '评分耗时',
                dataIndex: 'consumeTime',
                key: 'consumeTime',
                width: '7%'
            },{
                title: '来源',
                dataIndex: 'source',
                key: 'source',
                width: '9%'
            }, {
                title: '状态',
                dataIndex: 'invokeStatus',
                key: 'invokeStatus',
                width: '9%',
                render: (text, record, index) => {
                    let type = text,
                        result = '';
                    switch (type) {
                        case true:
                            result = '成功';
                            break;
                        case false:
                            result = '失败';
                            break;
                        default:
                            break;
                    }
                    return (
                        <div>{result}</div>
                    )
                }
            }, {
                title: '平台',
                dataIndex: 'platformCode',
                key: 'platformCode',
                width: '',

            }, {
                title: '任务ID',
                dataIndex: 'taskId',
                key: 'taskId',
                width: ''
            },
            {
                title: '操作',
                key: 'operation',
                width: 100,
                render: (text, record) => (
                    <p>
                        <a onClick={() => this.onDetails(record.id)} style={{
                            marginRight: 4
                        }}>详情</a>
                        <a onClick={() => {
                            this.openTemplate(record.template)
                        }} style={{
                            marginRight: 4
                        }}>模板</a>

                    </p>
                )
            }
        ];

        return (
            <Table pagination={false}
                   rowKey="id"
                   size="middle"
                   loading={this.props.loading}
                   columns={ markLogCol }
                   dataSource={this.props.dataSource}/>
        )
    }
}

