import { combineReducers } from 'redux';
import liveEvents from './liveEvents';
import events from './events';
import markets from './markets';
import outcomes from './outcomes';
import {isDecimal} from './prefs';
import webSocket from './webSocket';
import betSlip from './betSlip';
export default combineReducers({
    liveEvents,
    events,
    markets,
    outcomes,
    isDecimal,
    webSocket,
    betSlip
});
