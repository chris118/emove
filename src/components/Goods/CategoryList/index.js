import React, {Component} from 'react';
import {List} from 'antd-mobile';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components';
import {goodsIndexTapChanged} from '../../../actions/actions'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    border-left:8px solid ${props => props.selected === true ? '#1071B9' : 'white'};
  `
const StyledHeaderItem = styled(Item) `
    background: ${props => props.type === 1 ? '#D9D9D9' : 'white'};
  `

class CategoryList extends Component {
  itemClicked = (e, index) => {
    e.preventDefault();
    let { goodsIndexTapChanged } = this.props;
    goodsIndexTapChanged(index - 1) //计算出选择的index
  }

  render() {
    const { data } = this.props
    const listItems = data.map((item, index) =>
      {
        if(item.type === 0 ){
          return <StyledItem key={index}
                             selected={this.props.index === index - 1} //计算选择状态
                             onClick={(e) => this.itemClicked(e, index)}>
            {item.title}
          </StyledItem>
        }else{ //header
          return <StyledHeaderItem type={item.type} key={index}>
            {item.title}
          </StyledHeaderItem>
        }
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