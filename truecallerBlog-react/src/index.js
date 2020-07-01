import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createGlobalStyle } from 'styled-components'
import ResponsiveContextProvider from './context/ResponsiveContext';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    // height: auto;
    background: #c3cfe2;  /* fallback for old browsers */
    background: linear-gradient(63.55deg, #ecf0f2 18.89%, #c6d3ea 115.55%);
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    padding: 0px;
    margin: 0px;
    font-size: 16px;
    letter-spacing: 0.1em;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ResponsiveContextProvider>
        <GlobalStyle />
        <App />
    </ResponsiveContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
