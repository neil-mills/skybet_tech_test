import { DELETE_EVENTS } from '../constants/actionTypes';

export const deleteEvents = (eventIds = []) => {
    return {
        type: DELETE_EVENTS,
        eventIds
    }
}