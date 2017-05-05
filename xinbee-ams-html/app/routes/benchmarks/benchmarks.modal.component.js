import React, {Component, PropTypes} from 'react';
import {Form, Input, InputNumber, Radio, Modal} from 'antd'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
}
class BenchmarksModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.currentItem,
            title: this.props.modalType === 'create' ? '添加规则' : '修改规则'
        };
    }

    handleCancel() {
        this.setState({
            item: {}
        })
        this.props.handleCancel();
    }

    handleOk() {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return
            }
            const data = {
                ...this.props.form.getFieldsValue(),
                type:this.props.modalType,
                id:(this.props.currentItem)? this.props.currentItem.id : ''
            }
            this.props.handleOk(data);
        })
    }

    render() {
        const {getFieldDecorator, validateFields, getFieldsValue} = this.props.form;
        return (
            <Modal title={this.state.title} visible={this.props.visible}
                   width={650}
                   maskClosable={false}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleCancel.bind(this)}
                   okText="确定" cancelText="取消">
                <Form horizontal>
                    <FormItem label='编码规则：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('code', {
                            initialValue: this.props.currentItem.code,
                            rules: [
                                {
                                    required: true,
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='中文信息：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('explainChinese', {
                            initialValue: this.props.currentItem.explainChinese,
                            rules: [
                                {
                                    required: true,
                                }
                            ]
                        })(<Input disabled={false}/>)}
                    </FormItem>
                    <FormItem label='英文信息：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('explainEnglish', {
                            initialValue: this.props.currentItem.explainEnglish,
                            rules: [
                                {
                                    required: true,
                                }
                            ]
                        })(<Input disabled={false}/>)}
                    </FormItem>
                    <FormItem label='分值：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('score', {
                            initialValue: this.props.currentItem.score,
                            rules: [
                                {
                                    required: true,
                                    type: 'number',
                                    message: '请填写分值'
                                }
                            ]
                        })(<InputNumber min={0} max={10000000}/>)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create()(BenchmarksModalComponent)
