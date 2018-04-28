import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {List} from 'antd-mobile';
import GoodsList from './GoodsList';
import CategoryList from './CategoryList'
import {goodsIndexChanged} from '../../actions/goods_list_action'

import './index.css';

const Item = List.Item;

//测试数据
const data = []
const numbers = [1, 2, 3, 4, 5 ,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

class Home extends Component {

  componentWillMount() {
    this.loadData();
  }

  rightDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', () => {
        console.log("y: " + node.scrollTop)

        // 由 react-redux 注入：
        let { goodsIndexChanged } = this.props;
        goodsIndexChanged(node.scrollTop)

      });
    }
  };

  loadData() {
    data.push(  {
      id: 0,
      title: 'Header1',
      type: 1
    })
    for(var i = 1; i <= 10; i ++){
      data.push({
        id: 1,
        title: i,
        type: 0
      })
    }

    data.push(  {
      id: 0,
      title: 'Header2',
      type: 1
    })
    for(i = 1; i <= 20; i ++){
      data.push({
        id: 1,
        title: i,
        type: 0
      })
    }
  }

  render() {
    return (
      <div className="Container">
        {/*<div className="Left">*/}
          {/*<CategoryList data={numbers}/>*/}
        {/*</div>*/}
        <div className="Right" ref={this.rightDidMount}>
          <GoodsList  data={data}/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  //react-redux 注入 actions 到 this.props
  // 不需要store.dispatch, 解耦store
  return {
    goodsIndexChanged: bindActionCreators(goodsIndexChanged, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Home);