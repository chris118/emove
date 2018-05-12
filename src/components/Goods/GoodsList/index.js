import React, {Component} from 'react';
import {List} from 'antd-mobile';
import styled from 'styled-components';
import IndexStepper from '../../Common/Stepper/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {addChart} from '../../../actions/actions'

import './index.css';

const Item = List.Item;

const StyledItem = styled(Item) `
    background: ${props => props.type === 1 ? '#F2F2F2' : 'white'};
  `
class GoodsList extends Component {

  updateDataWithChart = () => {
    this.props.data.map((item) => {
      this.props.chart_items.forEach((char_item) => {
        // console.log(char_item)
        // console.log(item)
        if(char_item.id === item.id){
          let newItem = Object.assign(item, {number: char_item.number})
          return newItem
        }
      })
    })
  }

  numberChanged = (number, item) => {
    let newItem = Object.assign(item, {number: number})
    // console.log("newItem", newItem)
    this.props.numberChanged(newItem)
    // let { addChart } = this.props;
    // addChart(newItem)
  }

  render() {
    this.updateDataWithChart()
    // console.log(this.props.data)

    const listItems = this.props.data.map((item, index) =>
      {
        if(item.type === 0 ){
        return <StyledItem type={item.type} key={index}
                      extra={
                        <IndexStepper number={item.number} numberChanged={(number) => this.numberChanged(number, item)}/>}>
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

const mapStateToProps = (state) => {
  return {
    chart_items: state.chart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChart: bindActionCreators(addChart, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);
