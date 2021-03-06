import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from "./store";
import {saveState} from "./localStorage";
import throttle from "lodash/throttle";

store.subscribe(throttle(() => {
    saveState({
        state: store.getState().search
    }, 'reducer')
}, 1000))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
