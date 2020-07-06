import { StatusEvent } from '../../../../types/sykmelding';
import React from 'react';

type Soknadstype =
    | 'SOK_NA'
    | 'SOK_SENERE_KORT_SYKMELDING'
    | 'SOK_SENERE_LANG_SYKMELDING'
    | 'SOK_PAPIR'
    | 'SOK_SENDT'
    | 'UTEN_SOKNAD';

// Each prop defines whether each individual section of the statuspanel should be shown
interface StatuspanelProps {
    // Green checkmark header
    sykmeldingstatus: StatusEvent;
    sykmeldingSendtEllerBekreftetDato: Date;
    // Status information about sykeforløp
    soknadstype: Soknadstype;
    avventendeSykmelding?: boolean;
    arbeidsgiverForskutterLonn?: boolean;
    skalViseInnteksmeldingInfo?: boolean;
    skalViseReisetilskuddInfo?: boolean;
    skalViseBehandlingsdagerInfo?: boolean;
}

const getSoknadtypeComponent = (soknadstype: Soknadstype) => {
    switch (soknadstype) {
        case 'SOK_NA':
            return <div>Du må søke nå</div>;
        case 'SOK_SENERE_KORT_SYKMELDING':
            return <div>Du må søke senere</div>;
        case 'SOK_SENERE_LANG_SYKMELDING':
            return <div>Du må søke senere. du har lang sykmelding</div>;
        case 'SOK_PAPIR':
            return <div>Du må søke på papir</div>;
        case 'SOK_SENDT':
            return <div>Søknaden er sendt</div>;
        case 'UTEN_SOKNAD':
            return <div>Du trenger ikke å søke</div>;
    }
};

const Statuspanel = ({
    sykmeldingstatus,
    sykmeldingSendtEllerBekreftetDato,
    soknadstype,
    avventendeSykmelding = false,
    arbeidsgiverForskutterLonn,
    skalViseInnteksmeldingInfo = false,
    skalViseBehandlingsdagerInfo = false,
    skalViseReisetilskuddInfo = false,
}: StatuspanelProps) => {
    const sykmeldingstatusComponent = (
        <div className="statuspanel__header">
            {sykmeldingstatus} {sykmeldingSendtEllerBekreftetDato.toString()}
        </div>
    );
    const soknadstypeComponent = getSoknadtypeComponent(soknadstype);

    return (
        <div style={{ border: '1px solid black', padding: '10px' }}>
            {sykmeldingstatusComponent}
            <hr />
            {soknadstypeComponent}
            <hr />
            {avventendeSykmelding ? <div>Dette er en avventende sykmelding</div> : null}
            <hr />
            {arbeidsgiverForskutterLonn === undefined ? null : (
                <div>Arbeidsgiver forskutterer {arbeidsgiverForskutterLonn ? ' ' : ' ikke '} lønn</div>
            )}
            <hr />
            {skalViseReisetilskuddInfo ? <div>Dette er en sykmelding for reisetilskudd</div> : null}
            <hr />
            {skalViseInnteksmeldingInfo ? <div>Du må be arbeidsgiver sende inn inntekstopplysninger</div> : null}
            <hr />
            {skalViseBehandlingsdagerInfo ? <div>Dette er en sykmelding for behandlingsdager</div> : null}
            <hr />
            <div>Hvis du har flere arbeidsforhold må du sende én sykmelding for hvert arbeidsforhold</div>
        </div>
    );
};

export default Statuspanel;
