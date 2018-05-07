import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, InputItem, Button, WhiteSpace, WingBlank, TextareaItem } from 'antd-mobile';
import {stepsIndexChanged} from '../../actions/actions';

import './index.css';

const Item = List.Item;
class Info extends Component {
  next = (event) => {
    event.preventDefault();

    const {stepsIndexChanged} = this.props
    stepsIndexChanged(1)

    this.props.history.replace('/app/goods');
  }
  render() {
    return (
      <div className="info-container">
        <List renderHeader={() => '请在下方选择您希望的搬家时间'}>
          <Item extra="2018-01-01" arrow="horizontal" onClick={() => {}}>选择时间</Item>
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
        <List>
          <Item extra="否" arrow="horizontal" onClick={() => {}}>是否需要发票</Item>
        </List>
        <WhiteSpace size="xl"/>

        <WingBlank>
          <Button type="primary" onClick={this.next}>下一步</Button>
        </WingBlank>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stepsIndexChanged: bindActionCreators(stepsIndexChanged, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Info);
