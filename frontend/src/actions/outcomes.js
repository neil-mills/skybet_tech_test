import { DELETE_OUTCOMES } from '../constants/actionTypes';

export const deleteOutcomes = (outcomeIds = []) => {
    return {
        type: DELETE_OUTCOMES,
        outcomeIds
    }
}