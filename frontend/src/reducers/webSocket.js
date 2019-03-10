import { ERROR, WEBSOCKET_IS_OPEN } from '../constants/actionTypes';
const initialState = {
    isOpen: false,
    errors: []
};
function webSocket(state = initialState, action) {
    switch (action.type) {
        case WEBSOCKET_IS_OPEN:
            return {
                ...state,
                isOpen: action.bool
            }
        case ERROR:
            return {
                ...state,
                errors: [...state.errors, action.error]
            }
        default:
            return state
    }
}
export default webSocket;

