import React from 'react';
import { render, waitForElement, debug, cleanup } from 'react-testing-library';
import { liveEventsData, markets } from '../mockData';
import LiveEvents from '../components/LiveEvents';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
});

const mockStore = configureMockStore();

let state = {
    liveEvents: liveEventsData,
    markets,
    webSocket: {
        isOpen: false
    }
};

let store = mockStore(state);

test('<LiveEvents /> renders 2 events with displayed = true', async () => {
    const { debug, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                <LiveEvents markets={markets} webSocketIsOpen={false} />
            </MemoryRouter>
        </Provider>);
    const server = new WebSocket("ws://localhost:8889");
    await server.connected;
    await waitForElement(() => getByTestId(`market-title-1`));
    expect(getAllByTestId('accordion').length).toBe(liveEventsData.length)
    //debug();
});

test('<LiveEvents /> renders 1 event with displayed = true', async () => {
    state = {
        ...state,
        liveEvents: [
            state.liveEvents[0],
            { ...state.liveEvents[1], status: { displayable: false } }
        ],
    };
    store = mockStore(state);
    const { debug, getByTestId, getAllByTestId } = render(
        <Provider store={store} >
            <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                <LiveEvents markets={markets} webSocketIsOpen={false} />
            </MemoryRouter>
        </Provider>);
    const server = new WebSocket("ws://localhost:8889");
    await server.connected;
    await waitForElement(() => getByTestId('market-title-0'));
    expect(getAllByTestId('accordion').length).toBe(1)
    //debug();
});


