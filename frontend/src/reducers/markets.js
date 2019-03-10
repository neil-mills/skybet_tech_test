import { MARKET_DATA, MARKET_STATUS, DELETE_MARKETS } from '../constants/actionTypes';
function markets (state = [], action) {
    let marketId;
    let market;
    let status;
    switch (action.type) {
        case MARKET_DATA:
        ({ marketId } = action.data);
            return [
                ...state.filter(market => market.marketId !== marketId),
                action.data
            ]
        case MARKET_STATUS:
            ({ marketId, status } = action.data);
            market = state.find(market => market.marketId === marketId);
            state = market ? [ ...state.filter(market => market.marketId !== marketId), { ...market, status }] : state;
            return state;
        case DELETE_MARKETS:
            return action.marketIds.length ? [ ...state.filter(market => !action.marketIds.includes(market.marketId))] : [];
        default:
            return state
    }
};
export default markets;