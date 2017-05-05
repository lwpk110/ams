import React, { Component, PropTypes } from 'react';

import { Layout, Icon } from 'antd';
const { Content, Sider } = Layout;
import { CHANNEL } from './utils/urlconfig.tool'
import { Post, Get } from './utils/request.tool';
import Head from './components/layout/header.component';
import Sidebar from './components/layout/sidebar.component';
import Foot from './components/layout/footer.component';
import logo from './logo.png'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    headToggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout className="main-content">
                <Sider className="sider-content"
                       trigger={null}
                       collapsible
                       collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src={logo}
                             alt="logo"
                             className={this.state.collapsed ? 'mini' : ''}/>
                    </div>
                    <Sidebar collapsed={this.state.collapsed}
                             location={this.props.location}/>
                </Sider>

                <Layout>
                    <Head collapsed={this.state.collapsed}
                          toggle={this.headToggle.bind(this)}
                          username={'admin'}
                          logout="\logout"/>
                    <Content className="content-wrapper">
                        {this.props.children}
                    </Content>
                    <Foot />
                </Layout>
            </Layout>
        )
    }
}
