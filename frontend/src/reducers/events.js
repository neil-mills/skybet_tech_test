import { EVENT_DATA, DELETE_EVENTS } from '../constants/actionTypes';
function events(state = [], action) {
    let event;
    let eventId;
    switch (action.type) {
        case EVENT_DATA:
            ({ eventId } = action.data);
            event = state.find(e => e.eventId == eventId);
            return event ? [...state.filter(e => e.eventId !== eventId), action.data] : [...state, action.data];
            case DELETE_EVENTS:
            console.log('action.eventIds', action.eventIds);
            return action.eventIds.length ? [ ...state.filter(event => !action.eventIds.includes(event.eventId))] : [];
        default:
            return state
    }
};

export default events;
