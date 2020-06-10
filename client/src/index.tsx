import 'dayjs/locale/nb';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as dayjs from 'dayjs';

import withMenu from './mock/decorator/decorator-header-withmenu';
import megamenu from './mock/decorator/decorator-megamenu';
import footer from './mock/decorator/decorator-footer';
import scripts from './mock/decorator/decorator-scripts';
import skiplinks from './mock/decorator/decorator-skiplinks';
import styles from './mock/decorator/decorator-styles';

import DemoWrapper from './mock/DemoWrapper';
import env from './utils/environment';

dayjs.locale('nb');

const init = () => {
    if (process.env.NODE_ENV === 'development') {
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_HEADING}}}', withMenu);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_FOOTER}}}', footer);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_STYLES}}}', styles);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_SCRIPTS}}}', scripts);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_SKIPLINKS}}}', skiplinks);
        document.body.innerHTML = document.body.innerHTML.replace('{{{MEGAMENU_RESOURCES}}}', megamenu);

        // Execute client.js
        var script = document.createElement('script');
        script.src = 'https://www.nav.no/dekoratoren/client.js';
        document.body.appendChild(script);
    }

    const REDIRECT_ETTER_LOGIN = window.localStorage.getItem('REDIRECT_ETTER_LOGIN');
    if (REDIRECT_ETTER_LOGIN) {
        // Fjerner slik at den ikke skal gå i loop
        window.localStorage.removeItem('REDIRECT_ETTER_LOGIN');
        window.location.href = REDIRECT_ETTER_LOGIN;
    }

    if (env.isDevelopment || env.isRunningOnHeroku) {
        require('./mock/mock');
        ReactDOM.render(
            <React.StrictMode>
                <DemoWrapper />
            </React.StrictMode>,
            document.getElementById('app'),
        );
    } else {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('app'),
        );
    }

    serviceWorker.unregister();
};
init();
