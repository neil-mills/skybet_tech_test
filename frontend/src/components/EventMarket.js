import React, { Component, Fragment } from 'react'
import { sendRequest } from '../actions/webSocket';
import { deleteMarkets } from '../actions/markets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EventMarket extends Component {
    state = {
        market: null
    };
    static propTypes = {
        event: PropTypes.object.isRequired,
        marketId: PropTypes.number.isRequired,
        markets: PropTypes.array.isRequired,
        primaryMarket: PropTypes.bool,
        webSocketIsOpen: PropTypes.bool,
        render: PropTypes.func.isRequired,
    };
    static defaultProps = {
        webSocketIsOpen: false,
        primaryMarket: false,
    };
    componentDidMount() {
        const { marketId: id, webSocketIsOpen } = this.props;
        if(webSocketIsOpen) {
            sendRequest([{ type: 'getMarket', id }]);
        }
    };
    componentWillUnmount() {
        const { marketId } = this.props;
        this.props.deleteMarkets([marketId]);
    };
    render = () => {
       // const { market } = this.state;
       const displayableMarkets = this.props.markets.filter(market => market.status.displayable);
        const market = displayableMarkets.find(market => market.marketId === this.props.marketId) || null;
        return (
            <Fragment>
            {this.props.render(market)}
            </Fragment>
        );
    }
}
const mapStateToProps = ({ markets, webSocket }) => {
    const { isOpen: webSocketIsOpen } = webSocket;
    return {
        markets,
        webSocketIsOpen
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        deleteMarkets: (markets) => dispatch(deleteMarkets(markets)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMarket)
