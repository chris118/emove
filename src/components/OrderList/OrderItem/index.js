import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import './index.css';

class OrderList extends Component {
  render() {
    return (
      <div className="orderitem-root">
        <div className="orderitem-sub1">
          <div className="orderitem-title">订单编号:</div>
          <div>123456789987654321</div>
          <div className="orderitem-status">未完成</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-title">搬出地址:</div>
          <div>上海市宝山区红树林路158弄20号103室</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-title">搬入地址:</div>
          <div>上海市宝山区红树林路158弄20号103室</div>
        </div>
        <div className="orderitem-sub">
          <div className="orderitem-time">
            <div className="orderitem-title">搬家时间:</div>
            <div className="orderitem-time-value">2018-05-06 下午1-2点</div>
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