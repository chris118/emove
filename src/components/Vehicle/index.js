import React, {Component} from 'react';
import {Icon, Menu, List} from 'antd-mobile';
import VehicleItem from './VehicleItem'
import NaviBar from '../Common/NaviBar';
import {Get, Post} from '../../service'
import {getUid, getToken} from '../../utils'

import './index.css';

const menu_data = [
  {
    value: 'order',
    label: '订单最多',
  },{
    value: 'evaluate',
    label: '评分最高',
  }, {
    value: 'none',
    label: '离我最近',
  }
]

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_data: menu_data,
      menu_show: false,
      menu_value: ['order'],
      checkIndex: 0,
      selected_fleet_id: 0,
      move_date: "",
      data: []
    };
  }

  componentDidMount() {
    this.loadData()
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  onNext = () => {
    //更新信息到服务器
    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()
    data['fleet_id'] = this.state.selected_fleet_id

    console.log(data)
    let that = this
    Post("/cart/fleet",data)
      .then(function (res) {
        console.log(res)
        that.props.history.push('/order');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  menuClick = () => {
    this.setState({
      menu_show: !this.state.menu_show,
    });
  }

  onMaskClick = () => {
    this.setState({
      menu_show: false,
    });
  }

  onMenuChange = (value) => {
    this.setState({
      menu_value: value,
    });
    this.setState({
      menu_show: false,
    });
    this.loadData()
  }

  loadData = () => {
    let order = ""
    if(this.state.menu_value[0] !== "none"){
      order = this.state.menu_value[0]
    }
    let that = this
    Get("/cart/fleet", {order_by_field : order} )
      .then(function (res) {
        console.log(res.result)
        that.setState({
          selected_fleet_id: res.result.selected_fleet_id,
          move_date:  res.result.move_date,
          data: res.result.usable_fleet,
          checkIndex: that.getIndexOfSelected(res.result.usable_fleet, res.result.selected_fleet_id)
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  getIndexOfSelected = (items, selected_fleet_id) => {
    let index = 0;
    for(let i = 0; i < items.length; i++){
      if(items[i].fleet_id === selected_fleet_id){
        break
      }
      index++;
    }
    return index
  }

  render() {
    const { menu_data, menu_show, menu_value } = this.state;
    const menuEl = (
      <Menu
        className="vehicle-menu"
        data={menu_data}
        value={menu_value}
        level={1}
        onChange={this.onMenuChange}
        height={140}
      />
    );
    let menu_lable = ""
    menu_data.forEach((dataItem) => {
      if (dataItem.value === menu_value[0]) {
        menu_lable = dataItem.label
      }
    });

    console.log(this.state.checkIndex)
    const listItems = this.state.data.map((item, index) =>
      {
        return <VehicleItem
          move_date = {this.state.move_date}
          data={item}
          key={index}
          checked={this.state.checkIndex  === index ? true : false}
          onChecked={(checked) => {
            this.setState({
              checkIndex: index,
              selected_fleet_id: item.fleet_id
            })
          }}/>
      }
    );

    return (
      <div className="vehicle-root">
        <div className="vehicle-top">
          <div className="select-wrapper" onClick={this.menuClick}>
            <div>{menu_lable}</div>
            <Icon className="vehicle-icon" type="down" />
          </div>
        </div>
        <div className="vehicle-content">
          <List>
            {listItems}
          </List>
        </div>
        <div className="navibar">
          <NaviBar onPrevious={this.onPrevious} onNext={this.onNext}/>
        </div>
        {menu_show ? menuEl : null}
        {menu_show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    );
  }
}

export default Vehicle;