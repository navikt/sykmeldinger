import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { dateAdd, dateSub } from '../../../utils/dateUtils'
import { Periodetype, RegelStatus, StatusEvent } from '../resolver-types.generated'
import { SvarRestriksjon } from '../../api-models/sykmelding/UtdypendeOpplysninger'

const mottatt = dateSub(new Date(), { months: 1 })

export const sykmeldingAvvistUgyldigData: Sykmelding = {
    id: 'fac65224-7acc-40cc-b9a3-23c36ca99ac3',
    pasient: {
        fnr: '25126724503',
        fornavn: 'ABSURD',
        mellomnavn: null,
        etternavn: 'SEKK',
    },
    mottattTidspunkt: mottatt,
    behandlingsutfall: {
        status: RegelStatus.INVALID,
        ruleHits: [
            {
                messageForSender:
                    'Sykmeldingen kan ikke rettes, det må skrives en ny. Pasienten har fått beskjed om å vente på ny sykmelding fra deg. Grunnet følgende:Hvis sykmeldingsgrad er høyere enn 99% for delvis sykmelding avvises meldingen',
                messageForUser: 'Sykmeldingsgraden kan ikke være mer enn 99% fordi det er en gradert sykmelding.',
                ruleName: 'GRADERT_SYKMELDING_OVER_99_PROSENT',
                ruleStatus: RegelStatus.INVALID,
            },
        ],
    },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: { navn: 'LOMMEN BARNEHAVE' },
    sykmeldingsperioder: [
        {
            fom: dateAdd(mottatt, { days: 2 }),
            tom: dateAdd(mottatt, { days: 2 }),
            gradert: { grad: 160, reisetilskudd: false },
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: Periodetype.GRADERT,
            aktivitetIkkeMulig: null,
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: StatusEvent.APEN,
        timestamp: '2021-11-23T06:50:02.746659Z',
        arbeidsgiver: null,
        sporsmalOgSvarListe: [],
    },
    medisinskVurdering: {
        hovedDiagnose: {
            kode: 'L87',
            system: 'ICPC-2',
            tekst: 'TENDINITT INA',
        },
        biDiagnoser: [{ kode: 'L87', system: 'ICPC-2', tekst: 'GANGLION SENE' }],
        annenFraversArsak: null,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: '2021-11-16',
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2021-11-16',
            vurderingsdato: '2021-11-16',
        },
        erIkkeIArbeid: null,
    },
    utdypendeOpplysninger: {
        '6.2': {
            '6.2.1': {
                sporsmal: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                svar: 'Langvarig korsryggsmerter. Ømhet og smerte',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.2': {
                sporsmal: 'Hvordan påvirker sykdommen arbeidsevnen',
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 38c9235f-d0dc-4329-8fab-f4a3ec9a0380',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.3': {
                sporsmal: 'Har behandlingen frem til nå bedret arbeidsevnen?',
                svar: 'Nei',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
            '6.2.4': {
                sporsmal: 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                svar: 'Henvist til fysio',
                restriksjoner: [SvarRestriksjon.SKJERMET_FOR_ARBEIDSGIVER],
            },
        },
    },
    tiltakArbeidsplassen: 'Fortsett som sist.',
    tiltakNAV:
        'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: null,
        begrunnelseIkkeKontakt: null,
    },
    behandletTidspunkt: '2021-11-16T00:00:00Z',
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
        adresse: {
            gate: 'Kirkegårdsveien 3',
            postnummer: 1348,
            kommune: 'Rykkinn',
            postboks: null,
            land: 'Country',
        },
        tlf: 'tel:94431152',
    },
    syketilfelleStartDato: '2021-11-16',
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
    utenlandskSykmelding: null,
}
