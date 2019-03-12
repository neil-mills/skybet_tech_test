import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { sendRequest } from '../actions/webSocket';
import PropTypes from 'prop-types';
import { addBet } from '../actions/betSlip';
import { deleteOutcomes } from '../actions/outcomes';
import styled, { css } from "styled-components";
import { formatPrice } from '../utils';


const column = css`
    display: block;
    padding: 15px;
`;
const Outcome = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    border-bottom: 1px solid ${props => props.theme.sbMdBlue};
    background-color: ${props => props.theme.white};
    font-weight: normal;
    color: ${props => props.theme.sbDkBlue};
`;
const OutcomeColumn = styled.span`
   ${column}
`;
const OutcomeLink = styled.a`
    ${column}
    border-left: 1px solid ${props => props.theme.sbMdBlue};
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.sbYellow};
    }
    color: ${props => props.theme.sbDkBlue};
`;
class EventMarketOutcomes extends Component {
    state = {
        marketOutcomes: []
    };
    static propTypes = {
        outcomes: PropTypes.array,
        event: PropTypes.object.isRequired,
        market: PropTypes.object.isRequired,
        primaryMarket: PropTypes.bool,
    };
    static defaultProps = {
        primaryMarket: false,
        outcomes: []
    };
    componentDidMount() {
        const { webSocketIsOpen } = this.props;
        const { outcomes: marketOutcomes = [] } = this.props.market;
        if (marketOutcomes.length && webSocketIsOpen) {
         const request = marketOutcomes.map(id => ({ type: 'getOutcome', id }));
         sendRequest(request);
        };
    };
    componentWillUnmount() {
        const { outcomes } = this.props.market;
        this.props.deleteOutcomes(outcomes);
    };
    handleOutcomeClick = (e, outcomeId) => {
        const { event, outcomes, market } = this.props;
        const outcome = outcomes.find(o => o.outcomeId === outcomeId)
        e.preventDefault();
        this.props.addBet({ id: outcome.outcomeId, event, market, outcome });
    }
    renderOutcome = (outcome, i) => {
        const { outcomeId, name, price } = outcome;
        const { isDecimal } = this.props;
        return (
            <Outcome
                className="outcome"
                key={outcomeId}
                onClick={(e) => this.handleOutcomeClick(e, outcome.outcomeId)}
                data-testid={`outcome-item`}
            >
                <OutcomeColumn className="outcome__name">{name}</OutcomeColumn>
                <OutcomeLink className="outcome__price"  data-testid={`outcome-price-${i}`}>{formatPrice(price, isDecimal)}</OutcomeLink>
            </Outcome>
        )
    }
    render() {
        //let { marketOutcomes } = this.state;
        const { primaryMarket, outcomes, market, isDecimal } = this.props;
        const displayableOutcomes = outcomes.filter(outcome => outcome.status.displayable);
        let marketOutcomes = displayableOutcomes.filter(outcome => market.outcomes.includes(outcome.outcomeId));
        if (marketOutcomes.length) {
            marketOutcomes = primaryMarket ? marketOutcomes.slice(0, 3) : marketOutcomes;
            marketOutcomes.sort((a, b) => a.displayOrder - b.displayOrder);
        }
        return (
            <Fragment>
                {marketOutcomes.length > 0 &&
                    <div className="event-market-outcomes">
                {marketOutcomes.length > 0 &&
                    marketOutcomes.map((outcome, i) => this.renderOutcome(outcome, i))
                }
            </div>
                }
            </Fragment>
        )
    }
}
const mapStateToProps = ({ outcomes, webSocket, isDecimal }) => {
    const { isOpen: webSocketIsOpen } = webSocket;
    return {
        outcomes,
        webSocketIsOpen,
        isDecimal
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addBet: (bet) => dispatch(addBet(bet)),
        deleteOutcomes: (outcomes) => dispatch(deleteOutcomes(outcomes))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventMarketOutcomes);
