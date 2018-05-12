import React, {Component} from 'react';
import {Checkbox, Icon} from 'antd-mobile';

import './index.css';

class VehicleItem extends Component {
  render() {
    return (
      <div className="vehicle-item-root">
        <div className="top">
          <div className="top-left">
            <img className="item-icon" src="http://www.w3school.com.cn/i/eg_tulip.jpg"/>
          </div>
          <div className="top-center">
            <div className="vehicle-name">上海蚂蚁搬厂车队</div>
            <div className="vehicle-info">
              <ul class="vehicle-star">
                <li>&#9733;</li>
                <li>&#9733;</li>
                <li>&#9733;</li>
                <li>&#9733;</li>
                <li>&#9733;</li>
              </ul>
              <div>(225次点评)</div>
            </div>
            <div className="vehicle-info">嘉定区, 距离您7.5km</div>
          </div>
          <div className="top-right">
            <Checkbox className="vehicle-check" />
            <div className="vehicle-time">2018-5-12仅剩车次3</div>
          </div>
        </div>
        <div className="bottom">
          <div className="vehicle-h">惠</div>
          <div className="vehicle-i">参与砍价活动, 该车队最低可砍至2折</div>
        </div>
      </div>
    );
  }
}

export default VehicleItem;