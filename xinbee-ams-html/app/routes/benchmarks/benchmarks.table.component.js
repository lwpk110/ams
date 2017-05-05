import React, {Component, PropTypes} from 'react';
import {Table, Pagination, Popconfirm} from 'antd';
var moment = require('moment');

export default class BenchMarksTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
    }

    onEditItem(data) {
        this.props.onEditItem(data);
    }

    onDeleteItem(id) {
        this.props.onDeleteItem(id)
    }

    render() {
        let benchMarksCol = [
            {
                title: '规则编码',
                dataIndex: 'code',
                key: 'code',
                width: '15%'
            },
            {
                title: '中文信息',
                dataIndex: 'explainChinese',
                key: 'explainChinese',
                width: '18%'
            },
            {
                title: '英文信息',
                dataIndex: 'explainEnglish',
                key: 'explainEnglish',
                width: '30%'
            }, {
                title: '次数',
                dataIndex: 'useCount',
                key: 'useCount',
                width: ''
            },
            {
                title: '分值',
                dataIndex: 'score',
                key: 'score',
                width: ''
            }, {
                title: 'SC分值',
                dataIndex: 'spamCheckScore',
                key: 'spamCheckScore',
                width: ''

            }, {
                title: '创建时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                width: '',
                render: (text, record) => (
                    <p>
                        {moment(text).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                )
            },
            {
                title: '操作',
                key: 'operation',
                width: 100,
                render: (text, record) => (
                    <p>
                        <a onClick={() => this.onEditItem(record)} style={{
                            marginRight: 4
                        }}>编辑</a>
                        <Popconfirm title='确定要删除吗？' onConfirm={() => this.onDeleteItem(record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </p>
                )
            }
        ];

        return (
            <Table pagination={false}
                   rowKey="benchMarksId"
                   size="middle"
                   loading={this.props.loading}
                   columns={ benchMarksCol }
                   dataSource={this.props.dataSource}/>
        )
    }
}

