// example : 
// <ChartsArea headTitle={''}
//     xAxis={Array<any>}
//     loading={Boolen}
//     dataSource={[{name: String, data: Array<number>}]}/>

import React, { Component, PropTypes  } from 'react';

import { Row, Col, Icon, Spin } from 'antd';

const ReactHighcharts = require('react-highcharts'),
      cx = require('classnames');

export default class ChartsArea extends Component{
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
            defaultConfig = {title:'', titleY:'', height:360, minWidth:707},
            chartsConfig = ( !this.props.chartsConfig )  
                ?  defaultConfig
                : Object.assign(defaultConfig, this.props.chartsConfig),
            config = {
                chart: {
                    type: 'areaspline',
                    style : {
                        height : chartsConfig.height,
                        minWidth: chartsConfig.minWidth
                    }
                    
                },
                title: {
                    text: chartsConfig.title
                },
                tooltip: {
                    formatter: function () {
                         return '<b>' + this.x + '</b><br/>' 
                            + this.series.name + ': ' + this.y
                     }
                },
                exporting: {
                    enabled:false
                },
                credits: {
                    enabled:false
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal',
                    itemMarginTop: 5,
                    itemMarginBottom: 5
                },
                plotOptions: {
                    pointStart: 0,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        },
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                xAxis: {
                    crosshair: true,
                    categories: this.props.xAxis
                },
                yAxis: {
                    crosshair: true,
                    allowDecimals: true,
                    title: {
                       text: chartsConfig.titleY
                    }
                },
                series: this.props.dataSource
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