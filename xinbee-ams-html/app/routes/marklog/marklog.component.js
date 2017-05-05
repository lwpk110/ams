import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, Select, Button, Input, Pagination, DatePicker} from 'antd';
import MarkLogtableComponent from './marklog.table.component';
import MarkLogModalComponent from './marklog.modal.component';
import TemplateModalComponent from './template.modal.component'
const Option = Select.Option;
const {RangePicker} = DatePicker;


export default class BenchMarksComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            title: '',
            taskId: '',
            status: 'all',
            currentPage: 1,
            visible: false,
            itemId: '',
            template:{},
            templateVisible:false

        };
    }

    componentDidMount() {
        this.query();
    }

    selectHandle(value) {
        this.setState({
            status: value
        })
    }

    query() {
        let status = '',param={};
        if (this.state.status == 'all') {
            param ={

                title: '',
                taskId: '',
                page:this.state.currentPage
            }
        }else{
            param = {
                startDate: this.state.startDate+'T',
                endDate: this.state.startDate+'T',
                title: this.state.title,
                taskId: this.state.taskId,
                status: status,
                page:this.state.currentPage
            };
        }
        this.props.query(param)
    }

    changePage(page) {
        this.setState({
            currentPage: page
        }, () => {
            this.search();
        })
    }

    formateDate(date){
        let dateTime = '';
        if(date){
            dateTime=date+'T00:00:00Z';
        }
        return dateTime
    }

    search() {
        let status = '';
        if (this.state.status != 'all') {
            status = this.state.status
        }
        let param = {
            startDate: this.formateDate(this.state.startDate),
            endDate:  this.formateDate(this.state.endDate),
            title: this.state.title,
            taskId: this.state.taskId,
            status: status,
            page: this.state.currentPage

        };
        this.props.query(param);
    }

    datePickChange(date, dateString) {

        this.setState({
            startDate: dateString[0],
            endDate: dateString[1]

        })
    }

    onDetails(id) {
        this.setState({
            visible: true,
            itemId: id
        }, () => {
            let itemId = this.state.itemId
            this.props.searchDetails(itemId);
        })
    }

    confirmCancel() {
        this.setState({
            visible: false,
            templateVisible:false,
            itemId: '',

        })
    }

    onChange (e) {
        this.setState({[e.target.id]: e.target.value},()=>{

        });
    }

    openTemplate(template){
        this.setState({
            template: template,
            templateVisible:true
        }
        // , () => {
        //     this.search();
        // }
        )
    }


    render() {
        const MarkDetailsGen = () =>{
            return (
                <MarkLogModalComponent visible={this.state.visible}
                                       handleCancel={this.confirmCancel.bind(this)}
                                       details={this.props.logDetails}
                                       width={650}

                />
            )
        }

        const TemplateModalGen = () =>{
            return(
                <TemplateModalComponent
                    visible={this.state.templateVisible}
                    handleCancel={this.confirmCancel.bind(this)}
                    mailTemplate={this.state.template}
                    width={900}
                />
            )
        }

        return (
            <div>
                <section className="content-header">
                    <h1>评分日志</h1>
                </section>

                <section className="content">
                    <Row className="data-preview">
                        <Col span={24}>
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <Row gutter={24}>
                                        <Col span={4}>
                                            <RangePicker onChange={this.datePickChange.bind(this)} allowClear={true}/>
                                        </Col>
                                        <Col span={4}>
                                            <Input addonBefore="邮件标题" id="title" value={this.state.title}
                                                   onChange={this.onChange.bind(this)}/>
                                        </Col>
                                        <Col span={4}>
                                            <Input addonBefore="任务ID" id="taskId" value={this.state.taskId}
                                                  onChange={this.onChange.bind(this)}/>
                                        </Col>
                                        <Col span={2}>
                                            <Select defaultValue="all" style={{width: 120}}
                                                    onSelect={this.selectHandle.bind(this)}>
                                                <Option value="all">所有状态</Option>
                                                <Option value="true">成功</Option>
                                                <Option value="false">失败</Option>
                                            </Select>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" onClick={() => this.search()}>查询</Button>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-body">
                                    <MarkLogtableComponent loading={this.props.tableLoading}
                                                           dataSource={ this.props.markLogData }
                                                           current={this.state.currentPage}
                                                           total={this.props.totalElements}
                                                           changePage={this.changePage.bind(this)}
                                                           onDetails={this.onDetails.bind(this)}
                                                           openTemplate = {this.openTemplate.bind(this)}
                                    />
                                </div>
                                <div className="box-footer no-border">
                                    <Pagination className="margin-t-12"
                                                total={this.props.totalElements}
                                                showTotal={(total, range) => `${range[0]}-${range[1]} 条 / ${total} 条`}
                                                pageSize={10}
                                                defaultCurrent={1}
                                                current={this.state.currentPage}
                                                onChange={this.changePage.bind(this)}/>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </section>
                <MarkDetailsGen />
                <TemplateModalGen />
            </div>
        )
    }

}

BenchMarksComponent.PropTypes = {
    query: PropTypes.func,
    searchDetails: PropTypes.func,
    tableLoading: PropTypes.bool,
    markLogData: PropTypes.array,
    totalElements: PropTypes.number,
    logDetails: PropTypes.array,
    mailTemplate: PropTypes.object
}
