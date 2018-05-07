import React, {Component} from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank, Picker } from 'antd-mobile';

import './index.css';

const Item = List.Item;

const seasons = [
  {
    label: '2013',
    value: '2013',
  },
  {
    label: '2014',
    value: '2014',
  },
];

class Info extends Component {
  next = (event) => {
    event.preventDefault();

    this.props.history.replace('/app/infoex');
  }

  render() {
    return (
      <div className="info-container">
        <List renderHeader={() => '请在下方填写您的搬出地址'}>
          <InputItem placeholder="请在此填写您的搬出地址">搬出地址</InputItem>
          <Picker data={seasons} cols={1} >
            <List.Item arrow="horizontal">Single</List.Item>
          </Picker>
          <Item extra="有" arrow="horizontal" onClick={() => {}}>有无电梯</Item>
          <Item extra="不需要" arrow="horizontal" onClick={() => {}}>需要拼装</Item>
          <InputItem placeholder="请填写搬运到车距离(单位米)">搬运距离</InputItem>
        </List>
        <List renderHeader={() => '请在下方填写您的搬入地址'}>
          <InputItem placeholder="请在此填写您的搬入地址">搬入地址</InputItem>
          <Item extra="有" arrow="horizontal" onClick={() => {}}>有无电梯</Item>
          <Item extra="请选择" arrow="horizontal" onClick={() => {}}>选择楼层</Item>
          <Item extra="不需要" arrow="horizontal" onClick={() => {}}>需要分拆</Item>
          <InputItem placeholder="25米">搬运距离</InputItem>
        </List>
        <div className="info-tips">提示:预定完成后可拨打400-000-6668进行修改</div>
        <WhiteSpace size="xl"/>

        <WingBlank>
          <Button type="primary" onClick={this.next}>下一步</Button>
        </WingBlank>
      </div>
    );
  }
}
export default Info;