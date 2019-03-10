import React, { Component, Fragment } from 'react';
import EventMarket from '../components/EventMarket';
import { connect } from 'react-redux';
import { sendRequest } from '../actions/webSocket';
import PropTypes from 'prop-types';

class MarketsList extends Component {
    state = {
        filteredMarkets: []
    }
    static propTypes = {
        event: PropTypes.object.isRequired,
        show: PropTypes.number,
    }
    static defaultProps = {
        show: 10
    }
    componentDidMount() {
        this.getMarketsList();
    };
    getMarketsList = () => {
        const { event } = this.props;
        const { markets } = event;
        const request = markets.map(id => ({ type: 'getMarket', id }))
        sendRequest(request);
    };
    componentDidUpdate = (prevProps) => {
        if(JSON.stringify(prevProps.markets) !== JSON.stringify(this.props.markets)) {
            const filteredMarkets = this.props.markets.filter(market => market.status.displayable)
            this.setState({ filteredMarkets });
        }
    }
    render() {
        const { event, show } = this.props;
        const { filteredMarkets } = this.state;
        return (
            <Fragment>
                {filteredMarkets.length ?
                    <ul>
                        {filteredMarkets.slice(0, show).map(market => (
                            <EventMarket
                                event={event}
                                market={market}
                                key={market.marketId}
                            />
                        ))}
                    </ul>
                    :
                    <p>No markets available</p>
                }
            </Fragment>
        )
    }
}
const mapStateToProps = ({ markets, webSocket }) => {
    const { isOpen: webSocketIsOpen } = webSocket;
    return {
        markets,
        webSocketIsOpen
    }
};

export default connect(mapStateToProps, null)(MarketsList);