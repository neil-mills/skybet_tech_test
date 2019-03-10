import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux'
import { ThemeProvider, createGlobalStyle, css } from "styled-components";
import { theme } from "./theme";
let GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    font-family: sans-serif;
    margin: 0;
  }
  h1,h2,h3 {
      margin: 0;
      line-height: 1;
  }
  h1 {
      font-size: 25px;
  };
  h2 {
      font-size: 18px;
  };
  a {
    color: ${props => props.theme.sbBlue};
    cursor: pointer;
  }
`;
const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <>
                <Router history={history}>
                    <App />
                </Router>
                <GlobalStyle />
            </>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
