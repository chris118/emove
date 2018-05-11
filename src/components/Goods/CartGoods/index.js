import React, {Component} from 'react';
import {List} from 'antd-mobile';
import Cart from '../Cart'
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart} from '../../../actions/actions'

import './index.css';
//测试数据
const Item = List.Item;

class CartGoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentWillMount() {
    this.setState({
      items: this.props.items
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    })
  }

  onPrevious = () => {
    this.props.onPrevious()
  }

  onNext = () => {
    this.props.onNext()
  }

  onCartClick = () => {
    this.props.onCartClick()
  }

  numberChanged = (number, item) => {
    let newItem = Object.assign(item, {number: number})

    let { addChart } = this.props;
    addChart(newItem)
  }


  render() {
    const listItems = this.state.items.map((item, index) =>
      {
        return <Item type={item.type} key={index}
                     extra={
                       <IndexStepper numberChanged={(number) => this.numberChanged(number, item)}/>}>
          {item.title}
        </Item>
      }
    );

    return (
      <div className="cartgoods-root">
        <div className="cartgoods-list">
          { listItems }
        </div>

        <Cart items={this.state.items} onPrevious={this.onPrevious} onNext={this.onNext} onCartClick={this.onCartClick}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state === reducer
  return {
    items: state.chart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChart: bindActionCreators(addChart, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartGoods);
