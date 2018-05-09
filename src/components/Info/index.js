import React, {Component} from 'react';
import {List, InputItem, Button, WhiteSpace, WingBlank, Picker} from 'antd-mobile';
import BMap from 'BMap';

import './index.css';


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

const floors = [
  {label: '1', value: 1,}, {label: '2', value: 2,}, {label: '3', value: 3,}, {label: '4', value: 4,}
  , {label: '5', value: 5,}, {label: '6', value: 6,}, {label: '7', value: 7,}, {label: '8', value: 8,}
];

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address_out: "",
      address_out_selected: false,
      elevator_out: [1],
      floor_out: [1],
      assemble_out: [0],

      address_in: "",
      address_in_selected: false,
      elevator_in: [1],
      floor_in: [1],
      assemble_in: [0],
    };
  }

  componentDidMount() {
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

    // let _this = this;
    out_ac.addEventListener('onconfirm', (e) => {
      var _value = e.item.value;
      let start_value = _value.province + _value.city + _value.district + _value.street + _value.business;
      this.setState({
        address_out_selected: true,
        address_out: start_value
      })

    });

    in_ac.addEventListener('onconfirm', (e) => {
      var _value = e.item.value;
      let end_value = _value.province + _value.city + _value.district + _value.street + _value.business;
      this.setState({
        address_in_selected: true,
        address_in: end_value
      })
    });
  }

  render() {

    // 搬出楼层
    let floor_out = null;
    if(this.state.elevator_out[0] === 0){
      floor_out = (
        <Picker
          data={floors}
          cols={1}
          value={this.state.floor_out}
          onChange={v => this.setState({floor_out: v})}
          onOk={v => this.setState({floor_out: v})}
        >
          <List.Item arrow="horizontal">选择楼层</List.Item>
        </Picker>
        )
    }

    // 搬入楼层
    let floor_in = null;
    if(this.state.elevator_in[0] === 0){
      floor_in = (
        <Picker
          data={floors}
          cols={1}
          value={this.state.floor_in}
          onChange={v => this.setState({floor_in: v})}
          onOk={v => this.setState({floor_in: v})}
        >
          <List.Item arrow="horizontal">选择楼层</List.Item>
        </Picker>
      )
    }

    return (
      <div className="info-container">
        <div className="info-header">欢迎使用e搬家微信服务号在线下单功能!</div>
        <List renderHeader={() => '请在下方填写您的搬出地址'}>
          <div id='allmap'></div>

          {/*搬出*/}
          <InputItem
            placeholder="请在此填写您的搬出地址"
            id="moveout"
            onChange={(v) => {
              this.setState({
                address_out: v,
                address_out_selected: false,
              })}
            }
            value={this.state.address_out}
            onBlur={(v) => {
              if(this.state.address_out_selected === false){
                this.setState({
                  address_out: ""
                })
              }
            }}
            >
            搬出地址
          </InputItem>
          <Picker
            data={elevators}
            cols={1}
            value={this.state.elevator_out}
            onChange={v => this.setState({elevator_out: v})}
            onOk={v => this.setState({elevator_out: v})}
          >
            <List.Item arrow="horizontal">有无电梯</List.Item>
          </Picker>
          {floor_out}
          <Picker
            data={assembles}
            cols={1}
            value={this.state.assemble_out}
            onChange={v => this.setState({assemble_out: v})}
            onOk={v => this.setState({assemble_out: v})}
          >
            <List.Item arrow="horizontal">需要拼装</List.Item>
          </Picker>
          <InputItem placeholder="请填写搬运到车距离(单位米)">搬运距离</InputItem>
        </List>

        {/*搬入*/}
        <List renderHeader={() => '请在下方填写您的搬入地址'}>
          <InputItem
            placeholder="请在此填写您的搬入地址"
            id="movein"
            onChange={(v) => {
              this.setState({
                address_in: v,
                address_in_selected: false,
              })}
            }
            value={this.state.address_in}
            onBlur={(v) => {
              if(this.state.address_in_selected === false){
                this.setState({
                  address_in: ""
                })
              }
            }}>
            搬入地址
          </InputItem>
          <Picker
            data={elevators}
            cols={1}
            value={this.state.elevator_in}
            onChange={v => this.setState({elevator_in: v})}
            onOk={v => this.setState({elevator_in: v})}
          >
            <List.Item arrow="horizontal">有无电梯</List.Item>
          </Picker>
          {floor_in}
          <Picker
            data={assembles}
            cols={1}
            value={this.state.assemble_in}
            onChange={v => this.setState({assemble_in: v})}
            onOk={v => this.setState({assemble_in: v})}
          >
            <List.Item arrow="horizontal">需要分拆</List.Item>
          </Picker>
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