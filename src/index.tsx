import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'reflect-metadata';
import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dayjs from 'dayjs';
import { setupLogger } from './utils/logger';

dayjs.locale('nb');

const runtimeEnvironment = window._env_?.RUNTIME_ENVIRONMENT;
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
