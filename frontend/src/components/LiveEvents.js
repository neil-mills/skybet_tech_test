import React, { Component, Fragment } from 'react';
import { deleteLiveEvents } from '../actions/liveEvents';
import { deleteMarkets } from '../actions/markets';
import { deleteOutcomes } from '../actions/outcomes';
import { connect } from 'react-redux';
import { sendRequest } from '../actions/webSocket';
import styled from "styled-components";
import EventMarket from './EventMarket';
import Accordion from './Accordion';
import { withRouter } from 'react-router-dom';
import EventMarketOutcomes from './EventMarketOutcomes';
import PropTypes from 'prop-types';

let EventFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
    background-color: ${props => props.theme.sbLtBlue};
    font-weight: normal;
    color: ${props => props.theme.sbDkBlue};
`;
let TypeTitle = styled.div`
    display: block;
    padding: 15px 11px;
    background-color: ${props => props.theme.white};
    border-bottom: 1px solid  ${props => props.theme.sbMdBlue};
    margin-bottom: 4px;
    color: ${props => props.theme.sbDkBlue};
`;
let MarketTitle = styled.div`
    display: block;
    border-bottom: 1px solid ${props => props.theme.sbMdBlue};
    padding: 15px;
    background-color: ${props => props.theme.sbLtBlue};
    font-weight: normal;
    color: ${props => props.theme.sbDkBlue};
`;
class LiveEvents extends Component {
    state = {
        liveFootballEvents: [],
    };
    static propsTypes = {
        liveEvents: PropTypes.array.isRequired
    };
    static defaultProps = {
        markets: null
    };
    componentDidMount() {
        const { webSocketIsOpen } = this.props;
        if (webSocketIsOpen) {
            this.getLiveEvents();
        };
    };
    componentDidUpdate = (prevProps) => {
        const { webSocketIsOpen, liveEvents } = this.props;
        if (!prevProps.webSocketIsOpen && webSocketIsOpen) {
            this.getLiveEvents();
        }
        if (JSON.stringify(prevProps.liveEvents) !== JSON.stringify(liveEvents)) {
            const liveFootballEvents = liveEvents
                .filter(event => event.className === 'Football' && event.status.displayable)
            const keys = liveFootballEvents.map(event => `e.${event.eventId}`);
            if (webSocketIsOpen) {
                const subscription = { type: 'subscribe', keys, clearSubscription: true };
                sendRequest([subscription]);
            }
            this.setState({ liveFootballEvents });
        };
    };
    componentWillUnmount() {
        const { webSocketIsOpen } = this.props;
        this.props.deleteLiveEvents();
        this.props.deleteMarkets();
        this.props.deleteOutcomes();
        if (webSocketIsOpen) {
            sendRequest([{ type: 'unsubscribe' }]);
        }
    };
    getLiveEvents = () => {
        sendRequest([{ type: "getLiveEvents", primaryMarkets: true }]);
    };
    handleViewAllMarkets = (e, eventId) => {
        e.preventDefault();
        this.props.history.push(`/event/${eventId}`)
    }
    render() {
        const { liveEvents } = this.props;
        const liveFootballEvents = liveEvents
            .filter(event => event.className === 'Football' && event.status.displayable)
            .sort((a, b) => a.displayOrder - b.displayOrder);
        return (
            <Fragment>
                <TypeTitle className="type-title">
                    <h1 className="type-title__text">Football Live</h1>
                    {liveEvents.length}
                </TypeTitle>
                {liveFootballEvents.map((event, i) => (
                    <Accordion
                        isOpen={i < 5 ? true : false}
                        className="event"
                        title={event.name}
                        key={event.eventId}
                    >
                        {i < 5 &&
                            <Fragment>
                                <EventMarket
                                    event={event}
                                    marketId={event.markets[0]}
                                    render={(market = null) => {
                                        if (market) {
                                            return (
                                                <Fragment>
                                                    <MarketTitle data-testid={`market-title-${i}`}>{market.name}</MarketTitle>
                                                    <EventMarketOutcomes
                                                        market={market}
                                                        event={event}
                                                        primaryMarket={true}
                                                    />
                                                </Fragment>
                                            )
                                        }
                                    }
                                    }
                                />
                                <EventFooter><a onClick={(e) => this.handleViewAllMarkets(e, event.eventId)}>View all markets</a></EventFooter>
                            </Fragment>
                        }
                    </Accordion>
                ))}
            </Fragment>
        )
    }
}
const mapStateToProps = ({ liveEvents, webSocket }) => {
    const { isOpen: webSocketIsOpen } = webSocket;
    return {
        liveEvents,
        webSocketIsOpen
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        deleteLiveEvents: () => dispatch(deleteLiveEvents()),
        deleteMarkets: () => dispatch(deleteMarkets()),
        deleteOutcomes: () => dispatch(deleteOutcomes()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LiveEvents));

