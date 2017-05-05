import React, {Component, PropTypes} from 'react';
import {Row, Col, Modal} from 'antd'

export default class MarkLogModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.props.details,
            title: '评分详情'
        };
    }

    handleCancel() {
        this.setState({
            item: {}
        })
        this.props.handleCancel();
    }

    render() {

        return (
            <Modal title={this.state.title} visible={this.props.visible}
                   width={this.props.width}
                   maskClosable={false}
                   footer={null}
                   onCancel={this.handleCancel.bind(this)}>
                {
                    this.props.details.map((item, index) => (
                        <Row gutter={24} key={item.key} className="margin-top-5" >
                            <Col span={22}>
                                <span> {item.explainChinese}</span>
                            </Col>
                            <Col span={2}><span className="color-red">{item.score}分</span></Col>
                        </Row>
                    ))
                }
            </Modal>
        )
    }

}
