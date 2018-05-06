import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoodsList from './GoodsList';
import CategoryList from './CategoryList'
import {goodsIndexChanged} from '../../actions/goods_list_action'

import './index.css';

//测试数据
const data = []
const numbers = [];

class Goods extends Component {

  componentWillMount() {
    this.loadData();
  }

  componentDidMount() {
    this.rightDiv.addEventListener('scroll', () => {
      // 由 react-redux 注入：
      let { goodsIndexChanged } = this.props;
      var index = 0;
      if(this.rightDiv.scrollTop >= 44*11){
        index = 1;
      }
      goodsIndexChanged(index)
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps:  " + nextProps.selected_index)
    if(nextProps.selected_index === 0){
      this.rightDiv.scrollTop = 0;
    } if(nextProps.selected_index === 1){
      this.rightDiv.scrollTop = 44*11;
    }
  }


  loadData() {
    //category
    numbers.push(  {
      id: 100,
      title: 'H1',
      type: 1
    })
    for(var i = 1; i <= 5; i ++){
      numbers.push({
        id: i,
        title: i,
        type: 0
      })
    }

    numbers.push(  {
      id: 101,
      title: 'H2',
      type: 1
    })
    for(i = 1; i <= 20; i ++){
      numbers.push({
        id: i,
        title: i,
        type: 0
      })
    }

    //goods
    data.push(  {
      id: 100,
      title: 'Header1',
      type: 1
    })
    for(i = 1; i <= 10; i ++){
      data.push({
        id: i,
        title: i,
        type: 0
      })
    }

    data.push(  {
      id: 101,
      title: 'Header2',
      type: 1
    })
    for(i = 1; i <= 20; i ++){
      data.push({
        id: i,
        title: i,
        type: 0
      })
    }
  }

  render() {
    return (
      <div className="Container">
        <div className="Left">
          <CategoryList data={numbers}/>
        </div>
        <div className="Right" ref={(right) => { this.rightDiv = right; }}>
          <GoodsList  data={data}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state === reducer
  return {
    selected_index: state.goods_list.selected_index, //goodsIndexTapChanged触发改变，滚动到指定位置
  };
};

function mapDispatchToProps(dispatch) {
  //react-redux 注入 actions 到 this.props
  // 不需要store.dispatch, 解耦store
  return {
    goodsIndexChanged: bindActionCreators(goodsIndexChanged, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods);