import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Select} from 'antd';
import { getMonthRange } from '../../components/datepicker/datepicker.tool';
import { getAccountInfo } from '../../components/account/account.tool';

import DatepickerMonth from '../../components/datepicker/datepicker.month.compontent';
import Account from '../../components/account/account.component';
import ChartsColumn from '../../components/charts/charts.column.component';
import LineCharts from '../../components/charts/charts.line.component';
import DataPreview from './report.data-preview.component';
import ChartsPie from '../../components/charts/charts.pie.component'

export default class ReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: getMonthRange(new Date()).start,
            end: getMonthRange(new Date()).end,
            channelCode: getAccountInfo(JSON.parse(localStorage.getItem('channels')))[0].value,
        };
    }

    componentDidMount() {
        this.search();

    }

    changeDate(range) {
        this.setState({
            start: range.start,
            end: range.end
        }, ()=> {
            this.search();
        })
    }

    changeAccount(channelCode) {
        this.setState({
            channelCode: channelCode
        }, ()=> {
            this.search();
        })
    }

    search() {
        this.setState({
            currentPage: 1
        }, ()=> {
            let data = {
                start: this.state.start,
                end: this.state.end,
                channelCode: this.state.channelCode,
            };

            this.sendVolumeSearch(data);
            this.channelQuality(data);
            this.previewSearch(data);
            this.sendQualitySearch(data);
            this.mailQualitySearch(data);
        })
    }

    channelQuality(data){
        this.props.channelQuality(data)
    }

    previewSearch(data) { // 预览面板查询
        this.props.previewSearch(data);
    }

    sendVolumeSearch(data) {
        this.props.sendVolumeSearch(data);
    }

    sendQualitySearch(data) { // 国家查询
        this.props.sendQualitySearch(data);
    }

    mailQualitySearch(data){
        this.props.mailQualitySearch(data);
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1>通道发送报告</h1>
                </section>

                <section className="content">
                    <Row className="data-preview">
                        <Col span={24}>
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <Row>
                                        <Col span={6}>
                                            <DatepickerMonth
                                                changeDate={this.changeDate.bind(this)}/>
                                        </Col>
                                        <Col offset={12} span={6}>
                                            <Account onSelect={this.changeAccount.bind(this)}/>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-body">
                                    <DataPreview dataSource={this.props.previewData}/>
                                </div>
                                <div className="box-footer"></div>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={16}>
                            <ChartsColumn headTitle={'日发送量'}
                                          loading={this.props.chartLoading}
                                          dataSource={this.props.sendVolumeData}/>
                        </Col>
                        <Col span={8}>
                            <ChartsPie headTitle={'发送送量'}
                                       loading={this.props.chartLoading}
                                       dataSource={this.props.channelQualityData}/>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <LineCharts headTitle={'发送质量'}
                                loading={this.props.chartLoading}
                                lineChartX={this.props.sendQualityX}
                                dataSource={this.props.sendQualityData}/>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <LineCharts headTitle={'邮件质量'}
                                loading={this.props.chartLoading}
                                lineChartX={this.props.mailQualityX}
                                dataSource={this.props.mailQualityData}/>
                        </Col>
                    </Row>

                </section>
            </div>
        )
    }
}

ReportComponent.propTypes = {
    previewData: PropTypes.object,
    chartLoading: PropTypes.bool,
    sendQualityX: PropTypes.array,
    mailQualityX : PropTypes.array,
    sendQualityData: PropTypes.array,
    mailQualityData : PropTypes.array,
    sendVolumeData: PropTypes.array,
    previewSearch: PropTypes.func,
    sendVolumeSearch: PropTypes.func,
    sendQualitySearch: PropTypes.func,
    mailQualitySearch : PropTypes.func,
    checkedId: PropTypes.func,
    channelQuality:PropTypes.func,
    channelQualityData:PropTypes.object
};
