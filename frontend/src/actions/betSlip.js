import { ADD_BET, DELETE_BETS } from '../constants/actionTypes';

export const addBet = (bet) => {
    return {
        type: ADD_BET,
        bet
    }
}

export const deleteBets = (betIds = []) => {
    return {
        type: DELETE_BETS,
        betIds
    }
}