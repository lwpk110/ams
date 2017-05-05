// example :
// <ChartsPie headTitle={String}
//     loading={Boolen}
//     dataSource={Array<Array>}/>

import React, { Component, PropTypes  } from 'react';

import { Row, Col, Icon, Spin } from 'antd';

const ReactHighcharts = require('react-highcharts'),
      cx = require('classnames');

export default class ChartsPie extends Component{
    constructor(props){
        super(props);

        this.state = {
            config : {}
        }
    }

    render(){
        let len = this.props.dataSource.length,
            titleStyle = cx({
                'hide' : ((!len) ? false : true),
                'show' : ((!len) ? true : false)
            }),
            chartStyle = cx({
                'hide' : ((!len) ? true : false),
                'show' : ((!len) ? false : true)
            }),
            defaultConfig = {title:'', seriesName:'占比', height:360, minWidth:707},
            chartsConfig = ( !this.props.chartsConfig )
                ? defaultConfig
                : Object.assign(defaultConfig, this.props.chartsConfig),
            config = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    style : {
                        height : chartsConfig.height,
                        minWidth: chartsConfig.minWidth
                    }
                },
                title: {
                    text: chartsConfig.title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                exporting: {
                    enabled:false
                },
                credits: {
                    enabled:false
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    itemMarginTop: 5,
                    itemMarginBottom: 5
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y:.1f} ({point.percentage:.1f}%)'
                        },
                        showInLegend: false
                    }
                },
                series: [{
                    type: 'pie',
                    name: chartsConfig.seriesName,
                    data: this.props.dataSource
                }]
            };

        return(
            <div className="box box-solid">
                <div className="box-header with-border">
                    <h3 className="box-title">{this.props.headTitle}</h3>
                </div>
                <div className="box-body chart-area" style={{position:"relative"}}>
                    <h5 className={titleStyle}>暂无数据...</h5>
                    <Spin className="loading"
                        tip="Loading..."
                        size="large"
                        spinning={this.props.loading}></Spin>
                    <div className={chartStyle}>
                        <ReactHighcharts config={config}></ReactHighcharts>
                    </div>
                </div>
            </div>
        )
    }
}
