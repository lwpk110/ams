import React, {Component, PropTypes} from 'react';
import {Row, Col, Modal} from 'antd'

export default class TemplateModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: this.props.mailTemplate.body,
            title: this.props.mailTemplate.subject
        };
    }

    handleCancel() {
        this.setState({
            body: {}
        })
        this.props.handleCancel();
    }

    render() {
        let html = {
            _html: this.props.mailTemplate.body
        }
        return (
            <div className="modal_size">
            <Modal title={this.state.title} visible={this.props.visible}
                   width={this.props.width}
                   maskClosable={false}
                   footer={null}
                   onCancel={this.handleCancel.bind(this)}>
                <div className="mail-template" dangerouslySetInnerHTML={{__html: this.props.mailTemplate.body}} >
                </div>
            </Modal>
            </div>
        )
    }

}
