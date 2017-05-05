import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Row, Col, Button} from 'antd';
import TaskReportingList from '../routes/taskreporting/taskreporting.list'

function TaskReporting({location, dispatch, taskreporting}) {
    const {taskReportingData} = taskreporting
    const taskReportListProps = {
        dataSource: taskReportingData,
        onAction(data) {
            dispatch({
                type: 'taskreporting/action',
                payload: data
            })
        }
    }

    return (
        <div>
            <section className="content-header">
                <h1>任务报道调度</h1>
            </section>

            <section className="content">
                <Row className="data-preview">
                    <Col span={24}>
                        <div className="box box-info">
                            <div className="box-header with-border">
                            </div>
                            <div className="box-body">
                                <TaskReportingList {...taskReportListProps} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </div>

    )
}

TaskReporting.propTypes = {
    taskreporting: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}


function mapStateToProps({taskreporting}) {
    return {taskreporting}
}

export default connect(mapStateToProps)(TaskReporting)

