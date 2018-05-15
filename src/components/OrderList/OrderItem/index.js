import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class OrderList extends Component {
  render() {
    let status = "未知"
    if(this.props.data.order_status == 'wait'){
      status = '未完成'
    }else if(this.props.data.order_status == 'hold'){
      status = '待确认'
    }else if(this.props.data.order_status == 'confirm'){
      status = '已确认待执行'
    }else if(this.props.data.order_status == 'execute'){
      status = '执行中待完成'
    }else if(this.props.data.order_status == 'finish'){
      status = '已完成待评价'
    }else if(this.props.data.order_status == 'evaluate'){
      status = '已评价'
    }else if(this.props.data.order_status == 'closed'){
      status = '已关闭'
    }
    return (
      <div className="orderitem-root">
        <div className="orderitem-sub1">
          <div className="orderitem-title">订单编号:</div>
          <div>{this.props.data.order_sn}</div>
          <div className="orderitem-status">{status}</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-title">搬出地址:</div>
          <div>{this.props.data.moveout_address}</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-title">搬入地址:</div>
          <div>{this.props.data.movein_address}</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-time">
            <div className="orderitem-title">搬家时间:</div>
            <div className="orderitem-time-value">{this.props.data.moving_time}<span>{" "}</span>{this.props.data.time_slot_title}</div>
          </div>
          <div className="orderitem-detai-btn">
            <Button type="ghost" inline size="small">订单详情</Button>
          </div>
        </div>
        <div className="orderitem-sub"></div>
      </div>
    );
  }
}

export default OrderList;