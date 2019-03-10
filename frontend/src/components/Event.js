import React, { Component, Fragment } from 'react';
import EventMarket from './EventMarket';
import PropTypes from 'prop-types';
import { sendRequest } from '../actions/webSocket';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class Event extends Component {
    state = {
        primaryMarketIsOpen: false,
        primaryMarketId: null,
        market: null
    };
    static defaultProps = {
        event: null
    };
    static propTypes = {
        event: PropTypes.object
    };
    componentDidMount() {
        const { event } = this.props;
        const primaryMarketId = event.markets[0];
        sendRequest([{ type: 'getMarket', id: primaryMarketId }])
        this.setState({ primaryMarketId });
    }
    componentDidUpdate = (prevProps) => {
        const { primaryMarketId } = this.state;
        if (JSON.stringify(prevProps.markets) !== JSON.stringify(this.props.markets)) {
            const market = this.props.markets.find(market => market.status.displayable && market.marketId === primaryMarketId);
            this.setState({ market });
        }
    }
    togglePrimaryMarket = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ primaryMarketIsOpen: !prevState.primaryMarketIsOpen }));
    };
    handleViewAllMarkets = (e) => {
        const { eventId } = this.props.event;
        e.preventDefault();
        this.props.history.push(`/event/${eventId}`)
    }
    render() {
        const { event } = this.props;
        const { primaryMarketIsOpen, primaryMarketId, market } = this.state
        const { scores, competitors } = event;
        const title = competitors.map(competitor => competitor.name).join(' vs ');
        const score = `${scores.home}-${scores.away}`;
        return (
            <Fragment>
                {event !== null &&
                    <li className="event">
                        <div className="event-heading">
                            <h4 className="event__title">{title}</h4>
                            <div className="event__score">{score}</div>
                            {market &&
                            <button className="toggle-btn" onClick={this.togglePrimaryMarket}>
                                {`${primaryMarketIsOpen ? `Hide` : `View`} primary market`}
                            </button>
                            }
                        </div>
                        {primaryMarketIsOpen &&
                            <EventMarket
                                primaryMarket={true}
                                event={event}
                                market={market}
                            />
                        }
                        <a className="more-btn" onClick={this.handleViewAllMarkets}>View all markets</a>
                    </li>
                }
            </Fragment>
        );
    };
};
const mapStateToProps = ({ markets, webSocket }) => {
    const { isOpen: webSocketIsOpen } = webSocket;
    return {
        markets,
        webSocketIsOpen
    }
};

export default withRouter(connect(mapStateToProps, null)(Event));
