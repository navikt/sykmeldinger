import 'next';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'dayjs/locale/nb';

import { TextDecoder, TextEncoder } from 'util';

import isBetween from 'dayjs/plugin/isBetween';
import { Modal } from '@navikt/ds-react';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import dayjs from 'dayjs';

dayjs.locale('nb');
dayjs.extend(isBetween);

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Modal.setAppElement(document.createElement('div'));

mockRouter.useParser(
    createDynamicRouteParser(['/', '/[sykmeldingId]', '/[sykmeldingId]/kvittering', '/[sykmeldingId]/bekreftAvvist']),
);

jest.spyOn(window, 'scrollTo').mockImplementation(() => void 0);
jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        publicPath: '/fake/basepath',
        runtimeEnv: 'test',
        MIN_SIDE_ROOT: '/test-min-side',
        SYKEFRAVAER_ROOT: '/test-ditt-sykefravaer',
    },
}));

process.env.DEBUG_PRINT_LIMIT = '30000';
