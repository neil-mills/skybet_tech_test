import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { sendRequest } from '../actions/webSocket';
import Accordion from './Accordion';
import EventMarketOutcomes from './EventMarketOutcomes';
import { connect } from 'react-redux';
import EventMarket from './EventMarket';
import { deleteEvents } from '../actions/events';
import { deleteMarkets } from '../actions/markets';
import { deleteOutcomes } from '../actions/outcomes';
import styled from "styled-components";
import moment from 'moment';

const Scoreboard = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: ${props => props.theme.sbDkBlue};
    color: ${props => props.theme.white};
    padding: 15px;
    text-align: center;
    font-size: 12px;
`;
const Header = styled.div`
    border: 1px solid ${props => props.theme.sbMdBlue};
    padding: 15px;
    background-color: ${props => props.theme.sbLtBlue};
    color: ${props => props.theme.sbDkBlue};
    margin-bottom: 4px;
    `;
let TypeTitle = styled.div`
display: block;
padding: 15px 11px;
background-color: ${props => props.theme.white};
border-bottom: 1px solid  ${props => props.theme.sbMdBlue};
margin-bottom: 4px;
color: ${props => props.theme.sbDkBlue};
`;
class EventDetail extends Component {
    state = {
        event: null,
        eventId: [],
    };
    componentDidMount() {
        const { webSocketIsOpen } = this.props;
        const eventId = this.props.match.params.eventId || null;
        if (webSocketIsOpen && eventId) this.getEvent(eventId);
        this.setState({ eventId });
    };
    componentWillUnmount() {
        this.props.deleteEvents();
        this.props.deleteMarkets();
        this.props.deleteOutcomes();
        sendRequest([{ type: 'unsubscribe' }]);
    };
    componentDidUpdate = (prevProps) => {
        const { events, webSocketIsOpen } = this.props;
        const { eventId } = this.state;
        if (!prevProps.webSocketIsOpen && webSocketIsOpen && !events.length && eventId) {
            this.getEvent(eventId);
        };
        if (JSON.stringify(prevProps.events) !== JSON.stringify(this.props.events)) {
            const event = this.props.events.find(event => event.eventId == eventId);
            this.setState({ event });
        }
    }
    getEvent = (eventId) => {
        sendRequest([
            { type: 'getEvent', id: Number(eventId) },
            { type: 'subscribe', keys: [`e.${eventId}`] }
        ]);
    };
    handleBackClick = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    };
    renderScoreboard = () => {
        const { event } = this.state;
        const { name, competitors, linkedEventTypeName, scores, startTime, status, typeName } = event;
        let elapsedTime = moment(startTime).diff(moment())
        const time = moment(elapsedTime).format('mm');
        console.log('time', time);
        return (
            <Scoreboard className="scoreboard">
                <p className="scoreboard__clock">{`${time}'`}</p>
                <h1>{name}</h1>
                <p>{linkedEventTypeName}</p>

            </Scoreboard>
        )
    };
    render() {
        const { event } = this.state;
        return (
            <Fragment>
                {event &&
                    <div className="event-page">
                        <Header className="event-page-header">
                            <a onClick={this.handleBackClick}>Back</a>
                        </Header>
                        {this.renderScoreboard()}
                        <TypeTitle>
                            <h3>Markets</h3>
                        </TypeTitle>
                        <Fragment>
                            {event.markets.length &&
                                event.markets.slice(0, 10).map((id, i) => (
                                    <EventMarket
                                        marketId={id}
                                        event={event}
                                        key={i}
                                        render={(market = null) => {
                                            console.log('market', market);
                                            if (market) {
                                                return (
                                                    <Accordion isOpen={i < 2 ? true : false} key={market.marketId} className="event" title={market.name}>
                                                        <EventMarketOutcomes
                                                            market={market}
                                                            event={event}
                                                        />
                                                    </Accordion>
                                                )
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Fragment>
                    </div>
                }
            </Fragment>
        )
    }
}
const mapStateToProps = ({ events, webSocket }) => {
    const { isOpen: webSocketIsOpen, errors } = webSocket;
    return {
        events,
        webSocketIsOpen,
        errors
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        deleteEvents: () => dispatch(deleteEvents()),
        deleteMarkets: () => dispatch(deleteMarkets()),
        deleteOutcomes: () => dispatch(deleteOutcomes()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetail));
