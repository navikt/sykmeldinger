import React, { useRef, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Sykmelding } from '../../../types/sykmeldingTypes';
import tekster from './nysykmelding-tekster';
import Sidetopp from '../../sidetopp/Sidetopp';
import InfoPanel from '../../infopanel/InfoPanel';
import Lenke from 'nav-frontend-lenker';
import Veileder from '../../veileder/Veileder';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const NySykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    const utfyllingRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />
            <Veileder
                tekst={tekster['sykmelding.introtekst']}
                onClick={() => window.scrollTo({ top: utfyllingRef.current.offsetTop - 100, behavior: 'smooth' })}
                knappTekst="Gå til utfyllingen"
            />

            <InfoPanel sykmelding={sykmelding} />
            <div ref={utfyllingRef} className="third">
                <h1>Bruk sykmeldingen</h1>
                Ifølge folketrygdloven har den to formål: melde fra om sykefravær til NAV og arbeidsgiveren slik at du
                kan få hjelp til å komme tilbake i jobb legge til rette for at du kan søke om sykepenger Les mer om
                hvordan NAV behandler personopplysninger
            </div>
            <div>riktige opplysninger</div>

            <div>jeg er sykmeldt fra</div>

            <Hovedknapp onClick={() => console.log('send')}>Send sykmeldingen</Hovedknapp>
            <Lenke href="www.nav.no">Jeg ønsker ikke å bruke denne sykmeldingen</Lenke>
        </div>
    );
};

export default NySykmelding;
