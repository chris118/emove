import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import { Steps, WingBlank, WhiteSpace } from 'antd-mobile';
import Goods from '../Goods';
import Info from '../Info';
import InfoEx from '../InfoEx';

import './index.css';


const Step = Steps.Step;

const steps = [{
  title: '基本信息',
  description: '',
}, {
  title: '物品选择',
  description: '',
}, {
  title: '完成预约',
  description: '',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);


class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="steps">
          <Steps current={0} direction="horizontal" size="small">{steps}</Steps>
        </div>
        <div className="content">
          <Switch>
            <Route path={`${this.props.match.path}`} exact component={Info} />
            <Route path={`${this.props.match.path}/infoex`} exact component={InfoEx} />
            <Route path={`${this.props.match.path}/goods`} component={Goods} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Home;