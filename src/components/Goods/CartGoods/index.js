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

    this.state = {
      cart_list: []
    };
  }

  componentWillMount() {
    //整理数据
    let itmes =  this.props.items.forEach((item) => {

      //是否在cart_list里
      let bFound = false
      this.state.cart_list.forEach((cart_item) => {
        if(cart_item.goods_id === item.goods_id){
          bFound = true
        }
      })

      if(bFound === true){ //如果在更新数字
        this.state.cart_list.forEach((cart_item, index) => {
          if(cart_item.goods_id === item.goods_id){
            const list = this.state.cart_list
            list[index].number = list[index].number + 1
            this.setState({
              cart_list: list
            })
          }
        })
      }else {// 不在则插入一条
        let newItem = Object.assign(item, {number: 1})
        const list = this.state.cart_list
        list.push(newItem)
        this.setState({
          cart_list: list
        })
      }
    })
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
    let { addChart } = this.props;
    addChart(item)
  }

  minus = (number, item) => {
    let { removeChart } = this.props;
    removeChart(item)
  }


  render() {
    const listItems = this.state.cart_list.map((item, index) =>
      {
        return <Item type={0} key={index}
                     extra={
                       <IndexStepper
                         number={item.number}
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
