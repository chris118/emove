import React, {Component} from 'react';
import './index.css';
import {List, Flex} from 'antd-mobile';
import GoodsList from './GoodsList';

const Item = List.Item;

class Home extends Component {

  render() {
    const numbers = [1, 2, 3, 4, 5, ,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    const listItems = numbers.map((number) =>
      <Item key={number.toString()}  align='middle'>
        {number}
      </Item>
    );

    return (
      <div className="Container">
        <div className="Left">
          <List className="flex-item">
            { listItems }
          </List>
        </div>
        <div className="Right">
          <GoodsList/>
        </div>
      </div>
    );
  }
}

export default Home;