import React, {Component} from 'react';
import {List, Button, WingBlank} from 'antd-mobile';
import NaviBar from '../Common/NaviBar';
import {Get, Post} from '../../service'
import {getUid, getToken} from '../../utils'

import './index.css';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmit: false,
      user_name:"",
      user_telephone:"",
      moving_time:"",
      moveout_address:"",
      moveout_distance_meter:0,
      moveout_is_elevator: 0,
      movein_address:"",
      movein_is_elevator:0,
      movein_distance_meter:0,
      is_invoice:0,
      fleet_name:"",
      fleet_telephone:"",
      fleet_address:"",
      base_info:[],
      goods_info:[],
      total_info:[],

    };
  }

  componentDidMount() {
    this.loadData()
  }

  submitOrder = () => {
    this.setState({
      isSubmit: true
    })

    let that = this
    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()

    Post("order/save",data)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  goOrderList = () => {
    this.props.history.push('/orderlist');
  }

  loadData = () => {
    let that = this
    Get("/cart/finish", {} )
      .then(function (res) {
        console.log(res.result)
        const {result} = res
        that.setState({
          user_name:result.user_name,
          user_telephone:result.user_telephone,
          moving_time:result.moving_time,
          moveout_address:result.moveout_address,
          moveout_distance_meter:result.moveout_distance_meter,
          moveout_is_elevator:result.moveout_is_elevator,
          movein_address:result.movein_address,
          movein_distance_meter:result.movein_distance_meter,
          movein_is_elevator:result.movein_is_elevator,
          is_invoice:result.is_invoice,
          fleet_name:result.fleet_name,
          fleet_telephone:result.fleet_telephone,
          fleet_address:result.fleet_address,
          base_info:result.base_info,
          goods_info:result.goods_info,
          total_info:result.total_info,

        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  render() {
    let navi = null
    if(this.state.isSubmit){
      navi = <WingBlank><Button type="primary" onClick={this.goOrderList}>订单管理</Button></WingBlank>
    }else {
      navi = <NaviBar onPrevious={this.onPrevious} onNext={this.submitOrder} nextTitle="提交订单"/>
    }

    let move_out_address = null
    if(this.state.moveout_is_elevator === 0){
      move_out_address = <div className="contact-sub-item">{this.state.moveout_address}(<span className="red-span">无</span>电梯<span className="blue-span">{this.state.moveout_distance_meter}</span>米)</div>
    }else {
      move_out_address = <div className="contact-sub-item">{this.state.moveout_address}(<span className="blue-span">有</span>电梯<span className="blue-span">{this.state.moveout_distance_meter}</span>米)</div>
    }

    let move_in_address = null
    if(this.state.movein_is_elevator === 0){
      move_in_address = <div className="contact-sub-item">{this.state.movein_address}(<span className="red-span">无</span>电梯<span className="blue-span">{this.state.movein_distance_meter}</span>米)</div>
    }else {
      move_in_address = <div className="contact-sub-item">{this.state.movein_address}(<span className="blue-span">有</span>电梯<span className="blue-span">{this.state.movein_distance_meter}</span>米)</div>
    }

    let baseList = []
    this.state.base_info.forEach((item, index) => {
      let baseItem = null
      if(this.state.base_info.length === index + 1){
         baseItem = (
          <div className="contact-item3-last" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }else {
         baseItem = (
          <div className="contact-item3" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }
      baseList.push(baseItem)
    })
    let goodsList = []
    this.state.goods_info.forEach((item, index) => {
      let goodsItem = null
      if(this.state.base_info.length === index + 1){
        goodsItem = (
          <div className="contact-item3-last" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }else {
        goodsItem = (
          <div className="contact-item3-last" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }
      goodsList.push(goodsItem)
    })
    let totalList = []
    this.state.goods_info.forEach((item, index) => {
      let totalItem = null
      if(this.state.base_info.length === index + 1){
        totalItem = (
          <div className="contact-item3" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }else {
        totalItem = (
          <div className="contact-item3" key={index}>
            <div className="contact-item11">
              <div  className="contact-sub-right-center">{item.title}</div>
            </div>
            <div className="contact-item22">
              <div className="contact-sub-right-center">{item.value}{item.unit}</div>
            </div>
            <div className="contact-item33">
              <div className="contact-sub-right-title">{item.subtitle}</div>
            </div>
          </div>
        )
      }
      totalList.push(totalItem)
    })
    return (
      <div className="order-root">
        <div className="order-header">
          <div className="order-header-info1">若订单信息有误或有疑问 </div>
          <div className="order-header-info2">可致电e搬家客服热线400-400-6668寻求帮助 </div>
        </div>
        <div className="order-content">
          <List renderHeader={() => '基础信息'}>
            <div className="contact-item">
              <div className="contact-item1">
                <div>联系人:</div>
                <div className="contact-sub-item">{this.state.user_name}</div>
              </div>
              <div className="contact-item2">
                <div className="contact-sub-right">联系电话:</div>
                <div className="contact-sub-item">{this.state.user_telephone}</div>
              </div>

            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬家时间:</div>
                <div className="contact-sub-item-blue">{this.state.moving_time}</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬出地址:</div>
                {move_out_address}
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬入地址:</div>
                {move_in_address}
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>发票需求:</div>
                <div className="contact-sub-item">已选择<span className="red-span">{this.state.is_invoice===1 ? '需要':'不需要'}</span>发票</div>
              </div>
            </div>
            <div className="contact-item3-last">
              <div className="contact-item1">
                <div>客户备注:</div>
                <div className="contact-sub-item">HEX16色转换为RGB-在线RGB三原色对照表-Json在线解析格式化工具HEX16色转换为RGB-在线RGB三原色对照表-Json在线解析格式化工具</div>
              </div>
            </div>
          </List>
          <List renderHeader={() => '服务车队信息'}>
            <div className="contact-item">
              <div className="contact-item1">
                <div>车队名称:</div>
                <div className="contact-sub-item">{this.state.fleet_name}</div>
              </div>
              <div className="contact-item2">
                <div className="contact-sub-right">联系电话:</div>
                <div className="contact-sub-item">{this.state.fleet_telephone}</div>
              </div>
            </div>
            <div className="contact-item-last">
              <div className="contact-item1">
                <div>车队地址:</div>
                <div className="contact-sub-item">{this.state.fleet_address}</div>
              </div>
            </div>
          </List>
          <List renderHeader={() => '基础收费项目'}>
            {baseList}
          </List>
          <List renderHeader={() => '贵重物品收费'}>
            {goodsList}
          </List>
          <List renderHeader={() => '总计'}>
            {totalList}
          </List>
        </div>
        <div className="order-navibar">
          {navi}
        </div>
      </div>
    );
  }
}

export default Order;