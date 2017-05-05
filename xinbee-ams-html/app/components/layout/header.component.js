import React, { Component, PropTypes } from 'react';

import { Layout, Icon, Menu, Row, Col } from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Head extends Component{
    
    constructor(props){ 
        super(props);
    }

    toggle(){
        this.props.toggle();
    }

    render(){
        return(
            <Header className="main-header">
                <Row>
                    <Col span={22}>
                        <Icon className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle.bind(this)} />
                    </Col>

                    <Col span={2}>
                        <Menu className="header-menu"
                            mode="horizontal">
                            <SubMenu title={<span><Icon type="user"/>{this.props.username}</span>}>
                                <Menu.Item key="logout">
                                    <a href={this.props.logout}>注 销</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}