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
class ChannelEditModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.currentItem
        };
    }

    handleCancel() {
        this.setState({
            item : {}
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
                id: this.props.currentItem.id,
                channelCode:this.props.currentItem.channelCode,
                version:this.props.currentItem.version,
            }
            this.props.handleOk(data);

        })
    }

    render() {
        const { getFieldDecorator, validateFields, getFieldsValue } = this.props.form;
        return (
            <Modal title='通道编辑' visible={this.props.visible}
                   width={650}
                   maskClosable={false}
                   onOk={this.handleOk.bind(this)}
                   onCancel={this.handleCancel.bind(this)}
                   okText="确定" cancelText="取消">
                <Form horizontal  >
                    <FormItem label='通道名称：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue: this.props.currentItem.name,
                            rules: [
                                {
                                    required: true,
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem label='通道编码：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('channelCode', {
                            initialValue: this.props.currentItem.channelCode,
                            rules: [
                                {
                                    required: false,
                                }
                            ]
                        })(<Input disabled={true}/>)}
                    </FormItem>
                    <FormItem label='描述：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('description', {
                            initialValue: this.props.currentItem.description,
                            rules: [
                                {
                                    required: false,
                                }
                            ]
                        })(<Input disabled={false}/>)}
                    </FormItem>
                    <FormItem label='是否禁用' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('disabled', {
                            initialValue: this.props.currentItem.disabled,
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                    message: '请选择是否禁用'
                                }
                            ]
                        })(
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label='最大数量：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('maxNumLimit', {
                            initialValue: this.props.currentItem.maxNumLimit,
                            rules: [
                                {
                                    required: true,
                                    type: 'number',
                                    message: '请填写最大数量'
                                }
                            ]
                        })(<InputNumber min={0} max={100000}/>)}
                    </FormItem>
                    <FormItem label='费用：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('fee', {
                            initialValue: this.props.currentItem.fee,
                            rules: [
                                {
                                    required: false,
                                }
                            ]
                        })(<Input disabled={false}/>)}
                    </FormItem>
                    <FormItem label='排序：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('sequence', {
                            initialValue: this.props.currentItem.sequence,
                            rules: [
                                {
                                    required: true,
                                    type: 'number',
                                    message: '不能为空'
                                }
                            ]
                        })(<InputNumber />)}
                    </FormItem>
                    <FormItem label='是否退订：' hasFeedback {...formItemLayout}>
                        {getFieldDecorator('unsubscribeLink', {
                            initialValue: this.props.currentItem.unsubscribeLink,
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                    message: '请选择是否退订'
                                }
                            ]
                        })(
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>

            </Modal>
        )
    }

}

export default Form.create()(ChannelEditModalComponent)
