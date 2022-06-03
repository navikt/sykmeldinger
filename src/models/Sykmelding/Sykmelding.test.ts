import {
    getReadableSykmeldingLength,
    getSykmeldingEndDate,
    getSykmeldingperioderSorted,
    getSykmeldingStartDate,
    getSykmeldingTitle,
    Sykmelding,
    SykmeldingSchema,
} from './Sykmelding';
import { RegelStatus } from './Behandlingsutfall';
import { StatusEvent } from './SykmeldingStatus';
import { Periode, Periodetype } from './Periode';

const minimalSykmelding: Sykmelding = {
    id: 'APEN_PAPIR',
    mottattTidspunkt: '2020-01-10',
    behandlingsutfall: {
        status: RegelStatus.OK,
        ruleHits: [],
    },
    arbeidsgiver: null,
    sykmeldingsperioder: [],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.APEN,
        sporsmalOgSvarListe: [],
        arbeidsgiver: null,
    },
    medisinskVurdering: null,
    skjermesForPasient: false,
    utdypendeOpplysninger: {},
    kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
    behandletTidspunkt: '2020-01-01',
    behandler: {
        fornavn: 'Fornavn',
        mellomnavn: null,
        etternavn: 'Etternavn',
        adresse: {
            gate: null,
            postnummer: null,
            kommune: null,
            postboks: null,
            land: null,
        },
        tlf: '900 00 000',
    },
    syketilfelleStartDato: null,
    navnFastlege: null,
    egenmeldt: null,
    papirsykmelding: null,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
    pasient: {
        fnr: '123456789',
        fornavn: null,
        mellomnavn: null,
        etternavn: null,
    },
    andreTiltak: null,
    legekontorOrgnummer: null,
    meldingTilArbeidsgiver: null,
    meldingTilNAV: null,
    prognose: null,
    tiltakArbeidsplassen: null,
    tiltakNAV: null,
};

const createSykmeldingPeriode = ({ fom, tom }: { fom: string; tom: string }): Periode => ({
    fom,
    tom,
    gradert: null,
    behandlingsdager: null,
    innspillTilArbeidsgiver: null,
    type: Periodetype.REISETILSKUDD,
    aktivitetIkkeMulig: null,
    reisetilskudd: false,
});

describe('Sykmelding', () => {
    describe('getSykmeldingTitle', () => {
        it('Gets standard sykmelding title', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
            });
            expect(getSykmeldingTitle(sykmelding)).toEqual('Sykmelding');
        });

        it('Gets papirsykmelding title', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                papirsykmelding: true,
            });
            expect(getSykmeldingTitle(sykmelding)).toEqual('Papirsykmelding');
        });

        it('Gets egenmeldt title', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                egenmeldt: true,
            });
            expect(getSykmeldingTitle(sykmelding)).toEqual('Egenmelding');
        });
    });

    describe('getSykmeldingStartDate', () => {
        it('Gets fom of the earliest period', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                    createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
                    createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                ],
            });
            expect(getSykmeldingStartDate(sykmelding)).toEqual('2021-04-01');
        });
    });

    describe('getSykmeldingEndDate', () => {
        it('Gets tom of the latest period', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                    createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                    createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
                ],
            });
            expect(getSykmeldingEndDate(sykmelding)).toEqual('2021-06-03');
        });
    });

    describe('getSykmeldingperioderSorted', () => {
        it('Gets tom of the latest period', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                    createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                    createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
                ],
            });
            expect(getSykmeldingperioderSorted(sykmelding).map((it) => ({ fom: it.fom, tom: it.tom }))).toEqual([
                { fom: '2021-04-01', tom: '2021-04-03' },
                { fom: '2021-05-01', tom: '2021-05-03' },
                { fom: '2021-06-01', tom: '2021-06-03' },
            ]);
        });
    });

    describe('getReadableSykmeldingLength', () => {
        it('Lenght is one day', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-01' })],
            });
            expect(getReadableSykmeldingLength(sykmelding)).toBe('1. juni 2021');
        });

        it('Within same year', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                    createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                    createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
                ],
            });
            expect(getReadableSykmeldingLength(sykmelding)).toBe('1. april - 3. juni 2021');
        });

        it('Within same year and month', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2021-06-20', tom: '2021-06-24' }),
                    createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                    createSykmeldingPeriode({ fom: '2021-06-06', tom: '2021-06-09' }),
                ],
            });
            expect(getReadableSykmeldingLength(sykmelding)).toBe('1. - 24. juni 2021');
        });

        it('Different years', () => {
            const sykmelding: Sykmelding = SykmeldingSchema.parse({
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({ fom: '2020-12-25', tom: '2020-12-31' }),
                    createSykmeldingPeriode({ fom: '2021-01-01', tom: '2021-01-06' }),
                ],
            });
            expect(getReadableSykmeldingLength(sykmelding)).toBe('25. desember 2020 - 6. januar 2021');
        });
    });
});
