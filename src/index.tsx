import 'reflect-metadata';
import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dayjs from 'dayjs';

dayjs.locale('nb');

const runtimeEnvironment = window._env_?.RUNTIME_ENVIRONMENT;
if (runtimeEnvironment === 'development' || runtimeEnvironment === 'labs-demo') {
    require('./mock/mock');
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
