import React, {Component} from 'react';
import {List, Stepper} from 'antd-mobile';
import styled from 'styled-components';
import IndexStepper from './index-stepper'
import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? 'grey' : 'white'};
  `
class GoodsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.data.map((item, index) =>
      {
        if(item.type === 0 ){
        return <StyledItem type={item.type} key={index}
                      extra={
                        <IndexStepper/>}>
            {item.title}
          </StyledItem>
        }else{ //header
          return <StyledItem type={item.type} key={index}>
            {item.title}
          </StyledItem>
        }
      }
    );

    return (
      <List className="flex-item">
        { listItems }
      </List>
    );
  }
}

export default GoodsList;