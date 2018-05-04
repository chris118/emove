import React, {Component} from 'react';
import {List} from 'antd-mobile';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components';
import {goodsIndexChanged} from '../../../actions/goods_list_action'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.selected === true ? 'blue' : 'white'};
  `

class CategoryList extends Component {
  constructor(props){
    super(props)
  }

  itemClicked = (e, index) => { //与GoodsList滚动公用一个action, 点击等于选择类别
    e.preventDefault();
    let { goodsIndexChanged } = this.props;
    goodsIndexChanged(index)
  }

  render() {
    const { data } = this.props
    const listItems = data.map((item, index) =>
      {
        return <StyledItem key={index}
                           selected={this.props.index === index}
                           onClick={(e) => this.itemClicked(e, index)}>
          {item}
        </StyledItem>
      }
    );
    return (
      <List>
        { listItems }
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state) // state === reducer
  return {
    index: state.goods_list.index, //Action出发改变
  };
};

function mapDispatchToProps(dispatch) {
  //react-redux 注入 actions 到 this.props
  // 不需要store.dispatch, 解耦store
  return {
    goodsIndexChanged: bindActionCreators(goodsIndexChanged, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);