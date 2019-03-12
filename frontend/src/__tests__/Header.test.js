import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Header from '../components/Header';
import { configureStore } from '../store/configureStore';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
const store = configureStore();
const history = createMemoryHistory();
const server = new WebSocket("ws://localhost:8889");
afterEach(() => {
    cleanup();
});
test('<Header />', async () => {
    const { debug, getByTestId, queryByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
                <Header history={history} />
            </MemoryRouter>
        </Provider>);
    await server.connected;
    console.log('websocket connected');
    const homeLink = getByTestId('home-link');
    const priceBtn = getByTestId('price-btn');
    expect(homeLink).toBeTruthy();
    expect(priceBtn).toBeTruthy();
    fireEvent.click(priceBtn);
    expect(priceBtn.innerHTML).toBe('View Decimal Prices');
    fireEvent.click(priceBtn);
    expect(priceBtn.innerHTML).toBe('View Fractional Prices');
    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
    debug();
});