import { IS_DECIMAL } from '../constants/actionTypes';
export function isDecimal(state = true, action) {
    console.log('action', action);
    switch (action.type) {
        case IS_DECIMAL:
            return action.bool
        default:
            return state
    }
};
