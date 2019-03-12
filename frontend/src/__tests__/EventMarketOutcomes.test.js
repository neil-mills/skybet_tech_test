import React from 'react';
import { render, waitForElement, debug, cleanup } from 'react-testing-library';
import EventMarketOutcomes from '../components/EventMarketOutcomes';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { outcomes } from '../mockData';

afterEach(() => {
    cleanup();
});

const outcomesProps = {
    event: {},
    market: {
        outcomes: [367530493, 367530494]
    },
};
let  state = {
    outcomes,
    webSocket: {
        isOpen: false
    },
    isDecimal: true,
    event: {},
    market: {
        outcomes: [367530493, 367530494]
    },
}
const mockStore = configureMockStore();
const server = new WebSocket("ws://localhost:8889");

test('<EventMarketOutcomes /> with isDecimal=true', async () => {
    const store = mockStore(state);
    const { debug, getByTestId } = render(
        <Provider store={store}>
            <EventMarketOutcomes {...outcomesProps} />
        </Provider>);
    await server.connected;
    const price = getByTestId('outcome-price-0');
    await waitForElement(() => price);
    const value = Number(price.innerHTML);
    expect(typeof (value)).toBe('number');
  // debug();
});

test('<EventMarketOutcomes /> with isDecimal=false', async () => {
    state = { ...state, isDecimal: false}
    const store = mockStore(state);
    const { debug, getByTestId } = render(
        <Provider store={store}>
            <EventMarketOutcomes isDecimal={false} {...outcomesProps} />
        </Provider>);
    await server.connected;
    const price = getByTestId('outcome-price-0');
    await waitForElement(() => price);
    const value = price.innerHTML;
    const hasSlash = value.includes('/');
    expect(hasSlash).toBe(true);
    // debug();
});

test('<EventMarketOutcomes /> renders correct number of displayable outcomes', async () => {
    state = {
        ...state,
        outcomes: [
            state.outcomes[0],
            { ...state.outcomes[1], status: { displayable: false}}
        ]
    };
    const store = mockStore(state);
    const { debug, getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <EventMarketOutcomes {...outcomesProps} />
        </Provider>);
    await server.connected;
    await waitForElement(() => getByTestId('outcome-item'));
    expect(getAllByTestId('outcome-item').length).toBe(1)
})