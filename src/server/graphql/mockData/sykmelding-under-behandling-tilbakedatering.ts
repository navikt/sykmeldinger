import { dateAdd, dateSub } from '../../../utils/dateUtils'
import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { SvarRestriksjon } from '../../api-models/sykmelding/UtdypendeOpplysninger'
import {
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Merknadtype,
    Periodetype,
    RegelStatus,
    StatusEvent,
} from '../resolver-types.generated'

export function sykmeldingUnderbehandlingTilbakedatering(mottatt = dateSub(new Date(), { months: 11 })): Sykmelding {
    return {
        id: 'UNDER-BEAHNDLING-TILBAKEDATERING',
        mottattTidspunkt: mottatt,
        behandlingsutfall: { status: RegelStatus.OK, ruleHits: [] },
        arbeidsgiver: { navn: 'LOMMEN BARNEHAVE' },
        sykmeldingsperioder: [
            {
                fom: dateAdd(mottatt, { days: 5 }),
                tom: dateAdd(mottatt, { days: 17 }),
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'andre årsaker til sykefravær',
                        arsak: [MedisinskArsakType.AKTIVITET_FORHINDRER_BEDRING],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'andre årsaker til sykefravær',
                        arsak: [ArbeidsrelatertArsakType.ANNET],
                    },
                },
                reisetilskudd: false,
            },
        ],
        sykmeldingStatus: {
            statusEvent: StatusEvent.SENDT,
            timestamp: dateAdd(mottatt, { days: 3 }),
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        },
        medisinskVurdering: {
            hovedDiagnose: { kode: 'L87', system: 'ICPC-2', tekst: 'TENDINITT INA' },
            biDiagnoser: [{ kode: 'L87', system: 'ICPC-2', tekst: 'GANGLION SENE' }],
            annenFraversArsak: null,
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: '2021-06-06',
        },
        prognose: {
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'Må ta det pent',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: true,
                arbeidFOM: '2021-06-06',
                vurderingsdato: '2021-06-06',
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
                    svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: 559367c0-6ce7-456f-9936-ef8b9193509f',
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
        kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: 'begrunnelse' },
        behandletTidspunkt: dateAdd(mottatt, { days: 2 }),
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
        egenmeldt: false,
        papirsykmelding: false,
        merknader: [{ type: Merknadtype.UNDER_BEHANDLING, beskrivelse: null }],
        pasient: { fnr: '06078104285', fornavn: 'KORRUPT', mellomnavn: null, etternavn: 'RISPBÆRBUSK' },
        rulesetVersion: 3,
        utenlandskSykmelding: null,
    }
}
