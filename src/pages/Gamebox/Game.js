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
const statusMap = ['default', 'success', 'error'];
const status = ['未启用', '启用', '失效'];

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
              initialValue: record.key!=undefined?record.key:"",rules: [{ required: true, message: '请输入id' }],
            })(<Input placeholder="请输入id" />)}
          </FormItem>
          <FormItem
            label="名称"
            {...formItemLayout}
          >
            {form.getFieldDecorator('name', {
              initialValue: record.name!=undefined?record.name:"",rules: [{ required: true, message: '请输入游戏名称' }],
            })(<Input placeholder="请输入游戏名称" />)}
          </FormItem>
          <FormItem
            label="短名称"
            {...formItemLayout}
          >
            {form.getFieldDecorator('short_name', {
              initialValue: record.short_name!=undefined?record.short_name:"",rules: [{ required: true, message: '请输入短名称' }],
            })(<Input placeholder="请输入短名称" />)}
          </FormItem>
          <FormItem
            label="appid"
            {...formItemLayout}
          >
            {form.getFieldDecorator('appid', {
              initialValue: record.appid!=undefined?record.appid:"",rules: [{ required: true, message: '请输入appid' }],
            })(<Input placeholder="请输入appid" />)}
          </FormItem>
          <FormItem
            label="描述"
            {...formItemLayout}
          >
            {form.getFieldDecorator('description', {
              initialValue: record.description!=undefined?record.description:"",rules: [{ required: true, message: '请输入描述' }],
            })(<Input placeholder="请输入描述" />)}
          </FormItem>
          <FormItem
            label="小图标"
            {...formItemLayout}
          >
            {form.getFieldDecorator('icon', {
              initialValue: record.icon!=undefined?record.icon:"",rules: [{ required: true, message: '请输入小图标' }],
            })(<Input placeholder="请输入小图标" />)}
          </FormItem>
          <FormItem
            label="大图标"
            {...formItemLayout}
          >
            {form.getFieldDecorator('image', {
              initialValue: record.image!=undefined?record.image:"",rules: [{ required: true, message: '请输入大图标' }],
            })(<Input placeholder="请输入大图标" />)}
          </FormItem>
          <FormItem
            label="是否推荐"
            {...formItemLayout}
          >
            {form.getFieldDecorator('recommend',{initialValue: record.recommend!=undefined?record.recommend:"1"})(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="是否本地"
            {...formItemLayout}
          >
            {form.getFieldDecorator('local',{initialValue: record.local!=undefined?record.local:"1"})(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="是否新上架"
            {...formItemLayout}
          >
            {form.getFieldDecorator('new_shelves',{initialValue: record.new_shelves!=undefined?record.new_shelves:"1" })(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="勋章"
            {...formItemLayout}
          >
            {form.getFieldDecorator('medal_ids',{ initialValue: record.medal_ids!=undefined?record.medal_ids:"1" })(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="勋章规则"
            {...formItemLayout}
          >
            {form.getFieldDecorator('medal_rules',{initialValue: record.medal_rules!=undefined?record.medal_rules:"1"})(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="分享描述"
            {...formItemLayout}
          >
            {form.getFieldDecorator('share_des', {
              initialValue: record.share_des!=undefined?JSON.parse(record.share_des).join(","):"",rules: [{ required: true, message: '请输入分享描述' }],
            })(<Input placeholder="请输入分享描述,多个已逗号分隔" />)}
          </FormItem>
          <FormItem
            label="分享图片"
            {...formItemLayout}
          >
            {form.getFieldDecorator('share_img', {
              initialValue: record.share_img!=undefined?JSON.parse(record.share_img).join(","):"",rules: [{ required: true, message: '请输入分享图片' }],
            })(<Input placeholder="请输入分享图片,多个已逗号分隔" />)}
          </FormItem>
          <FormItem
            label="二维码"
            {...formItemLayout}
          >
            {form.getFieldDecorator('qrcode', {
              initialValue: record.qrcode!=undefined?record.qrcode:"",rules: [{ required: true, message: '请输入二维码' }],
            })(<Input placeholder="请输入二维码" />)}
          </FormItem>
          <FormItem
            label="类型"
            {...formItemLayout}
          >
            {form.getFieldDecorator('type',{initialValue: record.type!=undefined?record.type:"1"})(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">棋牌</Option>
                  <Option value="2">休闲</Option>
                  <Option value="3">竞技</Option>
                  <Option value="4">角色</Option>
                </Select>)}
          </FormItem>
          <FormItem
            label="关键字"
            {...formItemLayout}
          >
            {form.getFieldDecorator('keywords', {
              initialValue: record.keywords!=undefined?record.keywords:"",rules: [{ required: true, message: '请输入关键字' }],
            })(<Input placeholder="请输入关键字" />)}
          </FormItem>
          <FormItem
            label="是否展示"
            {...formItemLayout}
          >
            {form.getFieldDecorator('display',{ initialValue: record.display!=undefined?record.display:"1",rules: [{ required: true, message: '请选择是否展示' }] })(<Select placeholder="请选择" style={{ width: '120px' }}>
                  <Option value="1" selected="selected">true</Option>
                  <Option value="0">false</Option>
                </Select>)}
          </FormItem>
        </Form> 
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */
export default
@connect(({ game, loading }) => ({
  game,
  loading: loading.models.game,
}))
@Form.create()
class Game extends PureComponent {
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
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'appid',
      dataIndex: 'appid',
      //sorter: true,
      //align: 'right',
      //render: val => `${val} 万`,
      // mark to display a total number
      //needTotal: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '是否推荐',
      dataIndex: 'recommend',
      align: 'center',
      render(val) { 
        return val?'true':'false'
      },
    },
    {
      title: '是否本地游戏',
      dataIndex: 'local',
      align: 'center',
      render(val) { 
        return val?'true':'false'
      },
    },
    {
      title: '是否新上架',
      dataIndex: 'new_shelves',
      align: 'center',
      render(val) { 
        return val?'true':'false'
      },
    },
    {
      title: '勋章',
      dataIndex: 'medal_ids',
      align: 'center',
      render(val) {
        if (val == ""){
          return val;
        }
        const medal = JSON.parse(val);
        return medal.length;
        //return val;
      }
    },
    {
      title: '玩家人数',
      dataIndex: 'history_player_number',
      align: 'center',
    },
    {
      title: '分享描述',
      dataIndex: 'share_des',
    },
    {
      title: '分享图片',
      dataIndex: 'share_img',
    },
    {
      title: '关键字',
      dataIndex: 'keywords',
    },
    {
      title: '类型',
      dataIndex: 'type',
      filters: [
        {
          text: "棋牌",
          value: 1,
        },{
          text: "休闲",
          value: 2,
        },{
          text: "竞技",
          value: 3,
        },{
          text: "角色",
          value: 4,
        }
      ],
      render(val){
        switch(val){
          case 1:
            return '棋牌';
            break;
          case 2:
            return '休闲';
            break;
          case 3:
            return '竞技';
            break;
          case 4:
            return '角色';
            break;
          default:
            return '休闲';
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'display',
      align: 'center',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
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
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'game/fetch',
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
      type: 'game/fetch',
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
      type: 'game/fetch',
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
          type: 'game/remove',
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
        type: 'game/fetch',
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
      type: 'game/add',
      payload: {
        id:fields.id,name:fields.name,short_name:fields.short_name,appid:fields.appid,description:fields.description,icon:fields.icon,image:fields.image,recommend:fields.recommend,local:fields.local,new_shelves:fields.new_shelves,medal_ids:fields.medal_ids,medal_rules:fields.medal_rules,share_des:fields.share_des,share_img:fields.share_img,qrcode:fields.qrcode,type:fields.type,keywords:fields.keywords,display:fields.display
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'game/update',
      payload: {
        id:fields.id,name:fields.name,short_name:fields.short_name,appid:fields.appid,description:fields.description,icon:fields.icon,image:fields.image,recommend:fields.recommend,local:fields.local,new_shelves:fields.new_shelves,medal_ids:fields.medal_ids,medal_rules:fields.medal_rules,share_des:fields.share_des,share_img:fields.share_img,qrcode:fields.qrcode,type:fields.type,keywords:fields.keywords,display:fields.display
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
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">棋牌</Option>
                  <Option value="2">休闲</Option>
                  <Option value="3">竞技</Option>
                  <Option value="4">角色</Option>
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
            <FormItem label="openid">
              {getFieldDecorator('openid')(<Input placeholder="请输入openid" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">未启用</Option>
                  <Option value="1">启用</Option>
                  <Option value="2">失效</Option>
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
      game: { data },
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
      <PageHeaderWrapper title="查询表格">
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
