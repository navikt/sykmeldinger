import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'reflect-metadata';
import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';

import App from './App';
import { setupLogger } from './utils/logger';
import env from './utils/env';

dayjs.locale('nb');

const runtimeEnvironment = env.RUNTIME_ENVIRONMENT;
if (runtimeEnvironment === 'development' || runtimeEnvironment === 'labs-demo') {
    require('./mock/mock');
}

setupLogger();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
