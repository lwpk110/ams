import React, {Component, PropTypes} from 'react';
import {Row, Col, Icon, Select, Button, Input, Pagination} from 'antd';
import BenchMarksTableComponent from './benchmarks.table.component';
import BenchmarksModalComponent from './benchmarks.modal.component';
const Search = Input.Search
const Option = Select.Option;


export default class BenchMarksComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            sortType: 'all',
            currentPage: 1,
            visible: false,
            modalType: 'create',
            currentItem: {}

        };
    }

    componentDidMount() {
        this.query();
    }

    selectHandle(value) {
        this.setState({
            sortType: value
            }, () => {
                let param = {
                    key: this.state.key,
                    sortType: this.state.sortType,
                    page: this.state.currentPage

                };
                this.props.query(this.queryParam(param))
            }
        )
    }

    query() {
        let param = {
            // desc: this.state.desc,
            page: this.state.currentPage

        };
        this.props.query(param)
    }

    changePage(page) {
        this.setState({
            currentPage: page
        }, () => {
            let param = {
                key: this.state.key,
                sortType: this.state.sortType,
                page: this.state.currentPage

            };
            this.props.query(this.queryParam(param));
        })
    }

    queryParam(param){
        if(param.sortType === 'all'){
            delete param.sortType;
            return param;
        }
        return param;

    }

    search(data) {
        this.setState({
            key: data
        })
        let param = {
            key: data,
            sortType: this.state.sortType,
            page: this.state.currentPage

        };
        this.props.query(this.queryParam(param));
    }

    onAdd() {
        this.setState({
            visible: true,
            modalType: 'create',
            currentItem: {},
            currentPage: 1,
            sortType: 'all',
        })
    }

    onEditItem(data) {
        this.setState({
            visible: true,
            modalType: 'update',
            currentItem: data
        })
    }

    onDeleteItem(id){
        let data = {
            itemId:id,
            param: this.queryParam({
                key: '',
                sortType: this.state.sortType,
                page: this.state.currentPage
            })
        };
        this.props.deleteItem(data);
    }

    confirmCancel() {
        this.setState({
            visible: false,
            currentItem: {},
            modalType: 'create',

        })
    }

    save(obj) {
        this.setState({
            visible: false,
            currentItem: {},

        }, () => {
            let data = {
                object:obj,
                param: this.queryParam({
                    key: '',
                    sortType: this.state.sortType,
                    page: this.state.currentPage
                })
            };
            if (this.state.modalType === 'create') {
                this.props.create(data)
            } else {
                this.props.update(data)
            }
        })

    }

    render() {

        const BenchMarksModalGen = () =>
            <BenchmarksModalComponent visible={this.state.visible}
                                      handleCancel={this.confirmCancel.bind(this)}
                                      currentItem={this.state.currentItem}
                                      handleOk={this.save.bind(this)}
                                      modalType={this.state.modalType}/>

        return (
            <div>
                <section className="content-header">
                    <h1>评分规则</h1>
                </section>

                <section className="content">
                    <Row className="data-preview">
                        <Col span={24}>
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <Row gutter={24}>
                                        <Col span={16}>
                                            <Button type="primary" onClick={() => this.onAdd()}>添加规则</Button>
                                        </Col>
                                        <Col span={6}>
                                            <Search
                                                placeholder="请输入关键词"
                                                style={{width: 400}}
                                                onSearch={value => this.search(value)}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <Select defaultValue={this.state.sortType} style={{width: 120}}
                                                    onSelect={this.selectHandle.bind(this)}>
                                                <Option value="all">按默认排序</Option>
                                                <Option value="SCOREDESC">分值降序</Option>
                                                <Option value="SCOREASC">分值升序</Option>
                                                <Option value="USECOUNTDESC">次数降序</Option>
                                                <Option value="USECOUNTASC">次数升序</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-body">
                                    <BenchMarksTableComponent loading={this.props.tableLoading}
                                                              dataSource={ this.props.benchMarksData }
                                                              onEditItem={this.onEditItem.bind(this)}
                                                              current={this.state.currentPage}
                                                              total={this.props.totalElements}
                                                              changePage={this.changePage.bind(this)}
                                                              onDeleteItem = {this.onDeleteItem.bind(this)}/>
                                </div>
                                <div className="box-footer no-border">
                                    <Pagination className="margin-t-12"
                                                total={this.props.totalElements}
                                                showTotal={(total, range) => `${range[0]}-${range[1]} 条 / ${total} 条`}
                                                pageSize={10}
                                                defaultCurrent={1}
                                                current={this.state.currentPage}
                                                onChange={this.changePage.bind(this)}/>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </section>
                <BenchMarksModalGen />
            </div>
        )
    }

}

BenchMarksComponent.PropTypes = {
    query: PropTypes.func,
    create: PropTypes.func,
    deleteItem:PropTypes.func,
    update: PropTypes.func,
    tableLoading: PropTypes.bool,
    benchMarksData: PropTypes.array,
    totalElements: PropTypes.number,
}
