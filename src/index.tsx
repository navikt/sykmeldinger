import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dayjs from 'dayjs';

import AmplitudeInstance from './utils/amplitudeInstance';

dayjs.locale('nb');

const runtimeEnvironment = window._env_.RUNTIME_ENVIRONMENT;
if (runtimeEnvironment === 'development' || runtimeEnvironment === 'labs-demo') {
    require('./mock/mock');
}

// To log events call amplitudeInstance.logEvent
export const amplitudeInstance = new AmplitudeInstance();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
