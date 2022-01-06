import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import Sykmeldingview from './Sykmeldingview';

const minimalSykmelding = {
    id: '123',
    mottattTidspunkt: '2020-01-10',
    behandlingsutfall: {
        status: 'OK',
        ruleHits: [],
    },
    legekontorOrgnummer: null,
    arbeidsgiver: null,
    sykmeldingsperioder: [
        {
            fom: '2020-02-10',
            tom: '2020-02-15',
            behandlingsdager: 2,
            type: 'BEHANDLINGSDAGER',
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: 'APEN',
        sporsmalOgSvarListe: [],
    },
    medisinskVurdering: null,
    skjermesForPasient: false,
    prognose: null,
    utdypendeOpplysninger: {},
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    andreTiltak: null,
    meldingTilNAV: null,
    kontaktMedPasient: {
        kontaktDato: '2020-04-01',
        begrunnelseIkkeKontakt: 'Han var kjempesyk',
    },
    behandletTidspunkt: '2020-01-01',
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
        aktoerId: '1234',
        fnr: '99999999999',
        hpr: null,
        her: null,
        adresse: {
            gate: null,
            postnummer: null,
            kommune: null,
            postboks: null,
            land: null,
        },
        tlf: null,
    },
    syketilfelleStartDato: null,
    navnFastlege: null,
    egenmeldt: null,
    papirsykmelding: null,
    harRedusertArbeidsgiverperiode: null,
    merknader: null,
    pasient: {
        fnr: '123456789',
        fornavn: null,
        mellomnavn: null,
        etternavn: null,
    },
};

describe('SykmeldingView', () => {
    const sykmelding = new Sykmelding(minimalSykmelding);

    it('Behandler should use correct name correctly formatted', () => {
        render(<Sykmeldingview sykmelding={sykmelding} arbeidsgiver={false} />);

        expect(screen.getByText(/Behandler/).parentElement).toHaveTextContent(/Frida Perma Frost/);
    });
});
