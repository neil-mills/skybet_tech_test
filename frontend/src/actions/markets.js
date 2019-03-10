import { DELETE_MARKETS } from '../constants/actionTypes';

export const deleteMarkets = (marketIds = []) => {
    return {
        type: DELETE_MARKETS,
        marketIds
    }
}