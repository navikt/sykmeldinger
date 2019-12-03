import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import env from './utils/environment';
import * as serviceWorker from './serviceWorker';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
dayjs.locale('nb');

const init = async () => {
    if (env.isDevelopment || env.isRunningOnHeroku) {
        require('./mock');

        // TODO: Sett opp decorator for prod

        const withMenu = await import('./mock/decorator/decorator-header-withmenu');
        const megamenu = await import('./mock/decorator/decorator-megamenu');
        const footer = await import('./mock/decorator/decorator-footer');
        const scripts = await import('./mock/decorator/decorator-scripts');
        const skiplinks = await import('./mock/decorator/decorator-skiplinks');
        const styles = await import('./mock/decorator/decorator-styles');

        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_HEADING}}}', withMenu.default);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_FOOTER}}}', footer.default);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_STYLES}}}', styles.default);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_SCRIPTS}}}', scripts.default);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_SKIPLINKS}}}', skiplinks.default);
        document.body.innerHTML = document.body.innerHTML.replace('{{{MEGAMENU_RESOURCES}}}', megamenu.default);
    }

    ReactDOM.render(<App />, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
};

init();
