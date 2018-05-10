import React, {Component} from 'react';
import {List} from 'antd-mobile';
import Cart from '../Cart'
import IndexStepper from '../../Common/Stepper/index'

import './index.css';
//测试数据
const data = []
const Item = List.Item;

class CartGoods extends Component {
  componentWillMount() {
    this.loadData();
  }
  onPrevious = () => {
    this.props.onPrevious()
  }

  onNext = () => {
    this.props.onNext()
  }

  onCartClick = () => {
    this.props.onCartClick()
  }

  loadData() {
    for(let i = 1; i <= 4; i ++){
      data.push({
        id: i,
        title: i,
        type: 0
      })
    }
  }

  render() {
    const listItems = data.map((item, index) =>
      {
        return <Item type={item.type} key={index}
                     extra={
                       <IndexStepper/>}>
          {item.title}
        </Item>
      }
    );

    return (
      <div className="cartgoods-root">
        <div className="cartgoods-list">
          { listItems }
        </div>

        <Cart onPrevious={this.onPrevious} onNext={this.onNext} onCartClick={this.onCartClick}/>
      </div>
    );
  }
}

export default CartGoods;