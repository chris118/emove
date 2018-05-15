import React, {Component} from 'react';
import {Checkbox} from 'antd-mobile';

import './index.css';

class VehicleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      discount: 0,
      distance_kilometer: 0,
      evaluate_count: 0,
      evaluate_star: 0,
      fleet_address: "",
      fleet_id: 0,
      fleet_name: "",
      fleet_telephone: "",
      order_count: 0,
      remainder: 0,
    };
  }

  componentDidMount() {
    this.setState({
      checked: this.props.checked,
      discount: this.props.data.discount,
      distance_kilometer: this.props.data.distance_kilometer,
      evaluate_count: this.props.data.evaluate_count,
      evaluate_star: this.props.data.evaluate_star,
      fleet_address: this.props.data.fleet_address,
      fleet_id: this.props.data.fleet_id,
      fleet_name: this.props.data.fleet_name,
      fleet_telephone: this.props.data.fleet_telephone,
      order_count: this.props.data.order_count,
      remainder: this.props.data.remainder,
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checked: nextProps.checked,
      discount: nextProps.data.discount,
      distance_kilometer: nextProps.data.distance_kilometer,
      evaluate_count: nextProps.data.evaluate_count,
      evaluate_star: nextProps.data.evaluate_star,
      fleet_address: nextProps.data.fleet_address,
      fleet_id: nextProps.data.fleet_id,
      fleet_name: nextProps.data.fleet_name,
      fleet_telephone: nextProps.data.fleet_telephone,
      order_count: nextProps.data.order_count,
      remainder: nextProps.data.remainder,
    })
  }

  itemClicked = () => {
    this.setState({
      checked: !this.state.checked,
    })

    this.props.onChecked(!this.state.checked)
  }

  render() {
    let stars = [];
    for(let i = 0; i < 5; i++){
      if(i < this.state.evaluate_star){
        let s =  <li key={i} style={{color: '#FDC02E'}}>&#9733;</li>
        stars.push(s)
      }else {
        let s =  <li key={i}>&#9733;</li>
        stars.push(s)
      }
    }
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
    return (
      <div className="vehicle-item-root" onClick={this.itemClicked}>
        <div className="top">
          <div className="top-left">
            <img className="item-icon" src="http://www.w3school.com.cn/i/eg_tulip.jpg" alt=""/>
          </div>
          <div className="top-center">
            <div className="vehicle-name">{this.state.fleet_name}</div>
            <div className="vehicle-info">
              <ul className="vehicle-star">
                {stars}
              </ul>
              <div>({this.state.evaluate_count}次点评)</div>
            </div>
            <div className="vehicle-info">{this.state.fleet_address}, 距离您{this.state.distance_kilometer}km</div>
          </div>
          <div className="top-right">
            <Checkbox className="vehicle-check" checked={this.state.checked}/>
            <div className="vehicle-time">{date}仅剩车次{this.state.order_count}</div>
          </div>
        </div>
        <div className="bottom">
          <div className="vehicle-h">惠</div>
          <div className="vehicle-i">参与砍价活动, 该车队最低可砍至{this.state.discount/10}折</div>
        </div>
      </div>
    );
  }
}

export default VehicleItem;