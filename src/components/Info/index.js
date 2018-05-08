import React, {Component} from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank, Picker } from 'antd-mobile';
// import { createForm } from 'rc-form';
import BMap from 'BMap'

import './index.css';

const Item = List.Item;

const elevators = [
  {
    label: '有',
    value: 1,
  },
  {
    label: '无',
    value: 0,
  },
];
const assembles = [
  {
    label: '需要',
    value: 1,
  },
  {
    label: '不需要',
    value: 0,
  },
];

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elevator: [1],
      assemble: [0]
    };
  }

  componentDidMount(){
    this.initMap();
  }


  next = (event) => {
    event.preventDefault();

    this.props.history.replace('/app/infoex');
  }

  initMap() {
    let map = this.map = new BMap.Map("allmap");
    map.centerAndZoom("上海", 12);

    var out_ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {
        "input": "moveout",
        "location": map
      });
    var in_ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {
        "input": "movein",
        "location": map
      });

    out_ac.addEventListener('onconfirm', (e) => {
      var _value = e.item.value;
      let start_value = _value.province + _value.city + _value.district + _value.street + _value.business;

    });

    in_ac.addEventListener('onconfirm', (e) => {
      var _value = e.item.value;
      let end_value = _value.province + _value.city + _value.district + _value.street + _value.business;
    });
  }

  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="info-container">
        <List renderHeader={() => '请在下方填写您的搬出地址'}>
          <div id='allmap'></div>
          <InputItem placeholder="请在此填写您的搬出地址" id="moveout">搬出地址</InputItem>
          <Picker
            data={elevators}
            cols={1}
            value={this.state.elevator}
            onChange={v => this.setState({ elevator: v })}
            onOk={v => this.setState({ elevator: v })}
          >
            <List.Item arrow="horizontal">有无电梯</List.Item>
          </Picker>
          <Picker
            data={assembles}
            cols={1}
            value={this.state.assemble}
            onChange={v => this.setState({ assemble: v })}
            onOk={v => this.setState({ assemble: v })}
          >
            <List.Item arrow="horizontal">需要拼装</List.Item>
          </Picker>

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
// export default createForm()(Info);