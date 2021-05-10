import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Periode from '../../../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../../../models/Sykmelding/SykmeldingStatus';
import StatusInfo from './StatusInfo';

describe('StatusInfo', () => {
    it('Renders nothing when status is not SENDT or BEKREFTET', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'APEN',
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[]} />);
        expect(screen.queryByTestId('status-info')).not.toBeInTheDocument();
    });

    describe('status SENDT', () => {
        it('Renders avventende info when status is SENDT and periode is AVVENTENDE', () => {
            const plainSykmeldingStatus = {
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
            const plainPeriode = {
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: 'AVVENTENDE',
                reisetilskudd: false,
            };
            const avventendePeriode = new Periode(plainPeriode);
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[avventendePeriode]} />);
            expect(screen.getByText(/Du har sendt beskjed til arbeidsgiveren din/)).toBeInTheDocument();
            expect(
                screen.getByText(/Husk at du har mulighet til å lage en digital oppfølgingsplan/),
            ).toBeInTheDocument();
        });

        it('Renders papir info when status is SENDT and periode is gradert reisetilskudd', () => {
            const plainSykmeldingStatus = {
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
            const plainPeriode = {
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'GRADERT',
                gradert: {
                    grad: 80,
                    reisetilskudd: true,
                },
                reisetilskudd: false,
            };
            const gradertPeriode = new Periode(plainPeriode);
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[gradertPeriode]} />);
            expect(screen.getByText('Du må gjøre resten på papir')).toBeInTheDocument();
        });

        it('Renders papir info when status is SENDT and periode is reisetilskudd in combination with another period type', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            const aktivitetIkkeMuligPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'AKTIVITET_IKKE_MULIG',
                reisetilskudd: false,
                aktivitetIkkeMulig: {},
            });
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[reisetilskuddPeriode, aktivitetIkkeMuligPeriode]}
                />,
            );
            expect(screen.getByText('Du må gjøre resten på papir')).toBeInTheDocument();
        });

        it('Renders standard info when status is SENDT and single reisetilskudd periode not in combination with another period type', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
        });

        it('Renders standard info with freelancer info when status SENDT and arbeidssituasjon is FRILANSER', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'FRILANSER',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(screen.getByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/)).toBeInTheDocument();
        });

        it('Renders standard info with frilanser info when status SENDT and arbeidssituasjon is SELVSTENDIG_NARINGSDRIVENDE', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'SELVSTENDIG_NARINGSDRIVENDE',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(screen.getByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/)).toBeInTheDocument();
        });

        it('Renders standard info without frilanser info when status SENDT and arbeidssituasjon is different from FRILANSER and SELVSTENDIG_NARINGSDRIVENDE', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'ANNET',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(
                screen.queryByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/),
            ).not.toBeInTheDocument();
        });
    });

    describe('status BEKREFTET', () => {
        it('Renders nothing when status is BEKREFTET and periode is AVVENTENDE', () => {
            const plainSykmeldingStatus = {
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
            const plainPeriode = {
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: 'AVVENTENDE',
                reisetilskudd: false,
            };
            const avventendePeriode = new Periode(plainPeriode);
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[avventendePeriode]} />);
            expect(screen.queryByTestId('status-info')).not.toBeInTheDocument();
        });

        it('Renders papir info when status is BEKREFTET and periode is gradert reisetilskudd', () => {
            const plainSykmeldingStatus = {
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
            const plainPeriode = {
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'GRADERT',
                gradert: {
                    grad: 80,
                    reisetilskudd: true,
                },
                reisetilskudd: false,
            };
            const gradertPeriode = new Periode(plainPeriode);
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[gradertPeriode]} />);
            expect(screen.getByText('Du må gjøre resten på papir')).toBeInTheDocument();
        });

        it('Renders papir info when status is BEKREFTET and periode is reisetilskudd in combination with another period type', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            const aktivitetIkkeMuligPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'AKTIVITET_IKKE_MULIG',
                reisetilskudd: false,
                aktivitetIkkeMulig: {},
            });
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[reisetilskuddPeriode, aktivitetIkkeMuligPeriode]}
                />,
            );
            expect(screen.getByText('Du må gjøre resten på papir')).toBeInTheDocument();
        });

        it('Renders standard info when status is BEKREFTET and single reisetilskudd periode not in combination with another period type', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
        });

        it('Renders standard info with freelancer info when status BEKREFTET and arbeidssituasjon is FRILANSER', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'FRILANSER',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(screen.getByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/)).toBeInTheDocument();
        });

        it('Renders standard info with frilanser info when status BEKREFTET and arbeidssituasjon is SELVSTENDIG_NARINGSDRIVENDE', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'SELVSTENDIG_NARINGSDRIVENDE',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(screen.getByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/)).toBeInTheDocument();
        });

        it('Renders standard info without frilanser info when status BEKREFTET and arbeidssituasjon is different from FRILANSER and SELVSTENDIG_NARINGSDRIVENDE', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'BEKREFTET',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [
                    {
                        tekst: 'sporsmalstekst',
                        shortName: 'ARBEIDSSITUASJON',
                        svar: {
                            svarType: 'ARBEIDSSITUASJON',
                            svar: 'ANNET',
                        },
                    },
                ],
            });
            const reisetilskuddPeriode = new Periode({
                fom: '2021-05-01',
                tom: '2021-05-05',
                type: 'REISETILSKUDD',
                reisetilskudd: true,
            });
            render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[reisetilskuddPeriode]} />);
            expect(screen.getByText(/Neste steg blir å sende inn søknaden/)).toBeInTheDocument();
            expect(
                screen.queryByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/),
            ).not.toBeInTheDocument();
        });
    });
});
