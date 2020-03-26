const CracoLessPlugin = require('craco-less');
const interpolateHtml = require('craco-interpolate-html-plugin');

const navInterpolations = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return {
            NAV_HEADING: require('./src/mock/decorator/decorator-header-withmenu.js'),
            MEGAMENU_RESOURCES: require('./src/mock/decorator/decorator-megamenu.js'),
            NAV_STYLES: require('./src/mock/decorator/decorator-styles.js'),
            NAV_SCRIPTS: require('./src/mock/decorator/decorator-scripts.js'),
            NAV_SKIPLINKS: require('./src/mock/decorator/decorator-skiplinks.js'),
            NAV_FOOTER: require('./src/mock/decorator/decorator-footer.js'),
        };
    }
};

module.exports = {
    plugins: [
        { plugin: CracoLessPlugin },
        /* {
            plugin: interpolateHtml,
            // Enter the variable to be interpolated in the html file
            options: {
                ...navInterpolations(),
            },
        }, */
    ],
    eslint: {
        extends: ['eslint-config-react-app'],
        rules: {
            // ...
            'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
            'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        },
    },
};
