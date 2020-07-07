import 'dayjs/locale/nb';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dayjs from 'dayjs';

import withMenu from './mock/decorator/decorator-header-withmenu';
import megamenu from './mock/decorator/decorator-megamenu';
import footer from './mock/decorator/decorator-footer';
import scripts from './mock/decorator/decorator-scripts';
import skiplinks from './mock/decorator/decorator-skiplinks';
import styles from './mock/decorator/decorator-styles';

dayjs.locale('nb');

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

if (process.env.NODE_ENV === 'development') {
    require('./mock/mock');
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app'),
);

serviceWorker.unregister();
