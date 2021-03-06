import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoodsList from './GoodsList';
import CategoryList from './CategoryList'
import {goodsIndexChanged, addChart} from '../../actions/actions'
import Cart from './Cart'
import CartGoods from './CartGoods'
import Modal from '../Common/Modal';
import {Get} from '../../service'

import './index.css';

class Goods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_category: [],
      second_category: [],
      all_goods: [],
      cart_goods: [],
      isOpen: false,
      category_height_list: [],
      selected_index: 0,
    };
  }

  componentWillMount() {
    this.loadData();
  }

  componentDidMount() {
    //滚动事件
    let that = this
    this.rightDiv.addEventListener('scroll', () => {
      //滚动到的类别index
      var index = 0;
      let total_height = 0;
      for(let i = 0; i < that.state.category_height_list.length; i++) {
        total_height += that.state.category_height_list[i]
        if(this.rightDiv.scrollTop >= total_height){
          index = i+1;
        }
      }

      let { goodsIndexChanged } = that.props;
      goodsIndexChanged(index)
    });
  }

  componentWillReceiveProps(nextProps){
    //点击左侧类别列表，自动滚动到指定位置
    if(nextProps.selected_index !== this.state.selected_index){
      this.autoScroll(nextProps.selected_index)
      this.setState({
        selected_index: nextProps.selected_index
      })
    }
  }

  loadData() {
    let that = this
    Get("/cart/goods", {} )
      .then(function (res) {
        console.log(res)
        const {first_category, second_category, all_goods, cart_goods} = res.result;
        that.setState({
          first_category: first_category,
          second_category: second_category,
          all_goods: all_goods,
          cart_goods: cart_goods
        })

        //初始化购物车
        let { addChart } = that.props;
        cart_goods.forEach((item) => {
          addChart(item)
        })

        //初始化高度列表
        let category_height_list = []
        for(let i = 0; i < second_category.length; i++){
          const {category_id} = second_category[i]
          let sub_item_count = 0
          for(let i = 0; i < all_goods.length; i++) {
            const {parent_category_id} = all_goods[i]
            if(category_id === parent_category_id){
              sub_item_count++;
            }
          }
          category_height_list.push(44*(sub_item_count + 1))
        }

        that.setState({
          category_height_list: category_height_list
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  onPrevious = (event) => {
    this.props.history.goBack()
  }

  onNext = (event) => {
    this.props.history.push('/infoex')
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
  }

  autoScroll = (index)=> {
    let total_height = 0;
    for(let i = 0; i < index; i++) {
      total_height += this.state.category_height_list[i]
    }
    this.rightDiv.scrollTop = total_height
  }

  render() {
    return (
      <div className="goods-root">
        <div className="goods-content">
          <div className="left" ref={(left) => { this.leftDiv = left; }}>
            <CategoryList data={ {first_category: this.state.first_category,
                                  second_category: this.state.second_category}}/>
          </div>
          <div className="right" ref={(right) => { this.rightDiv = right; }}>
            <GoodsList  data={{all_goods: this.state.all_goods,
                                second_category: this.state.second_category}}/>
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