import React, {Component} from 'react';
import {List} from 'antd-mobile';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components';
import {goodsIndexTapChanged} from '../../../actions/actions'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    border-left:8px solid ${props => props.selected === true ? '#0092E0' : 'white'};
  `
const StyledHeaderItem = styled(Item) `
    background: ${props => props.type === 1 ? '#D9D9D9' : 'white'};
  `

class CategoryList extends Component {
  itemClicked = (e, index) => {
    e.preventDefault();
    let { goodsIndexTapChanged } = this.props;
    console.log(goodsIndexTapChanged)
    goodsIndexTapChanged(index - 1) //计算出选择的index
  }

  render() {
    const { data } = this.props
    const {first_category, second_category} = data
    let listItems = []
    for(let i = 0 ; i < data.first_category.length; i++){
      let item = <StyledHeaderItem type={1} key={first_category[i].category_id}>
        {first_category[i].category_name}
      </StyledHeaderItem>
      listItems.push(item)

      for(let j = 0; j < second_category.length; j++){
        if(second_category[j].parent_category_id === first_category[i].category_id){
          let sub_item =  <StyledItem key={second_category[j].category_id}
                                      selected={this.props.index === j} //计算选择状态
                                      onClick={(e) => this.itemClicked(e, j)}>
              {second_category[j].category_name}
            </StyledItem>
          listItems.push(sub_item)
        }
      }
    }
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
    index: state.goods_list.index, //Action触发改变
  };
};

function mapDispatchToProps(dispatch) {
  //react-redux 注入 actions 到 this.props
  // 不需要store.dispatch, 解耦store
  return {
    goodsIndexTapChanged: bindActionCreators(goodsIndexTapChanged, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);