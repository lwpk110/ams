import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'antd';

export default class ModalConfirmComponent extends Component {

    constructor(props) {
        super(props);
    }

    handleCancel(){
        this.props.handleCancel();
    }

    handleOk(){
        this.props.handleOk();
    }

    render() {
        return(
            <Modal title={this.props.title || '提示'} visible={this.props.visible}
                onOk={this.handleOk.bind(this)} 
                onCancel={this.handleCancel.bind(this)}
                okText="确定" cancelText="取消">
                { this.props.text }
            </Modal>
        )
    }
}