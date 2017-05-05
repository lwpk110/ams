import React, { Component, PropTypes } from 'react';

import { Layout } from 'antd';
const { Footer } = Layout;

export default class Foot extends Component{
    
    constructor(props){ 
        super(props);
    }

    render(){
        return(
            <Footer className="main-footer">
                <strong>Copyright &copy; 2016 <a href="#">上海腾道信息科技有限公司</a>.</strong> All rights reserved.
            </Footer>
        )
    }
}