import React, {Component} from 'react';
import {List, Button, WingBlank} from 'antd-mobile';
import NaviBar from '../Common/NaviBar';

import './index.css';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmit: false,
    };
  }

  onNext = () => {
    this.setState({
      isSubmit: true
    })
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  goOrderList = () => {
    this.props.history.push('/app/orderlist');
  }

  render() {
    let navi = null
    if(this.state.isSubmit){
      navi = <WingBlank><Button type="primary" onClick={this.goOrderList}>订单管理</Button></WingBlank>
    }else {
      navi = <NaviBar onPrevious={this.onPrevious} onNext={this.onNext} nextTitle="提交订单"/>
    }
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
                <div className="contact-sub-item">张三</div>
              </div>
              <div className="contact-item2">
                <div className="contact-sub-right">联系电话:</div>
                <div className="contact-sub-item">13333333333</div>
              </div>

            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬家时间:</div>
                <div className="contact-sub-item-blue">2018-05-06 下午1-2点</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬出地址:</div>
                <div className="contact-sub-item">上海市宝山区红树林路158弄20号103室(<span className="blue-span">有</span>电梯<span className="blue-span">20</span>米)</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>搬入地址:</div>
                <div className="contact-sub-item">上海市宝山区红树林路158弄20号103室(<span className="red-span">无</span>电梯<span className="blue-span">20</span>米)</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item1">
                <div>发票需求:</div>
                <div className="contact-sub-item">已选择<span className="red-span">不需要</span>发票</div>
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
                <div className="contact-sub-item">上海蚂蚁搬厂车队</div>
              </div>
              <div className="contact-item2">
                <div className="contact-sub-right">联系电话:</div>
                <div className="contact-sub-item">13333333333</div>
              </div>
            </div>
            <div className="contact-item-last">
              <div className="contact-item1">
                <div>车队地址:</div>
                <div className="contact-sub-item">上海市宝山区红树林路158弄20号103室</div>
              </div>
            </div>
          </List>
          <List renderHeader={() => '基础收费项目'}>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">车辆基础价</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">运输公里收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3-last">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">楼层收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
          </List>
          <List renderHeader={() => '贵重物品收费'}>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">车辆基础价</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">运输公里收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3-last">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">楼层收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
          </List>
          <List renderHeader={() => '总计'}>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">车辆基础价</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">运输公里收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
            <div className="contact-item3-last">
              <div className="contact-item11">
                <div  className="contact-sub-right-center">楼层收费</div>
              </div>
              <div className="contact-item22">
                <div className="contact-sub-right-center">800元</div>
              </div>
              <div className="contact-item33">
                <div className="contact-sub-right">上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山上海市宝山</div>
              </div>
            </div>
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