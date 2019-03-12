import React from 'react';
import { render, waitForElement, debug, fireEvent, cleanup } from 'react-testing-library';
import { eventData, markets } from '../mockData';
import EventDetail from '../components/EventDetail';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
const history = createMemoryHistory();
afterEach(() => {
    cleanup();
});

const mockStore = configureMockStore();

let state = {
    events: eventData,
    markets,
    webSocket: {
        isOpen: false
    }
};

let store = mockStore(state);

test('<EventDetail /> renders the correct number of markets', async () => {
    const { debug, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/event/${eventData[0].eventId}`]}>
            <Route exact path={'/event/:eventId'} component={EventDetail} />
            </MemoryRouter>
        </Provider>);
    const server = new WebSocket("ws://localhost:8889");
    await server.connected;
    debug();
   await waitForElement(() => getByTestId(`accordion`));
   const backLink = getByTestId('back-link')
   expect(getAllByTestId('accordion').length).toBe(markets.length);
   fireEvent.click(backLink);
   expect(history.location.pathname).toBe('/');
});


