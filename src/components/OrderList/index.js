import React, {Component} from 'react';
import './index.css';
import {Icon, Menu, List, Button, WingBlank} from 'antd-mobile';
import OrderItem from './OrderItem'
import {Get} from '../../service'

const menu_data = [
  {
    value: 'none',
    label: '全部订单',
  }, {
    value: 'finish',
    label: '完成订单',
  },
  {
    value: 'wait',
    label: '未完成订单',
  },
];

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_data: menu_data,
      menu_show: false,
      menu_value: ['none'],
      data: [],
    };
  }

  componentDidMount() {
    this.loadData()
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
    let order_status = ""
    if(this.state.menu_value[0] !== "none"){
      order_status = this.state.menu_value[0]
    }

    console.log(order_status)
    let that = this
    let date = {
      page:1,
      order_status: order_status
    }
    Get("/get/orders", date )
      .then(function (res) {
        console.log(res.result)
        const {result} = res
        that.setState({
          data: result,
        });
      })
      .catch(function (error) {
        console.error(error)
      })
  }


  render() {
    const menuEl = (
      <Menu
        className="vehicle-menu"
        data={this.state.menu_data}
        value={this.state.menu_value}
        level={1}
        onChange={this.onMenuChange}
        height={140}
      />
    );
    const { menu_data, menu_show, menu_value } = this.state;
    let menu_lable = ""
    menu_data.forEach((dataItem) => {
      if (dataItem.value === menu_value[0]) {
        menu_lable = dataItem.label
      }
    });

    const listItems = this.state.data.map((item, index) =>
      {
        return <OrderItem data={item} key={index}/>
      }
    );
    return (
      <div className="orderlist-root">
        <div className="vehicle-top">
          <div className="select-wrapper" onClick={this.menuClick}>
            <div>{menu_lable}</div>
            <Icon className="vehicle-icon" type="down" />
          </div>
        </div>
        <div className="orderlist-content">
          <List>
            {listItems}
          </List>
        </div>
        <div className="orderlist-navibar">
          <WingBlank><Button type="primary">拨打免费服务热线</Button></WingBlank>
        </div>
        {menu_show ? menuEl : null}
        {menu_show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    );
  }
}

export default OrderList;