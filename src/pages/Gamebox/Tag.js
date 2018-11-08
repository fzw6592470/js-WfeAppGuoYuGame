import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Game.less';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'success'];
const status = ['未启用', '启用'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, record } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const formLayout = 'inline';
  const formItemLayout = null;
  console.log(record);
  return (
    <Modal
      width="800px"
      destroyOnClose
      title="创建游戏"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
         <Form layout={formLayout}>
          <FormItem
            label="id"
            {...formItemLayout}
          >
            {form.getFieldDecorator('id', {
              initialValue: record.key!=undefined?record.key:"" 
            })(<Input readOnly="readOnly" placeholder="请勿输入，由后台生成" />)}
          </FormItem>
          <FormItem
            label="标签名称"
            {...formItemLayout}
          >
            {form.getFieldDecorator('name', {
              initialValue: record.name!=undefined?record.name:"",rules: [{ required: true, message: '请输入标签名称' }],
            })(<Input placeholder="请输入标签名称" />)}
          </FormItem>
          <FormItem
            label="排序"
            {...formItemLayout}
          >
            {form.getFieldDecorator('seq', {
              initialValue: record.seq!=undefined?record.seq:"",rules: [{ required: true, message: '请输入顺序' }],
            })(<Input placeholder="请输入第几个展示" />)}
          </FormItem>
          <FormItem
            label="一行展示数量"
            {...formItemLayout}
          >
            {form.getFieldDecorator('display_number', {
              initialValue: record.display_number!=undefined?record.display_number:"",rules: [{ required: true, message: '请输入一行展示数量' }],
            })(<Input placeholder="请输入一行展示数量" />)}
          </FormItem>
          <FormItem
            label="状态"
            {...formItemLayout}
          >
            {form.getFieldDecorator('display',{initialValue: record.display!=undefined?record.display:"1"})(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">启用</Option>
                  <Option value="0">不启用</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="游戏列表"
            {...formItemLayout}
          >
            {form.getFieldDecorator('game_ids', {
              initialValue: record.game_ids!=undefined?record.game_ids:"",rules: [{ required: true, message: '请输入游戏列表' }],
            })(<Input placeholder="请输入游戏列表,多个已逗号分隔" />)}
          </FormItem>
          <FormItem
            label="过期时间"
            {...formItemLayout}
          >
            {form.getFieldDecorator('vaild_time', {
              initialValue: record.vaild_time!=undefined?moment(record.vaild_time, "YYYY-MM-DD"):"",rules: [{ required: true, message: '请选择过期时间' }],
            })(<DatePicker  format="YYYY-MM-DD" placeholder="选择过期时间" />)}
          </FormItem>
        </Form> 
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */
export default
@connect(({ tag, loading }) => ({
  tag,
  loading: loading.models.tag,
}))
@Form.create()
class Tag extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: 'id',
      dataIndex: 'key',
      width: 45,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      width: 90,
    },
    {
      title: '游戏列表',
      dataIndex: 'game_ids',
      //sorter: true,
      //align: 'right',
      //render: val => `${val} 万`,
      // mark to display a total number
      //needTotal: true,
    },
    {
      title: '顺序',
      dataIndex: 'seq',
      sorter: true,
      width: 90,
      align: 'center',
    },
    {
      title: '一行展示数量',
      dataIndex: 'display_number',
      align: 'center',
      width: 135,
    },
    {
      title: '状态',
      dataIndex: 'display',
      align: 'center',
      width: 100,
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
      width: 120,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      sorter: true,
      width: 120,
      render: val => val?<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>:"-",
    },
    {
      title: '过期时间',
      dataIndex: 'valid_time',
      sorter: true,
      width: 120,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'tag/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'tag/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'tag/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case 'update':
        if(selectedRows.length > 1){
          message.info('请选择一条记录进行修改！');
        } else {
          this.handleUpdateModalVisible(true, selectedRows[0]);
        }
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'tag/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/add',
      payload: {
        name:fields.name,seq:fields.seq,display_number:fields.display_number,display:fields.display,vaild_time:fields.vaild_time,game_ids:fields.game_ids
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/update',
      payload: {
        key:fields.key,id:fields.id,name:fields.name,seq:fields.seq,display_number:fields.display_number,display:fields.display,vaild_time:fields.vaild_time,game_ids:fields.game_ids
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标签名称">
              {getFieldDecorator('name')(<Input placeholder="请输入标签名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('display',{initialValue: "-1"})(
                <Select  style={{ width: '100%' }}>
                  <Option value="-1">全部</Option>
                  <Option value="0">未启用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标签名称">
              {getFieldDecorator('name')(<Input placeholder="请输入标签名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('display',{initialValue: "-1"})(
                <Select style={{ width: '100%' }}>
                  <Option value="-1">全部</Option>
                  <Option value="0">未启用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建起始时间">
              {getFieldDecorator('start_time')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入起始时间" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="创建截止时间">
              {getFieldDecorator('end_time')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入截止时间" />
              )}
            </FormItem>
          </Col>
          <Col md={16} sm={48}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      tag: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="update">更新</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              bordered={true}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} record={stepFormValues} />
      </PageHeaderWrapper>
    );
  }
}
