import 'dayjs/locale/nb';

import './index.less';

import * as dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import DemoWrapper from './mock/DemoWrapper';
import env from './utils/environment';

dayjs.locale('nb');

const REDIRECT_ETTER_LOGIN = window.localStorage.getItem('REDIRECT_ETTER_LOGIN');
if (REDIRECT_ETTER_LOGIN) {
    // Fjerner slik at den ikke skal gå i loop
    window.localStorage.removeItem('REDIRECT_ETTER_LOGIN');
    window.location.href = REDIRECT_ETTER_LOGIN;
}

if (env.isDevelopment || env.isRunningOnHeroku) {
    require('./mock/mock');
    ReactDOM.render(<p>Hello wolrd </p>, document.getElementById('root'));
} else {
    ReactDOM.render(<p>Hello world</p>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
