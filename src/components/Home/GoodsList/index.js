import React, {Component} from 'react';
import {List, Stepper} from 'antd-mobile';
import styled from 'styled-components';
import './index.css';

const Item = List.Item;

const data = [
  {
    id: 0,
    title: 'Header',
    type: 1
  }
];

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? 'grey' : 'white'};
  `

class GoodsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    for(var i = 1; i <= 50; i ++){
      data.push({
        id: 1,
        title: i,
        type: 0
      })
    }
  }

  render() {
    const listItems = data.map((item) =>
      <StyledItem type={item.type} key={item.id}
        wrap
        extra={
          <Stepper
            showNumber
            max={100}
            min={1}
          />}
      >
        {item.title}
      </StyledItem>
    );

    return (
      <List className="flex-item">
        { listItems }
      </List>
    );
  }
}

export default GoodsList;