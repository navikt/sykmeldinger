import { render, screen } from '@testing-library/react';

import {
    Merknad,
    Periode,
    Periodetype,
    ShortName,
    StatusEvent,
    Svartype,
    SykmeldingStatus,
} from '../../fetching/graphql.generated';
import { Merknadtype } from '../InformationBanner/InformationBanner';

import StatusInfo from './StatusInfo';

describe('StatusInfo', () => {
    it('Renders nothing when status is not SENDT or BEKREFTET', () => {
        const sykmeldingStatus: SykmeldingStatus = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.Apen,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };

        render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[]} sykmeldingMerknader={[]} />);
        expect(screen.queryByTestId('status-info')).not.toBeInTheDocument();
    });

    describe('Avventende', () => {
        it('Renders avventende info when status is SENDT and periode is AVVENTENDE', () => {
            const sykmeldingStatus: SykmeldingStatus = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.Sendt,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const avventendePeriode: Periode = {
                __typename: 'Periode',
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: Periodetype.Avventende,
                reisetilskudd: false,
                gradert: null,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
            };

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
            const sykmeldingStatus: SykmeldingStatus = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.Bekreftet,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const avventendePeriode: Periode = {
                __typename: 'Periode',
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: Periodetype.Avventende,
                reisetilskudd: false,
                gradert: null,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
            };
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
            const sykmeldingStatus: SykmeldingStatus = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.Sendt,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            };
            const merknad: Merknad = {
                __typename: 'Merknad',
                type: Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
                beskrivelse: null,
            };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    reisetilskudd: true,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AktivitetIkkeMulig,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'ARBEIDSTAKER',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AktivitetIkkeMulig,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'FRILANSER',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'NAERINGSDRIVENDE',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'ARBEIDSLEDIG',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Sendt,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                };
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Gradert,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AktivitetIkkeMulig,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'FRILANSER',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'NAERINGSDRIVENDE',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'ARBEIDSLEDIG',
                            },
                        },
                    ],
                };
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Reisetilskudd,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'NAERINGSDRIVENDE',
                            },
                        },
                    ],
                };
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Gradert,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                };
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
                const sykmeldingStatus: SykmeldingStatus = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.Bekreftet,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.Arbeidssituasjon,
                            svar: {
                                __typename: 'Svar',
                                svarType: Svartype.Arbeidssituasjon,
                                svar: 'ARBEIDSLEDIG',
                            },
                        },
                    ],
                };
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.Gradert,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                };
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
