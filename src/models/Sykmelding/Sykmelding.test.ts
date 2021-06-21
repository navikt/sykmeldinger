import { Sykmelding } from './Sykmelding';

const minimalSykmelding = {
    id: 'APEN_PAPIR',
    mottattTidspunkt: '2020-01-10',
    behandlingsutfall: {
        status: 'OK',
        ruleHits: [],
    },
    arbeidsgiver: null,
    sykmeldingsperioder: [],
    sykmeldingStatus: {
        timestamp: '2020-01-01',
        statusEvent: 'APEN',
        sporsmalOgSvarListe: [],
    },
    medisinskVurdering: null,
    skjermesForPasient: false,
    utdypendeOpplysninger: {},
    kontaktMedPasient: {},
    behandletTidspunkt: '2020-01-01',
    behandler: {
        fornavn: 'Fornavn',
        mellomnavn: null,
        etternavn: 'Etternavn',
        aktoerId: '1234',
        fnr: '99999999999',
        hpr: '321',
        her: '123',
        adresse: {},
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
};

describe('Sykmelding', () => {
    describe('getSykmeldingTitle', () => {
        it('Gets standard sykmelding title', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingTitle()).toEqual('Sykmelding');
        });

        it('Gets papirsykmelding title', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                papirsykmelding: true,
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingTitle()).toEqual('Papirsykmelding');
        });

        it('Gets egenmeldt title', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                egenmeldt: true,
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingTitle()).toEqual('Egenmelding');
        });
    });

    describe('getSykmeldingStartDate', () => {
        it('Gets fom of the earliest period', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                    { fom: '2021-06-01', tom: '2021-06-03' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingStartDate()).toEqual(new Date('2021-04-01'));
        });
    });

    describe('getSykmeldingEndDate', () => {
        it('Gets tom of the latest period', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingEndDate()).toEqual(new Date('2021-06-03'));
        });
    });

    describe('getSykmeldingperioderSorted', () => {
        it('Gets tom of the latest period', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getSykmeldingperioderSorted()).toEqual([
                { fom: new Date('2021-04-01'), tom: new Date('2021-04-03') },
                { fom: new Date('2021-05-01'), tom: new Date('2021-05-03') },
                { fom: new Date('2021-06-01'), tom: new Date('2021-06-03') },
            ]);
        });
    });

    describe('getReadableSykmeldingLength', () => {
        it('Lenght is one day', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [{ fom: '2021-06-01', tom: '2021-06-01' }],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. juni 2021');
        });

        it('Within same year', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-05-01', tom: '2021-05-03' },
                    { fom: '2021-04-01', tom: '2021-04-03' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. april - 3. juni 2021');
        });

        it('Within same year and month', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2021-06-20', tom: '2021-06-24' },
                    { fom: '2021-06-01', tom: '2021-06-03' },
                    { fom: '2021-06-06', tom: '2021-06-09' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('1. - 24. juni 2021');
        });

        it('Different years', () => {
            const sykmeldingJson = {
                ...minimalSykmelding,
                sykmeldingsperioder: [
                    { fom: '2020-12-25', tom: '2020-12-31' },
                    { fom: '2021-01-01', tom: '2021-01-06' },
                ],
            };
            const sykmelding = new Sykmelding(sykmeldingJson);
            expect(sykmelding.getReadableSykmeldingLength()).toBe('25. desember 2020 - 6. januar 2021');
        });
    });
});
