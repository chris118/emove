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
      data: []
    };
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    let that = this
    let order = ""
    if(this.state.menu_value[0] !== "none"){
      order = this.state.menu_value[0]
    }
    console.log(order)
    Get("/cart/fleet", {order_by_field : order} )
      .then(function (res) {
        console.log(res.result.usable_fleet)
        that.setState({
          checkIndex: res.result.selected_fleet_id,
          data: res.result.usable_fleet
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  onPrevious = () => {
    this.props.history.goBack();
  }

  onNext = () => {
    this.props.history.push('/order');
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

    const listItems = this.state.data.map((item, index) =>
      {
        return <VehicleItem
          data={item}
          key={index}
          checked={this.state.checkIndex === index ? true : false}
          onChecked={(checked) => {
            this.setState({
              checkIndex: index
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