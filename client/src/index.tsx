import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dayjs from 'dayjs';

dayjs.locale('nb');

if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_IS_GCP_LABS === 'true') {
    require('./mock/mock');
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app'),
);

serviceWorker.unregister();
