import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { dateAdd, dateSub } from '../../../utils/dateUtils'
import { AnnenFraverGrunn, Periodetype, RegelStatus, StatusEvent } from '../resolver-types.generated'

export function sykmeldingApenPapir(mottatt: string = dateSub(new Date(), { months: 2 })): Sykmelding {
    return {
        id: 'APEN_PAPIR',
        mottattTidspunkt: mottatt,
        behandlingsutfall: {
            status: RegelStatus.Ok,
            ruleHits: [],
        },
        arbeidsgiver: {
            navn: 'Navn Navnesen',
            stillingsprosent: 100,
        },
        sykmeldingsperioder: [
            {
                fom: dateAdd(mottatt, { days: 0 }),
                tom: dateAdd(mottatt, { days: 4 }),
                behandlingsdager: 2,
                type: Periodetype.Behandlingsdager,
                reisetilskudd: false,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: null,
            },
        ],
        sykmeldingStatus: {
            timestamp: mottatt,
            statusEvent: StatusEvent.Apen,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Rar sykdom',
            },
            biDiagnoser: [
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Rar sykdom',
                },
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-59',
                    tekst: 'Sykdom0',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2018-10-18',
            annenFraversArsak: {
                beskrivelse:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                grunn: [AnnenFraverGrunn.NodvendigKontrollundenrsokelse],
            },
        },
        skjermesForPasient: false,
        utdypendeOpplysninger: {
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
        },
        kontaktMedPasient: {
            kontaktDato: null,
            begrunnelseIkkeKontakt: null,
        },
        behandletTidspunkt: mottatt,
        behandler: {
            fornavn: 'Fornavn',
            mellomnavn: null,
            etternavn: 'Etternavn',
            adresse: {
                gate: 'Gateveien 4',
                postnummer: 1001,
                kommune: 'Oslo',
                postboks: '1212 Gateveien',
                land: 'NO',
            },
            tlf: '900 00 000',
        },
        syketilfelleStartDato: '2018-10-10',
        navnFastlege: 'Doktor Legesen',
        egenmeldt: false,
        papirsykmelding: true,
        harRedusertArbeidsgiverperiode: false,
        pasient: {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
        meldingTilArbeidsgiver: null,
        legekontorOrgnummer: null,
        andreTiltak: null,
        meldingTilNAV: null,
        merknader: null,
        prognose: null,
        tiltakArbeidsplassen: null,
        tiltakNAV: null,
    }
}
