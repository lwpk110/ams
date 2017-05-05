import React, {Component, PropTypes} from 'react';
import {Table} from 'antd';

function TaskReportingList({
    dataSource,
    onAction
}) {

    const taskReportingCol = [
        {
            title: '通道名称',
            dataIndex: 'name',
            key: 'name',
            width: '80%'
        },
        {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => (
                <p>
                    <a onClick={() => onAction(record)} style={{
                        marginRight: 4
                    }}>执行</a>

                </p>
            )
        }
    ];

    return (
        <Table pagination={false}
               rowKey="name"
               size="middle"
               columns={ taskReportingCol }
               dataSource={dataSource}/>
    )
}

TaskReportingList.propTypes = {
    onAction: PropTypes.func,
    dataSource: PropTypes.array,

}

export default TaskReportingList

