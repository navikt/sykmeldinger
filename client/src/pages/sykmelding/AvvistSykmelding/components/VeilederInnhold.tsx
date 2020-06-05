import './Veilederinnhold.less';

import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import Begrunnelser from './Begrunnelser';
import tekster from '../AvvistSykmelding-tekster';
import { Behandler, Sykmelding } from '../../../../types/sykmeldingTypes';
import { getLedetekst } from '../../../../utils/utils';

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

    return getLedetekst(tekster['sykmelding.avvist.handling.standard'], { '%LEGENAVN%': legenavn });
};

const hentIntrotekst = (sykmelding: Sykmelding) => {
    const legenavn = byggLegeNavn(sykmelding.behandler);
    const intro = tekster['sykmelding.avvist.intro'];
    const standardtekst = `${intro} ${getLedetekst(tekster['sykmelding.avvist.intro.standard'], {
        '%LEGENAVN%': legenavn,
    })}`;
    const brukerErOver70 = `${intro} ${tekster['sykmelding.avvist.intro.brukerErOver70']}`;
    const ugyldigVersjon = `${intro} ${tekster['sykmelding.avvist.intro.ugyldigVersjon']}`;
    const ingenAutorisasjonTekst = `${intro} ${tekster['sykmelding.avvist.intro.manglerAutorisasjon']}`;

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
                <p>{tekster['sykmelding.veileder.beklager']}</p>
                <p>{introtekst}</p>
                <p>{handling}</p>
            </div>
            <Begrunnelser sykmelding={sykmelding} />
        </>
    );
};

export default VeilederInnhold;
