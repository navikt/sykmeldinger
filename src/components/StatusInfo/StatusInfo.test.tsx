import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Periode from '../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../models/Sykmelding/SykmeldingStatus';
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

    describe('Avventende', () => {
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
    });

    describe('Papirsøknad', () => {
        describe('SENDT', () => {
            it('Gradert reisetilskudd renders papir info', () => {
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
                expect(screen.queryByText(/Hør med arbeidsgiveren din/)).not.toBeInTheDocument();
            });

            it('Reisetilskudd in combination with another period type renders papirinfo', () => {
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
                expect(screen.queryByText(/Hør med arbeidsgiveren din/)).not.toBeInTheDocument();
            });

            it('Arbeidstaker with reisetilskudd in combination with another period type renders papirinfo with infor for arbeidstaker', () => {
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
                                svar: 'ARBEIDSTAKER',
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
                expect(screen.getByText(/Hør med arbeidsgiveren din/)).toBeInTheDocument();
            });

            it('Does not render arbeidstaker info for other arbeidssiuasjon', () => {
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
                expect(screen.queryByText(/Hør med arbeidsgiveren din/)).not.toBeInTheDocument();
            });
        });

        describe('BEKREFTET', () => {
            it('Gradert reisetilskudd renders papirinfo', () => {
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
                expect(screen.queryByText(/Hør med arbeidsgiveren din/)).not.toBeInTheDocument();
            });

            it('Reisetilskudd in combination with another period type renders papirinfor', () => {
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
                expect(screen.queryByText(/Hør med arbeidsgiveren din/)).not.toBeInTheDocument();
            });
        });
    });

    describe('Standard digital søknad', () => {
        describe('SENDT', () => {
            it('Single reisetilskudd periode not in combination with another period type renders standard info', () => {
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

            it('Renders standard info with freelancer info for FRILANSER', () => {
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

            it('Renders standard info with frilanser info for NAERINGSDRIVENDE', () => {
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
                                svar: 'NAERINGSDRIVENDE',
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

            it('Renders standard info without frilanser info for ARBEIDSLEDIG', () => {
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
                                svar: 'ARBEIDSLEDIG',
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

        describe('BEKREFTET', () => {
            it('Single reisetilskudd periode not in combination with another period type renders standard info', () => {
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

            it('Renders standard info with freelancer info for FRILANSER', () => {
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

            it('Renders standard info with frilanser info for NAERINGSDRIVENDE', () => {
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
                                svar: 'NAERINGSDRIVENDE',
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

            it('Renders standard info without frilanser info for ARBEIDSLEDIG', () => {
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
                                svar: 'ARBEIDSLEDIG',
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
});
