import { ADD_BET, DELETE_BETS } from '../constants/actionTypes';

function betSlip (state = [], action) {
    switch (action.type) {
        case ADD_BET:
        console.log('action.bet.outcomeId', action.bet.id);
            return [
                ...state.filter(bet => bet.id !== action.bet.id),
              
                action.bet
            ]
        case DELETE_BETS:
            return action.betIds.length ? [ ...state.filter(bet => !action.betIds.includes(bet.id))] : [];
        default:
            return state
    }
};
export default betSlip;