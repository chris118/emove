import React, {Component} from 'react';
import {List} from 'antd-mobile';
import styled from 'styled-components';
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart, removeChart} from '../../../actions/actions'
import {getUid, getToken} from '../../../utils'
import {Post} from '../../../service'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? '#F2F2F2' : 'white'};
  `
class GoodsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.chart_items !== nextProps.chart_items){
      this.updateCart(nextProps.chart_items)
    }
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
  }

  //更新服务端购物车数据
  updateCart = (chart_items) => {
    let cart_data = JSON.stringify(chart_items)

    let data = {}
    data['uid'] = getUid()
    data['token'] = getToken()
    data['goods'] = cart_data

    // Post("/cart/goods",data)
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }

  //每种物品的数量
  getNumber = (item) => {
    let count = 0
    this.props.chart_items.forEach((cart_item) => {
      if(cart_item.goods_id === item.goods_id){
        count = cart_item.goods_num
      }
    })
    return count
  }

  render() {
    const {all_goods, second_category} = this.props.data
    let listItems = []
    for(let i = 0 ; i < second_category.length; i++){
      let item = <StyledItem type={1} key={second_category[i].category_id}>
          {second_category[i].category_name}
        </StyledItem>
      listItems.push(item)

      for(let j = 0; j < all_goods.length; j++){
        if(all_goods[j].parent_category_id === second_category[i].category_id){
          let sub_item =<StyledItem type={0} key={all_goods[j].goods_id} extra={
            <IndexStepper
              number={
                this.getNumber(all_goods[j]) //获得购物车数量
              }
              plus={(number) => this.plus(number, all_goods[j])}
              minus={(number) => this.minus(number, all_goods[j])}/>}>
            {all_goods[j].goods_name}
          </StyledItem>
          listItems.push(sub_item)
        }
      }
    }
    return (
      <List className="flex-item">
        { listItems }
      </List>
    );
  }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);
