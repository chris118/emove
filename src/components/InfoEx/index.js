import React, {Component} from 'react';
import { connect } from 'react-redux'
import { List, InputItem, WhiteSpace, TextareaItem, DatePicker, Picker } from 'antd-mobile';
import NaviBar from '../Common/NaviBar';
import {Get, Post} from '../../service'
import {getUid, getToken} from '../../utils'

import './index.css';

const invoices = [
  {
    label: '否',
    value: 0,
  },
  {
    label: '是',
    value: 1,
  },
];

class Info extends Component {
  constructor(props) {
    super(props);

    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);

    this.state = {
      date: now,
      manager: "chris",
      mobile: '15618516930',
      is_invoice: [0],
      time_slot: [],
      time: [1],
      user_note: "",
    };
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    let that = this
    Get("/cart/time", {banjia_type : 1} )
      .then(function (res) {
        console.log(res.result)

        let time_slot = []
        res.result.time_slot.forEach((slot) => {
          time_slot.push({
            label: slot.title,
            value: slot.time_slot_id,
          })
        })

        let cart_time = res.result.cart_time
        const nowTimeStamp = Date.now();
        let date = new Date(nowTimeStamp);

        if(cart_time != null){
          date = new Date(res.result.cart_time.year,res.result.cart_time.month-1,res.result.cart_time.day)
          that.setState({
            date: date,
            time: [parseInt(res.result.cart_time.time_slot_id)],
          })
        }

        if(res.result.cart_contacts != null){
          that.setState({
            date: date,
            manager: res.result.cart_contacts.user_name,
            mobile: res.result.cart_contacts.user_telephone,
            user_note:res.result.cart_contacts.user_note,
            is_invoice: [res.result.cart_contacts.is_invoice],
          })
        }
        that.setState({
          date: date,
          time_slot: time_slot,
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  onNext = () => {
    //更新信息到服务器
    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()
    data['year'] = this.state.date.getFullYear()
    data['month'] = this.state.date.getMonth() + 1
    data['day'] = this.state.date.getDate()
    data['time_slot_id'] = this.state.time[0]
    data['user_name'] = this.state.manager
    data['user_telephone'] = this.state.mobile
    data['is_invoice'] = this.state.is_invoice[0]
    data['user_note'] = this.state.user_note

    let that = this
    Post("/cart/time",data)
      .then(function (res) {
        console.log(res)
        that.props.history.push('/vehicle');
      })
      .catch(function (error) {
        console.error(error);
      });

  }

  render() {
    return (
      <div className="infoex-container">
        <div className="infoex-header">欢迎使用e搬家微信服务号在线下单功能!</div>

        <List renderHeader={() => '请在下方选择您希望的搬家时间'}>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="Optional"
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">选择日期</List.Item>
          </DatePicker>
          <Picker
            data={this.state.time_slot}
            cols={1}
            value={this.state.time}
            onChange={v => this.setState({time: v})}
            onOk={v => this.setState({time: v})}
          >
            <List.Item arrow="horizontal">选择时段</List.Item>
          </Picker>
        </List>
        <List renderHeader={() => '请在下方填写负责人的联系方式'}>
          <InputItem
            value={this.state.manager}
            placeholder="请在此填写负责人姓名"
            onChange={(v) => {
              this.setState({
                manager: v,
              })}
            }>负责人</InputItem>
          <InputItem
            value={this.state.mobile}
            placeholder="请在此填写负责人手机号码"
            onChange={(v) => {
              this.setState({
                mobile: v,
              })}
            }>手机号码</InputItem>
        </List>
        <List renderHeader={() => '备注(非必填)'}>
          <TextareaItem
            rows={3}
            value={this.state.user_note}
            onChange={v => this.setState({user_note: v})}
            placeholder="请输入备注信息"
          />
        </List>
        <WhiteSpace/>
        <Picker
          data={invoices}
          cols={1}
          value={this.state.is_invoice}
          onChange={v => this.setState({is_invoice: v})}
          onOk={v => this.setState({is_invoice: v})}
        >
          <List.Item arrow="horizontal">是否需要发票</List.Item>
        </Picker>
        <WhiteSpace size="xl"/>

        <div className="navibar">
          <NaviBar onPrevious={this.onPrevious} onNext={this.onNext}/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(null, mapDispatchToProps)(Info);
