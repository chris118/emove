import React, {Component} from 'react';
import { Steps, WingBlank, WhiteSpace } from 'antd-mobile';
import Goods from '../Goods'
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
          <Goods/>
        </div>
      </div>
    );
  }
}
export default Home;