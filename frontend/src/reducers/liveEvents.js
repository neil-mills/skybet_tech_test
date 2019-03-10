import { LIVE_EVENTS_DATA, DELETE_LIVE_EVENTS } from '../constants/actionTypes';
const initialState = [];
function events (state = initialState, action) {
    switch (action.type) {
        case LIVE_EVENTS_DATA:
            return [
                ...state,
                ...action.data
            ]
        case DELETE_LIVE_EVENTS:
            return initialState;
        default:
            return state
    }
};

export default events;
