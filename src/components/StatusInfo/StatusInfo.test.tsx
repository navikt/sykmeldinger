import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Periode from '../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../models/Sykmelding/SykmeldingStatus';
import StatusInfo from './StatusInfo';
import Merknad from '../../models/Sykmelding/Merknad';
import { Merknadtype } from '../InformationBanner/InformationBanner';

describe('StatusInfo', () => {
    it('Renders nothing when status is not SENDT or BEKREFTET', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'APEN',
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[]} sykmeldingMerknader={[]} />);
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
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[avventendePeriode]}
                    sykmeldingMerknader={[]}
                />,
            );
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
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[avventendePeriode]}
                    sykmeldingMerknader={[]}
                />,
            );
            expect(screen.queryByTestId('status-info')).not.toBeInTheDocument();
        });
    });

    describe('Tilbakedatert under behandling', () => {
        it('Renders under behandling info when status is SENDT and has merknad of type TILBAKEDATERING_UNDER_BEHANDLING', () => {
            const sykmeldingStatus = new SykmeldingStatus({
                statusEvent: 'SENDT',
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            });
            const merknad = new Merknad({
                type: Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
                beskrivelse: null,
            });
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[]}
                    sykmeldingMerknader={[merknad]}
                />,
            );
            expect(
                screen.getByText(/Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over/),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere om det var en gyldig grunn til dette/,
                ),
            ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
            });

            it('Reisetilskudd in combination with another period type renders standard info', () => {
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
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
            });

            it('Ansatt with reisetilskudd in combination with another period type renders standard info', () => {
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
                                svar: 'ANSATT',
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
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
                expect(
                    screen.queryByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/),
                ).not.toBeInTheDocument();
            });

            it('Gradert reisetilskudd renders standard info', () => {
                const sykmeldingStatus = new SykmeldingStatus({
                    statusEvent: 'SENDT',
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                });
                const gradertReisetilskuddPeriode = new Periode({
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: 'GRADERT',
                    gradert: {
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                });
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
            });

            it('Reisetilskudd in combination with another period type renders standard info', () => {
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
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
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
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
                expect(
                    screen.queryByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/),
                ).not.toBeInTheDocument();
            });

            it('Renders standard info with frilanser info for gradert reisetilskudd NAERINGSDRIVENDE', () => {
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
                const gradertReisetilskuddPeriode = new Periode({
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: 'GRADERT',
                    gradert: {
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                });
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
                expect(screen.getByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/)).toBeInTheDocument();
            });

            it('Renders standard info without frilanser info for gradert reisetilskudd ARBEIDSLEDIG', () => {
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
                const gradertReisetilskuddPeriode = new Periode({
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: 'GRADERT',
                    gradert: {
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                });
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                );
                expect(
                    screen.getByText(/Når sykefraværet er over, får du en melding fra oss igjen/),
                ).toBeInTheDocument();
                expect(
                    screen.queryByText(/Husk at NAV ikke dekker sykepenger de første 16 dagene/),
                ).not.toBeInTheDocument();
            });
        });
    });
});
