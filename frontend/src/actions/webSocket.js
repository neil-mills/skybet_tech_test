import { url } from '../constants/webSocket';
import { WEBSOCKET_IS_OPEN } from '../constants/actionTypes';

const socket = new WebSocket(url);

export const initWebSocket = (store) => {
    socket.addEventListener('open', (e) => {
        store.dispatch({ type: WEBSOCKET_IS_OPEN, bool: true });
    });
    socket.addEventListener('close', (e) => {
        store.dispatch({ type: WEBSOCKET_IS_OPEN, bool: false });
    });
    socket.addEventListener('message', (e) => {
        const parsedData = JSON.parse(e.data);
        const { data, type } = parsedData;
        //   console.log('data', data);
        //  console.log('type', type);
        if (type === 'OUTCOME_DATA') {
            const { message } = data;
            console.log('data', data);
            console.log('message', message);
        }
        store.dispatch({ type, data }); //dispatch to reducer
    });
}
export const webSocketIsOpen = (bool) => {
    return {
        type: WEBSOCKET_IS_OPEN,
        bool
    }
}
export const sendRequest = (requests) => {
        requests = Array.isArray(requests) ? requests : [requests];
        // Subscribe to all updates for an event, by default previous subscriptions are discarded
        for (const request of requests) {
            socket.send(JSON.stringify(request));
        }
};