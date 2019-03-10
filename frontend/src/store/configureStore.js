import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import { initWebSocket, sendRequest } from '../actions/webSocket';
const middleware = [thunkMiddleware.withExtraArgument({ sendRequest })];

export const configureStore = () => {
    const store = createStore(
        reducers,
        compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
        )
    );
    initWebSocket(store); //initialize websocket listeners
    return store;
};
