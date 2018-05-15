import React, {Component} from 'react';
import {List} from 'antd-mobile';
import Cart from '../Cart'
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart, removeChart} from '../../../actions/actions'
import {Post} from '../../../service'
import {getUid, getToken} from '../../../utils'

import './index.css';
//测试数据
const Item = List.Item;

class CartGoods extends Component {
  onPrevious = () => {
    this.props.onPrevious()
  }

  onNext = () => {
    this.props.onNext()
  }

  onCartClick = () => {
    this.props.onCartClick()
  }

  plus = (number, item) => {
    item['goods_num'] = number
    let { addChart } = this.props;
    addChart(item)

    this.updateCart()
  }

  minus = (number, item) => {
    item['goods_num'] = number
    let { removeChart } = this.props;
    removeChart(item)

    this.updateCart()
  }

  //更新服务端购物车数据
  updateCart = () => {
    let cart_data = []
    this.props.chart_items.forEach((item) => {
      let item_data = {}
      item_data['goods_id'] = item.goods_id
      item_data['goods_num'] = item.goods_num
      cart_data.push(item_data)
    })

    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()
    data['goods'] = JSON.stringify(cart_data)

    Post("/cart/goods",data)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  render() {
    const listItems = this.props.chart_items.map((item, index) =>
      {
        return <Item type={0} key={index}
                     extra={
                       <IndexStepper
                         number={item.goods_num}
                         plus={(number) => this.plus(number, item)}
                         minus={(number) => this.minus(number, item)}/>}>
          {item.goods_name}
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

const mapStateToProps = (state) => {
  console.log(state)
  // state === reducer
  return {
    chart_items: state.chart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChart: bindActionCreators(addChart, dispatch),
    removeChart: bindActionCreators(removeChart, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartGoods);
