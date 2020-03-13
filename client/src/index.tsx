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

if (env.isDevelopment || env.isRunningOnHeroku) {
    ReactDOM.render(<DemoWrapper />, document.getElementById('root'));
} else {
    ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
