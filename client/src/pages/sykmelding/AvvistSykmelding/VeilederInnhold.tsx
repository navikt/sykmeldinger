import './Veilederinnhold.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import Begrunnelser from './Begrunnelser';
import { Behandler, Sykmelding } from '../../../types/sykmeldingTypes';

const byggLegeNavn = (behandler: Behandler) => {
    const { fornavn, mellomnavn, etternavn } = behandler;

    let navn = fornavn;

    if (mellomnavn) {
        navn += ` ${mellomnavn}`;
    }

    if (etternavn) {
        navn += ` ${etternavn}`;
    }

    return navn;
};

const hentHandlingsstreng = (sykmelding: Sykmelding) => {
    /* TODO:
    const regelnavnliste = hentRegelnavnListe(smSykmelding);

    const brukerErOver70 = regelnavnliste.find((regelnavn) => {
        return regelnavn === PASIENT_ELDRE_ENN_70;
    });
    const ugyldigVersjon = regelnavnliste.find((regelnavn) => {
        return regelnavn === UGYLDIG_REGELSETTVERSJON;
    });
    const ikkeRettTilASykmelde = hentHarIkkeRettTilASykmelde(smSykmelding);

    if (brukerErOver70) {
        return tekster['sykmelding.avvist.handling.brukerErOver70']
    }

    if (ugyldigVersjon) {
        return tekster['sykmelding.avvist.handling.ugyldigVersjon'];
    }

    if (ikkeRettTilASykmelde) {
        return tekster['sykmelding.avvist.handling.ikkeRettTilASykmelde'];
    }
    */

    const legenavn = byggLegeNavn(sykmelding.behandler);

    return `Når du har fått ny sykmelding fra %LEGENAVN%, får du en ny beskjed fra oss om å logge deg inn på nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte ${legenavn} som skal skrive den nye sykmeldingen.`;
};

const hentIntrotekst = (sykmelding: Sykmelding) => {
    const legenavn = byggLegeNavn(sykmelding.behandler);
    const intro = 'Du trenger en ny sykmelding fordi';
    const standardtekst = `${intro} det er gjort en feil i utfyllingen. Vi har gitt beskjed til ${legenavn} om hva som er feil, og at du må få en ny sykmelding.`;
    const brukerErOver70 = `${intro} du er over 70 år.`;
    const ugyldigVersjon = `${intro} det er brukt en ugyldig versjon av sykmeldingen.`;
    const ingenAutorisasjonTekst = `${intro} den som skrev sykmeldingen manglet autorisasjon.`;

    //const regelnavnliste = hentRegelnavnListe(smSykmelding);

    // TODO: regelnavnliste.includes(PASIENT_ELDRE_ENN_70)
    if (false) {
        return brukerErOver70;
    }

    // TODO: regelnavnliste.includes(UGYLDIG_REGELSETTVERSJON)
    if (false) {
        return ugyldigVersjon;
    }

    // TODO: hentHarIkkeRettTilASykmelde(smSykmelding)
    if (false) {
        return ingenAutorisasjonTekst;
    }
    return standardtekst;
};

interface VeilederInnholdProps {
    sykmelding: Sykmelding;
}

const VeilederInnhold = ({ sykmelding }: VeilederInnholdProps) => {
    const introtekst = hentIntrotekst(sykmelding);
    const handling = hentHandlingsstreng(sykmelding);
    return (
        <>
            <Systemtittel className="veilederinnhold-tittel">Sykmeldingen kan dessverre ikke brukes</Systemtittel>
            <div>
                <p>Beklager at vi må bry deg mens du er syk.</p>
                <p>{introtekst}</p>
                <p>{handling}</p>
            </div>
            <Begrunnelser sykmelding={sykmelding} />
        </>
    );
};

export default VeilederInnhold;
