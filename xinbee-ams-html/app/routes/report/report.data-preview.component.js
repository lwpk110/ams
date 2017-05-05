import React, { Component, PropTypes } from 'react';

import { Row, Col, Icon} from 'antd';

export default class DataPreview extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Row className="detail-wapper">
                <Col span={3} className="data-detail left-line">
                    <p><span>任务</span></p>
                    <p>{this.props.dataSource.taskCount} <span>个</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>发送量</span></p>
                    <p>{this.props.dataSource.total} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>硬退</span></p>
                    <p>{this.props.dataSource.hardBounce} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>软退</span></p>
                    <p>{this.props.dataSource.softBounce} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>打开</span></p>
                    <p>{this.props.dataSource.openCount} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>点击</span></p>
                    <p>{this.props.dataSource.allClicked} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail left-line">
                    <p><span>退订</span></p>
                    <p>{this.props.dataSource.unsubscribe} <span>封</span></p>
                </Col>
                <Col span={3} className="data-detail">
                    <p><span>投诉</span></p>
                    <p>{this.props.dataSource.spamComplain} <span>封</span></p>
                </Col>
            </Row>
        )
    }
}
