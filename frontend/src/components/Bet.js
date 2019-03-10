import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { formatPrice } from '../utils';
import { connect } from 'react-redux';
import { ReactComponent as Crosshair } from '../images/crosshair.svg';
import { deleteBets } from '../actions/betSlip';

const BetCard = styled.div`
    display: block;
    border-bottom: 1px solid ${props => props.theme.sbMdBlue};
    padding: 18px 15px 15px;
    position: relative;
    color: ${props => props.theme.sbDkBlue};
    background-color: ${props => props.theme.sbLtBlue};
    &:last-child {
      border: none;
    }
`;
const Price = styled.h4`
  margin: 0;
  `;
const Text = styled.p`
  font-size: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Close = styled.a`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 8px;
  right: 8px;
  fill: ${props => props.theme.sbBlue};
  `;
class Bet extends Component {
  static propTypes = {
    bet: PropTypes.object.isRequired
  }
  handleDeleteBet = (e) => {
    const { id } = this.props.bet;
    this.props.deleteBets([id]);
  };
  render() {
    const { bet, isDecimal } = this.props;
    const { name: eventName } = bet.event;
    const { name: marketName } = bet.market;
    const { name: outcomeName, price } = bet.outcome;
    return (
      <BetCard className="bet">
        <Close onClick={this.handleDeleteBet}><Crosshair /></Close>
        <Price>{outcomeName} @ {formatPrice(price, isDecimal)}</Price>
        <Text>{marketName}</Text>
        <Text>{eventName}</Text>
      </BetCard>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteBets: (id) => dispatch(deleteBets(id))
  }
}
const mapStateToProps = ({ isDecimal }) => {
  return {
    isDecimal
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Bet);
