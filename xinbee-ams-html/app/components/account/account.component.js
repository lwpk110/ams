import React, { Component, PropTypes } from 'react';

import { Row, Col, Icon, Select } from 'antd';

import { getAccountInfo } from './account.tool';

const Option = Select.Option;

export default class Account extends Component{
    constructor(props){
        super(props);

        const accountInfo = JSON.parse(localStorage.getItem('channels')),
              options = this.props.options || {
                  list : getAccountInfo(accountInfo),
                  defaultValue : getAccountInfo(accountInfo)[0].value
              };

        this.state = {
            options : options
        }
    }

    getInfo(){
        let accountArray = this.state.options.list,
            accountList = accountArray.map((item, i)=>(
                <Option key={item} value={item.value}>{item.name}</Option>
            ))

        return accountList;
    }

    selectHandle(value, option){
        this.props.onSelect(value);
    }

    render(){
        const accountList = this.getInfo();

        return(
            <Select size="large"
                onSelect={this.selectHandle.bind(this)}
                defaultValue={this.state.options.defaultValue}
                style={{width:'100%'}} >
                    {accountList}
            </Select>
        )
    }
}
