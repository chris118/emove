import React, {Component} from 'react';
import {List, InputItem, Button, WhiteSpace, WingBlank, Picker} from 'antd-mobile';
import BMap from 'BMap';
import {Get, Post} from '../../service'
import {getUid, getToken} from '../../utils'

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
  {label: '1楼', value: 1,}, {label: '2楼', value: 2,}, {label: '3楼', value: 3,}, {label: '4楼', value: 4,}
  , {label: '5楼', value: 5,}, {label: '6楼', value: 6,}, {label: '7楼', value: 7,}, {label: '8楼', value: 8,}
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
      distance_out: undefined,

      address_in: "",
      address_in_selected: false,
      elevator_in: [1],
      floor_in: [1],
      assemble_in: [0],
      distance_in: undefined,
    };
  }

  componentDidMount() {
    this.initMap()
    this.loadData()
  }

  next = (event) => {
    event.preventDefault();
    let moveout = {
      address : this.state.address_out,
      floor: this.state.floor_out[0],
      is_elevator: this.state.elevator_out[0],
      is_handling: this.state.assemble_out[0],
      distance_meter: this.state.distance_out
    }
    let movein = {
      address : this.state.address_in,
      floor: this.state.floor_in[0],
      is_elevator: this.state.elevator_in[0],
      is_handling: this.state.assemble_in[0],
      distance_meter: this.state.distance_in
    }
    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()
    data['moveout'] = moveout
    data['movein'] = movein
    data['banjia_type'] = 1

    let that = this
    Post("cart/address",data)
    .then(function (res) {
      console.log(res)
      that.props.history.push('/goods');
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  loadData = () => {
    let that = this
    Get("/cart/address", {banjia_type : 1} )
    .then(function (res) {
      if(JSON.stringify(res.result.movein) === "{}"){
        return
      }
      if(JSON.stringify(res.result.moveout) === "{}"){
        return
      }
      const {movein, moveout} = res.result
      that.setState({
        address_out: moveout.address,
        floor_out: [moveout.floor],
        elevator_out: moveout.is_elevator ? [1] : [0],
        assemble_out: moveout.is_handling ? [1] : [0],
        distance_out: moveout.distance_meter,

        address_in: movein.address,
        floor_in: [movein.floor],
        elevator_in: movein.is_elevator ? [1] : [0],
        assemble_in: movein.is_handling ? [1] : [0],
        distance_in: movein.distance_meter,
      })
    })
    .catch(function (error) {
      console.error(error)
    })
  }

  initMap = () =>  {
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
          <InputItem placeholder="请填写搬运到车距离(单位米)"
                     value={this.state.distance_out}
                     onChange={(v) => {
                       this.setState({
                         distance_out: v,
                       })}
                     }>搬运距离</InputItem>
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
          <InputItem placeholder='25米'
                     value={this.state.distance_in}
                     onChange={(v) => {
                       this.setState({
                         distance_in: v,
                       })}
                     }>搬运距离</InputItem>
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