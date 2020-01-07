import Lenke from 'nav-frontend-lenker';
import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Innholdstittel } from 'nav-frontend-typografi';

import tekster from './Sporsmal-tekster';

const SporsmalInfoheader = () => (
    <>
        <Innholdstittel>{tekster['infoheader.bruk-sykmeldingen']}</Innholdstittel>
        <ul>
            <li>
                <Tekstomrade>{tekster['infoheader.trygdeloven.del-en']}</Tekstomrade>
            </li>
            <li>
                <Tekstomrade>{tekster['infoheader.trygdeloven.del-to']}</Tekstomrade>
            </li>
        </ul>
        <Lenke href="https://www.nav.no/personvern">{tekster['infoheader.personvern-lenke']}</Lenke>
    </>
);

export default SporsmalInfoheader;
