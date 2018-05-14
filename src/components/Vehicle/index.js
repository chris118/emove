import React, {Component} from 'react';
import {Icon, Menu, List} from 'antd-mobile';
import VehicleItem from './VehicleItem'
import NaviBar from '../Common/NaviBar';

import './index.css';


const menu_data = [

  {
    value: '1',
    label: '智能排序',
  },{
    value: '2',
    label: '距离',
  }, {
    value: '3',
    label: '时间',
  },
  {
    value: '4',
    label: '点评',
  },
];

const data = [
  {
    name: 'aaaaa',

  }, {
    name: 'bbbbb',
  },
  {
    name: 'ccccc',
  },
  {
    name: 'ccccc',
  },{
    name: 'ccccc',
  },{
    name: 'ccccc',
  },{
    name: 'ccccc',
  },{
    name: 'ccccc',
  },{
    name: 'ccccc',
  },
];

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_data: menu_data,
      menu_show: false,
      menu_value: ['1']
    };
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

    const listItems = data.map((item, index) =>
      {
        return <VehicleItem data={item} key={index}/>
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