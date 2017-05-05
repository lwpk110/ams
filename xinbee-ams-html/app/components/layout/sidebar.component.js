import React, { Component, PropTypes } from 'react';
import {IndexLink, Link} from 'dva/router';

import { Menu, Icon } from 'antd';

import { menu } from '../../utils/menu.tool';

export default class Sidebar extends Component{
    constructor(props){
        super(props);

        this.state = {
            current :　this.getCurrent().keyArry,
            defaultOpen : this.getCurrent().openArry,
            navOpenKeys : this.getCurrent().openArry
        }
    }

    componentWillReceiveProps(nextProps){
        let before = this.props.collapsed,
            after = nextProps.collapsed;

        if( (!after) && (before)){ // 当collapsed由true变为false时
            this.setState({
                defaultOpen: this.state.navOpenKeys
            });
        }else if((after) && (!before)){
            this.setState({
                defaultOpen: []
            });
        }
    }

    getCurrent(){
        let pathname = this.props.location,
            keyArray = pathname.split('/'),
            index = keyArray.length - 1,
            perrent = {
                keyArry : [keyArray[index] || ''],
                openArry : keyArray
            };

        return perrent;
    }

    handleClick(e){
        let perrent = [];
        perrent.push(e.key);
        this.setState({
            current: perrent
        });
    }

    handleOpen(openKeys){
        let after = openKeys,
            latestOpenKey = after.find(key => !(this.state.defaultOpen.indexOf(key) > -1)),
            latestCloseKey = this.state.defaultOpen.find(key => !(after.indexOf(key) > -1)),
            nextOpenKeys = [];

        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }

        this.setState({
            defaultOpen: nextOpenKeys
        });
    }

    getAncestorKeys(key){
        const map = {};
        return map[key] || [];
    }

    handleSelect(data){ // 选择路由时记录打开的面板key
        this.setState({
            navOpenKeys: this.state.defaultOpen
        });
    }

    render(){
        const siderFold = this.props.collapsed,
            topMenus = menu.map(item => item.key),
            getMenus = function(menuArray, parentPath){
                parentPath = parentPath || '/';
                return menuArray.map( (item, i) => {
                    if(item.child){
                        return(
                            <Menu.SubMenu key={item.key}
                                          title={<span title={item.name}>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
                                {getMenus(item.child, parentPath + item.key + '/')}
                            </Menu.SubMenu>
                        )
                    }else{
                        return (
                            <Menu.Item key={item.key}
                                       title={item.name}>
                                <Link to={parentPath + item.key}>
                                    {item.icon ? <Icon type={item.icon} /> : ''}
                                    {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
                                </Link>
                            </Menu.Item>
                        );
                    }
                })
            },
            menuConfig = getMenus(menu);

        return(
            <Menu theme="dark"
                  mode={siderFold ? 'vertical' : 'inline' }
                  openKeys={this.state.defaultOpen}
                  selectedKeys={this.state.current}
                  onClick={this.handleClick.bind(this)}
                  onOpenChange={this.handleOpen.bind(this)}
                  onSelect={this.handleSelect.bind(this)}>
                {menuConfig}
            </Menu>
        )
    }
}
