import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, Select, Button} from 'antd';
import ChannelTableComponent from './channel.table.component'
import ChannelEditModalComponent from './channel.modal.component'

export default class MailChannelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: {
                visible: false,
            },
        };
    }

    componentDidMount() {
        this.search();
    }

    search() {
        this.props.searchMailChannel();

    }

    onEditItem(data) {

        this.setState({
            confirm : {
                visible : true,
            }
        })
        this.props.onEditItem(data);
    }

    confirmCancel(){
        this.setState({
            confirm : {
                visible : false,
            }
        })
        this.props.clearEditItem();
    }

    editSave(data){
        this.setState({
            confirm : {
                visible : false,
            }
        })
        this.props.edit(data);
    }


    render() {

        const EditModalGen = () =>
            <ChannelEditModalComponent visible={this.state.confirm.visible}
                                       handleCancel={this.confirmCancel.bind(this)}
                                       currentItem = {this.props.currentItem}
                                       handleOk = {this.editSave.bind(this)}/>

        return (
            <div>
                <section className="content-header">
                    <h1>通道管理</h1>
                </section>

                <section className="content">
                    <Row className="data-preview">
                        <Col span={24}>
                            <div className="box box-info">
                                <div className="box-header with-border">
                                </div>
                                <div className="box-body">
                                    <ChannelTableComponent loading={this.props.tableLoading}
                                                           dataSource={ this.props.mailChannelData }
                                                           onEditItem={this.onEditItem.bind(this)}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
                <EditModalGen />
            </div>
        )
    }
}

MailChannelComponent.propTypes = {
    searchMailChannel: PropTypes.func,
    tableLoading: PropTypes.bool,
    mailChannelData: PropTypes.array,
    edit: PropTypes.func,
    onEditItem: PropTypes.func,
    clearEditItem:PropTypes.func
};


