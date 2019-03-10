import { OUTCOME_DATA, OUTCOME_STATUS, PRICE_CHANGE, DELETE_OUTCOMES } from '../constants/actionTypes';
function outcomes(state = [], action) {
    let outcomeId;
    let price;
    let status;
    let outcome;
    switch (action.type) {
        case OUTCOME_DATA:
            ({ outcomeId } = action.data);
            return [
                ...state.filter(o => o.outcomeId !== outcomeId),
                action.data
            ];
        case PRICE_CHANGE:
            ({ outcomeId, price } = action.data);
            outcome = state.find(o => o.outcomeId === outcomeId);
            return outcome ? [...state.filter(outcome => outcome.outcomeId !== outcomeId), { ...outcome, price }] : state;
        case OUTCOME_STATUS:
            ({ outcomeId, status } = action.data);
            outcome = state.find(outcome => outcome.outcomeId === outcomeId);
            return outcome ? [...state.filter(outcome => outcome.outcomeId !== outcomeId), { ...outcome, status }] : state;
        case DELETE_OUTCOMES:
            return action.outcomeIds.length ? [...state.filter(outcome => !action.outcomeIds.includes(outcome.outcomeId))] : [];
        default:
            return state;
    }
};
export default outcomes;