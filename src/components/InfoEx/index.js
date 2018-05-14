import React, {Component} from 'react';
import { connect } from 'react-redux'
import { List, InputItem, WhiteSpace, TextareaItem, DatePicker, Picker } from 'antd-mobile';
import NaviBar from '../Common/NaviBar';

import './index.css';

const invoices = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];

class Info extends Component {
  constructor(props) {
    super(props);

    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);

    this.state = {
      date: now,
      invoice: [0]
    };
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  onNext = () => {
    this.props.history.push('/vehicle');
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
            <List.Item arrow="horizontal">Date</List.Item>
          </DatePicker>
        </List>
        <List renderHeader={() => '请在下方填写负责人的联系方式'}>
          <InputItem placeholder="请在此填写负责人姓名">负责人</InputItem>
          <InputItem placeholder="请在此填写负责人手机号码">手机号码</InputItem>
        </List>
        <List renderHeader={() => '备注(非必填)'}>
          <TextareaItem
            rows={3}
            placeholder="请输入备注信息"
          />
        </List>
        <WhiteSpace/>
        <Picker
          data={invoices}
          cols={1}
          value={this.state.invoice}
          onChange={v => this.setState({invoice: v})}
          onOk={v => this.setState({invoice: v})}
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
