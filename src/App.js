import React, { Component } from 'react';
import './App.css';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WingBlank>
          <Button type="primary">primary</Button><WhiteSpace />
          <Button type="primary" disabled>primary disabled</Button><WhiteSpace />

          <Button type="warning">warning</Button><WhiteSpace />
          <Button type="warning" disabled>warning disabled</Button><WhiteSpace />

          <Button loading>loading button</Button><WhiteSpace />
          <Button icon="check-circle-o">with icon</Button><WhiteSpace />
          <Button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt="" />}>with custom icon</Button><WhiteSpace />

        </WingBlank>
      </div>
    );
  }
}

export default App;
