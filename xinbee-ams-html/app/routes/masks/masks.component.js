import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Select, Button } from 'antd';

import ModalConfirmComponent from '../../components/modal/modal.confirm.component'
import MasksTableComponent from './masks.table.component';
import MasksPaginationComponent from './masks.pagination.component';

const Option = Select.Option;

export default class MasksComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateList : [{
                value : '1', name : '发送中'
            },
            {
                value : '3', name : '系统取消'
            },{
                value : '100', name : '发送成功'
            },{
                value : '5', name : '已处理'
            }],
            confirm : {
                visible : false,
                confirmText : '',
                type: ''
            },
            resendDisable: true,
            cancelDisable : true,
            selectedRowKeys : [],
            selectState : '3',
            currentPage : 1
        };
    }

    componentDidMount() {
        this.search();
    }

    // 选择查询状态
    selectHandle(value, option){
        this.setState({
            selectState: value,
            currentPage : 1,
            selectedRowKeys : []
        },()=>{
            this.changeButtonState();
            this.search();
        })
    }

    reSend(){
        this.setState({
            confirm : {
                visible : true,
                text : '确定重新发送吗？',
                type : 'reSend'
            }
        })
    }

    cancelSend(){
        this.setState({
            confirm : {
                visible : true,
                text : '确定取消发送吗？',
                type : 'cancelSend'
            }
        })
    }

    handleSend(type){
        let handleType = type;

        this.setState({
            currentPage : 1
        }, ()=>{
            let data = {
                    status : Number(this.state.selectState),
                    page : this.state.currentPage-1,
                    ids : this.state.selectedRowKeys,
                    handleType :　handleType
                };

            this.setState({
                selectedRowKeys : []
            },()=>{
                this.changeButtonState();
                this.props.handleSend(data);
            })

            
        })
    }

    confirmOk(){
        let type = this.state.confirm.type;

        this.confirmCancel(this.handleSend(type));
    }

    confirmCancel(fn){
        this.setState({
            confirm : {
                visible : false,
                text : '',
                type : ''
            }
        }, ()=>{
            if(fn !== undefined){
                fn();
            }
        })
    }

    // 按钮状态列表
    buttonStates(){
        let buttonState = {};

        buttonState.none = {
            resendDisable : true,
            cancelDisable : true
        };
        buttonState.onlyReSend = {
            resendDisable : false,
            cancelDisable : true
        };
        buttonState.onlyCancel = {
            resendDisable : true,
            cancelDisable : false
        };
        buttonState.both = {
            resendDisable : false,
            cancelDisable : false
        };

        return buttonState;
    }

    // 改变按钮状态
    changeButtonState(){
        let selectedRowKeys = this.state.selectedRowKeys,
            selectState = this.state.selectState,
            keyLen = selectedRowKeys.length;

        if(!keyLen){
            this.setState(this.buttonStates().none);
        }else{
            switch(selectState){
                case '100': case '5':
                    this.setState(this.buttonStates().none);
                    break;

                case'3':
                    this.setState(this.buttonStates().onlyReSend);
                    break;

                case '1': 
                    this.setState(this.buttonStates().onlyCancel);
                    break;
                
                default :
                    break;
            }
        }
    }

    // 选择任务
    selectMask(selectedRowKeys){
        this.setState({
            selectedRowKeys :selectedRowKeys
        },()=>{
            this.changeButtonState();
        })
    }

    changePage(page){
        this.setState({
            currentPage : page
        }, ()=>{
            this.search();
        })
    }

    search(){
        let data = {
            status : Number(this.state.selectState),
            page : this.state.currentPage-1
        }
        
        this.setState({
            selectedRowKeys : []
        }, ()=>{
            this.changeButtonState();
            this.props.searchMasks(data);
        })
    }

    render() {
        let stateConfig = this.state.stateList.map((item, i)=>(
                <Option key={item} value={item.value}>{item.name}</Option>
            ));

        return (
            <div>
                <section className="content-header">
                    <h1>任务管理</h1>
                </section>

                <section className="content">
                    <Row className="data-preview">
                        <Col span={24}>
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <Row>
                                        <Col span={6}>
                                            <Button disabled={this.state.resendDisable} 
                                                className="margin-r-10"
                                                type="primary"
                                                icon="reload"
                                                onClick={this.reSend.bind(this)}>重发</Button>
                                            <Button disabled={this.state.cancelDisable} 
                                                icon="close"
                                                onClick={this.cancelSend.bind(this)}>取消发送</Button>
                                            <ModalConfirmComponent visible={this.state.confirm.visible}
                                                text={this.state.confirm.text}
                                                handleOk = {this.confirmOk.bind(this)}
                                                handleCancel={this.confirmCancel.bind(this)}/>
                                        </Col>
                                        <Col offset={12} span={6}>
                                            <Select style={{width:'100%'}} 
                                                defaultValue={this.state.selectState}
                                                onSelect={this.selectHandle.bind(this)}>
                                                { stateConfig }
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-body">
                                    <MasksTableComponent selectedRowKeys={this.state.selectedRowKeys}
                                        loading={this.props.tableLoading}
                                        dataSource={ this.props.maskData }
                                        handleSelect={this.selectMask.bind(this)}/>
                                </div>
                                <div className="box-footer no-border">
                                    <MasksPaginationComponent
                                        total={this.props.totalElements}
                                        current = {this.state.currentPage}
                                        changePage = {this.changePage.bind(this)} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </div>
        )
    }
}

MasksComponent.propTypes = {
    handleSend : PropTypes.func,
    searchMasks : PropTypes.func,
    tableLoading : PropTypes.bool,
    maskData : PropTypes.array,
    totalElements : PropTypes.number,
};

