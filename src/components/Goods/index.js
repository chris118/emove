import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoodsList from './GoodsList';
import CategoryList from './CategoryList'
import {goodsIndexChanged, addChart} from '../../actions/actions'
import Cart from './Cart'
import CartGoods from './CartGoods'
import Modal from '../Common/Modal';

import './index.css';

//测试数据
const categories = []
let data = []
let chart_data = []

class Goods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isOpen: false,
    };
  }

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
    if(nextProps.selected_index === 0){
      this.rightDiv.scrollTop = 0;
    } if(nextProps.selected_index === 1){
      this.rightDiv.scrollTop = 44*11;
    }
  }


  loadData() {
    //category
    categories.push(  {
      id: 100,
      title: 'H1',
      type: 1
    })
    for(var i = 1; i <= 5; i ++){
      categories.push({
        id: i,
        title: i,
        type: 0
      })
    }

    categories.push(  {
      id: 101,
      title: 'H2',
      type: 1
    })
    for(i = 1; i <= 20; i ++){
      categories.push({
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
    for(i = 1; i <= 5; i ++){
      data.push({
        id: i,
        title: i,
        type: 0,
      })

      chart_data.push({
        id: i,
        title: i,
        type: 0,
        number: 1
      })
    }

    data.push(  {
      id: 101,
      title: 'Header2',
      type: 1
    })
    for(i = 1; i <= 20; i ++){
      data.push({
        id: i+ 10 ,
        title: i+ 10,
        type: 0,
      })
    }

    this.setState({
      data: data
    })


    let { addChart } = this.props;
    chart_data.map((item)=> {
      return addChart(item)
    })
  }

  onPrevious = (event) => {
    this.props.history.replace('/app/infoex');
  }

  onNext = (event) => {
    this.props.history.replace('/app/vehicle');
  }

  onCartClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });

    //禁止滚动
    this.rightDiv.style.overflow = 'hidden'
    this.leftDiv.style.overflow = 'hidden'
  }

  onModalHide = () => {
    this.setState({
      isOpen: false
    });

    //恢复滚动
    this.rightDiv.style.overflow = 'auto'
    this.leftDiv.style.overflow = 'auto'

    data = []
    this.loadData();
  }

  render() {
    return (
      <div className="goods-root">
        <div className="goods-content">
          <div className="left" ref={(left) => { this.leftDiv = left; }}>
            <CategoryList data={categories}/>
          </div>
          <div className="right" ref={(right) => { this.rightDiv = right; }}>
            <GoodsList  data={this.state.data}/>
          </div>
        </div>
        <div className="goods-cart" style={{visibility: this.state.isOpen?'hidden':'visible'}} >
          <Cart onPrevious={this.onPrevious} onNext={this.onNext} onCartClick={this.onCartClick}/>
        </div>
        <Modal show={this.state.isOpen} onHide={this.onModalHide}>
          <CartGoods  onPrevious={this.onPrevious} onNext={this.onNext} onCartClick={this.onCartClick}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state === reducer
  return {
    selected_index: state.goods_list.selected_index, //goodsIndexTapChanged触发改变，滚动到指定位置
    chart_items: state.chart
  };
};

function mapDispatchToProps(dispatch) {
  //react-redux 注入 actions 到 this.props
  // 不需要store.dispatch, 解耦store
  return {
    goodsIndexChanged: bindActionCreators(goodsIndexChanged, dispatch),
    addChart: bindActionCreators(addChart, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods);