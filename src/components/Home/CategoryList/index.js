import React, {Component} from 'react';
import {List} from 'antd-mobile';
import { connect } from 'react-redux'

import './index.css';

const Item = List.Item;

class CategoryList extends Component {
  render() {
    console.log("CategoryList recieved index: " + this.props.index)

    const { data } = this.props
    const listItems = data.map((item) =>
      {
        return <Item key={item.toString()}>
          {item}
        </Item>
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

export default connect(mapStateToProps)(CategoryList);