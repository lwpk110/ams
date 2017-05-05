import React, { Component, PropTypes } from 'react';

import { DatePicker  } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { monthInit, getMonthRange } from './datepicker.tool';

const { MonthPicker } = DatePicker;

export default class DatepickerMonth extends Component{
    constructor(props){
        super(props);

        const options = this.props.options || {
                size : 'large',
                defaultValue : monthInit().defaultValue,
                startDate : monthInit().startDate,
                endDate : monthInit().endDate
            }

        this.state = {
            options : options,
            value : moment(options.defaultValue,' YYYY-MM')
        }
    }

    disabledDate(current){ // 不可选择日期范围
        let start = moment(this.state.options.startDate,' YYYY-MM').valueOf(),
            end =  moment(this.state.options.endDate,' YYYY-MM').valueOf();

        return (current > end) || (current < start);
    }

    changeDate(value){
        let valueUTC = new Date(value.valueOf()),
            monthRange = getMonthRange(valueUTC);
        this.setState({
            value : value,
        });

        this.props.changeDate(monthRange);
    }

    render(){
        return(
            <div>
                <MonthPicker size={this.state.options.size}
                    style={{width:'100%'}}
                    allowClear={false}
                    format={'YYYY-MM'}
                    defaultValue={moment(this.state.options.defaultValue,' YYYY-MM')}
                    disabledDate={this.disabledDate.bind(this)}
                    value = {this.state.value}
                    onChange={this.changeDate.bind(this)} />
            </div>
        )
    }
}
