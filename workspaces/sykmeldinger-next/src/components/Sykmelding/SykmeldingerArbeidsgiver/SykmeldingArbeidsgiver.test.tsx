import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Periodetype, RegelStatus, StatusEvent, SykmeldingFragment } from 'queries'

import SykmeldingArbeidsgiver from './SykmeldingArbeidsgiver'

const minimalSykmelding: SykmeldingFragment = {
    __typename: 'Sykmelding',
    id: '123',
    mottattTidspunkt: '2020-01-10',
    behandlingsutfall: {
        __typename: 'Behandlingsutfall',
        status: RegelStatus.OK,
        ruleHits: [],
    },
    arbeidsgiver: null,
    sykmeldingsperioder: [
        {
            __typename: 'Periode',
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
        __typename: 'SykmeldingStatus',
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.APEN,
        sporsmalOgSvarListe: [],
        arbeidsgiver: null,
    },
    medisinskVurdering: null,
    prognose: null,
    utdypendeOpplysninger: {},
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        __typename: 'KontaktMedPasient',
        kontaktDato: '2020-04-01',
        begrunnelseIkkeKontakt: 'Han var kjempesyk',
    },
    behandletTidspunkt: '2020-01-01',
    behandler: {
        __typename: 'Behandler',
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
        adresse: {
            __typename: 'Adresse',
            gate: null,
            postnummer: null,
            kommune: null,
            postboks: null,
            land: null,
        },
        tlf: null,
    },
    egenmeldt: null,
    papirsykmelding: null,
    merknader: null,
    pasient: {
        __typename: 'Pasient',
        fnr: '123456789',
        fornavn: null,
        mellomnavn: null,
        etternavn: null,
        overSyttiAar: null,
    },
    rulesetVersion: 2,
}

describe('SykmeldingViewArbeidsgiver', () => {
    it('Behandler should use correct name correctly formatted', () => {
        render(<SykmeldingArbeidsgiver sykmelding={minimalSykmelding} />)

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText(/Sykmeldingen ble skrevet av/).parentElement).toHaveTextContent(/Frida Perma Frost/)
    })
})
