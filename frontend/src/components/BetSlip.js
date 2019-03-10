import React, { Component } from 'react'
import { connect } from 'react-redux';
import  Bet from './Bet';
import styled, {css} from "styled-components";

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.sbMdBlue};
`;
const Title = styled.div`
    display: block;
    padding: 15px;
    background-color: ${props => props.theme.sbDkBlue};
    color: ${props => props.theme.white};
`;
class BetSlip extends Component {
  render() {
    const { betSlip } = this.props;
    return (
        <div>
        <Title><h3>My Bet Slip</h3></Title>
        <Wrapper className="bet-slip">
        {betSlip.length > 0 &&
          betSlip.map((bet, i) => (
            <Bet key={i} bet={bet} />
          ))
        }
      </Wrapper>
      </div>
    )
  }
}
const mapStateToProps = ({ betSlip, webSocket }) => {
  const { isOpen: webSocketIsOpen } = webSocket;
  return {
      betSlip,
      webSocketIsOpen
  }
};

export default connect(mapStateToProps, null)(BetSlip);