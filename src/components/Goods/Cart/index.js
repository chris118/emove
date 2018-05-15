import React, {Component} from 'react';
import {Badge} from 'antd-mobile';
import NaviBar from '../../Common/NaviBar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart, removeChart} from '../../../actions/actions'

import './index.css';

const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={type} /> {/* svg-sprite-loader@0.3.x */}
    {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@lastest */}
  </svg>
);

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      bulk: 5,
    };
  }

  componentWillMount() {
    this.updateUI(this.props.items)
  }

  componentWillReceiveProps(nextProps) {
    this.updateUI(nextProps.items)

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

  updateUI = (items) => {
    let number = 0
    items.forEach((item) => {
      number += item.goods_num
    })
    this.setState({
      number: number
    })

    let bulk = 0
    items.forEach((cart_item) => {
      bulk += cart_item.goods_cubage * cart_item.goods_num
    })

    this.setState({
      bulk: bulk.toFixed(1)
    })
  }

  render() {
    return (
      <div className="cart-root">
        <div className="cart-top">
          <span className="cart-number">
           <CustomIcon type={require('../../../static/images/cart.svg')} size="lg" onClick={this.onCartClick}/>
            <Badge text={this.state.number}  />
          </span>
          <div className="cart-info">您当前所选物体的总体积</div>
          <div className="cart-info-number">{this.state.bulk}</div>
          <div className="cart-info-number cart-info-number-second">m³</div>
        </div>
        <div className="cart-bottom">
          <NaviBar onPrevious={this.onPrevious} onNext={this.onNext}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state === reducer
  // console.log(state)
  return {
    items: state.chart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChart: bindActionCreators(addChart, dispatch),
    removeChart: bindActionCreators(removeChart, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// export default connect(mapStateToProps, null)(Cart);
