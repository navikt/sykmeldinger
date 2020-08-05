import { JSDOM } from 'jsdom';
import request from 'request';
import NodeCache from 'node-cache';
import logger from './logger';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE,
});
const DECORATOR_CACHE_KEY = 'DECORATOR_CACHE_KEY';

export interface DecoratorFragments {
    NAV_SKIPLINKS?: string;
    NAV_SCRIPTS?: string;
    NAV_STYLES?: string;
    NAV_HEADING?: string;
    NAV_FOOTER?: string;
    MEGAMENU_RESOURCES?: string;
}

const getDecorator = () =>
    new Promise<DecoratorFragments>((resolve, reject) => {
        const decorator = cache.get<DecoratorFragments>(DECORATOR_CACHE_KEY);

        if (decorator) {
            resolve(decorator);
        } else {
            if (process.env.DECORATOR_URL) {
                request(process.env.DECORATOR_URL, (error, response, body) => {
                    if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                        const { document } = new JSDOM(body).window;
                        const decoratorFragments: DecoratorFragments = {
                            NAV_SKIPLINKS: document.getElementById('skiplinks')!.innerHTML,
                            NAV_SCRIPTS: document.getElementById('scripts')!.innerHTML,
                            NAV_STYLES: document.getElementById('styles')!.innerHTML,
                            NAV_HEADING: document.getElementById('header-withmenu')!.innerHTML,
                            NAV_FOOTER: document.getElementById('footer-withmenu')!.innerHTML,
                            MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')!.innerHTML,
                        };
                        cache.set(DECORATOR_CACHE_KEY, decoratorFragments);
                        logger.info(`Creating cache`);
                        resolve(decoratorFragments);
                    } else {
                        reject(new Error(error));
                    }
                });
            } else {
                reject(new Error('Decorator URL could not be retrieved from environment variables.'));
            }
        }
    });

export default getDecorator;
