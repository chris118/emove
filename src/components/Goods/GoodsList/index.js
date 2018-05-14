import React, {Component} from 'react';
import {List} from 'antd-mobile';
import styled from 'styled-components';
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart, removeChart} from '../../../actions/actions'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? '#F2F2F2' : 'white'};
  `
class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart_goods: [],
    };
  }
  componentWillMount() {
    this.setState({
      cart_goods: this.props.data.cart_goods
    })
  }


  updateDataWithChart = () => {
    this.props.data.map((item) => {
      return this.props.chart_items.forEach((char_item) => {
        if(char_item.id === item.id){
           item.number = char_item.number
          return item
        }
      })
    })
  }

  add = (number, item) => {
    // this.state.cart_goods.push(item)
    // this.setState({
    //   cart_goods: this.state.cart_goods
    // })
    // console.log(this.state.cart_goods)

    let { addChart } = this.props;
    addChart(item)
  }

  minus = (number, item) => {
    // this.state.cart_goods.push(item)
    // this.setState({
    //   cart_goods: this.state.cart_goods
    // })
    // console.log(this.state.cart_goods)

    let { removeChart } = this.props;
    removeChart(item)
  }

  render() {
    // this.updateDataWithChart()
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
              number={0}
              plus={(number) => this.add(number, all_goods[j])}
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
