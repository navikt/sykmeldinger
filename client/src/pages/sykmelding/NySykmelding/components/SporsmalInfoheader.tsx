import Lenke from 'nav-frontend-lenker';
import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Innholdstittel } from 'nav-frontend-typografi';

const SporsmalInfoheader = () => (
    <>
        <Innholdstittel>Bruk sykmeldingen</Innholdstittel>
        <ul>
            <li>
                <Tekstomrade>
                    melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i jobb
                </Tekstomrade>
            </li>
            <li>
                <Tekstomrade>legge til rette for at du kan søke om sykepenger</Tekstomrade>
            </li>
        </ul>
        <Lenke href="https://www.nav.no/personvern">Les mer om hvordan NAV behandler personopplysninger</Lenke>
    </>
);

export default SporsmalInfoheader;
