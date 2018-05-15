import React, {Component} from 'react';
import {List} from 'antd-mobile';
import Cart from '../Cart'
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart, removeChart} from '../../../actions/actions'

import './index.css';
//测试数据
const Item = List.Item;

class CartGoods extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   cart_list: [] //购物车里有多少种物品
    // };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.items)
  }

  componentWillMount() {
    // this.updateCartItems(this.props.items)
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

  plus = (number, item) => {
    item['goods_num'] = number
    let { addChart } = this.props;
    addChart(item)
  }

  minus = (number, item) => {
    item['goods_num'] = number
    let { removeChart } = this.props;
    removeChart(item)
  }

  // //购物车里有多少种物品
  // updateCartItems = (items) => {
  //   items.forEach((item) => {
  //     //是否在cart_list里
  //     let bFound = false
  //     this.state.cart_list.forEach((cart_item) => {
  //       if(cart_item.goods_id === item.goods_id){
  //         bFound = true
  //       }
  //     })
  //
  //     if(bFound === false){//不在则插入一条
  //       const list = this.state.cart_list
  //       list.push(item)
  //       this.setState({
  //         cart_list: list
  //       })
  //     }
  //   })
  // }
  //
  // //每种物品的数量
  // getNumber = (item) => {
  //   let count = 0;
  //   this.props.items.forEach((cart_item) => {
  //     if(cart_item.goods_id === item.goods_id){
  //       count++
  //     }
  //   })
  //
  //   return count
  // }
  render() {
    const listItems = this.props.items.map((item, index) =>
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
    items: state.chart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChart: bindActionCreators(addChart, dispatch),
    removeChart: bindActionCreators(removeChart, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartGoods);
