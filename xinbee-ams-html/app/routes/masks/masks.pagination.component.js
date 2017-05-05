import React, { Component, PropTypes } from 'react';
import { Pagination } from 'antd';

export default class MasksPaginationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    changePage(page){
        this.props.changePage(page)
    }

    render() {
        return (
            <Pagination className="margin-t-12"
                total={this.props.total}
                showTotal={(total, range) => `${range[0]}-${range[1]} 条 / ${total} 条`}
                pageSize={10}
                defaultCurrent={1}
                current={this.props.current}
                onChange={this.changePage.bind(this)} />
        )
    }
}

