import React, {Component} from 'react';
import {List} from 'antd-mobile';
import styled from 'styled-components';
import IndexStepper from '../../Common/Stepper/index'
import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? '#F2F2F2' : 'white'};
  `
class GoodsList extends Component {
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