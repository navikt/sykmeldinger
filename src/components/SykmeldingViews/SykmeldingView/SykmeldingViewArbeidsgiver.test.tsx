import { render, screen } from '@testing-library/react';

import { Sykmelding, SykmeldingSchema } from '../../../models/Sykmelding/Sykmelding';
import { Periodetype } from '../../../models/Sykmelding/Periode';
import { RegelStatus } from '../../../models/Sykmelding/Behandlingsutfall';
import { StatusEvent } from '../../../models/Sykmelding/SykmeldingStatus';

import SykmeldingViewArbeidsgiver from './SykmeldingViewArbeidsgiver';

const minimalSykmelding: Sykmelding = {
    id: '123',
    mottattTidspunkt: '2020-01-10',
    behandlingsutfall: {
        status: RegelStatus.OK,
        ruleHits: [],
    },
    legekontorOrgnummer: null,
    arbeidsgiver: null,
    sykmeldingsperioder: [
        {
            fom: '2020-02-10',
            tom: '2020-02-15',
            behandlingsdager: 2,
            type: Periodetype.BEHANDLINGSDAGER,
            reisetilskudd: false,
            gradert: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        },
    ],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.APEN,
        sporsmalOgSvarListe: [],
        arbeidsgiver: null,
    },
    medisinskVurdering: null,
    skjermesForPasient: false,
    prognose: null,
    utdypendeOpplysninger: {},
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: '2020-04-01',
        begrunnelseIkkeKontakt: 'Han var kjempesyk',
    },
    behandletTidspunkt: '2020-01-01',
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
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

describe('SykmeldingViewArbeidsgiver', () => {
    const sykmelding = SykmeldingSchema.parse(minimalSykmelding);

    it('Behandler should use correct name correctly formatted', () => {
        render(<SykmeldingViewArbeidsgiver sykmelding={sykmelding} />);

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText(/Behandler/).parentElement).toHaveTextContent(/Frida Perma Frost/);
    });
});
