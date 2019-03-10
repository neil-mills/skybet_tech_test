import { IS_DECIMAL } from '../constants/actionTypes';

export const updatePriceFormat = (bool) => {
    return {
        type: IS_DECIMAL,
       bool
    }
}