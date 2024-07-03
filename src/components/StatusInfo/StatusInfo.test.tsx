import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
    ArbeidssituasjonType,
    Merknad,
    Merknadtype,
    Periode,
    Periodetype,
    ShortName,
    StatusEvent,
    Svartype,
    SykmeldingStatusFragment,
    YesOrNo,
} from 'queries'

import StatusInfo from './StatusInfo'

const sjekkEos = (): void => {
    expect(screen.getByText('Skal du reise utenfor EU/EØS når du er sykmeldt?')).toBeInTheDocument()
    const oppholdUtlandUrl = 'http://example.com/sykepengesoknad-utland'
    expect(
        screen
            .getByRole('link', {
                name: /Les mer om reise utenfor EU/,
            })
            ?.attributes?.getNamedItem('href')?.value,
    ).toEqual(oppholdUtlandUrl)
}

describe('StatusInfo', () => {
    it('Renders nothing when status is not SENDT or BEKREFTET', () => {
        const sykmeldingStatus: SykmeldingStatusFragment = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.APEN,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }

        render(<StatusInfo sykmeldingStatus={sykmeldingStatus} sykmeldingsperioder={[]} sykmeldingMerknader={[]} />)
        expect(screen.queryByTestId('status-info')).not.toBeInTheDocument()
    })

    describe('Avventende', () => {
        it('Renders avventende info when status is SENDT and periode is AVVENTENDE', () => {
            const sykmeldingStatus: SykmeldingStatusFragment = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.SENDT,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            }
            const avventendePeriode: Periode = {
                __typename: 'Periode',
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: Periodetype.AVVENTENDE,
                reisetilskudd: false,
                gradert: null,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
            }

            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[avventendePeriode]}
                    sykmeldingMerknader={[]}
                />,
            )
            expect(screen.getByText(/Du har sendt beskjed til arbeidsgiveren din/)).toBeInTheDocument()
            expect(
                screen.getByText(/Husk at du har mulighet til å lage en digital oppfølgingsplan/),
            ).toBeInTheDocument()
        })

        it('Renders nothing when status is BEKREFTET and periode is AVVENTENDE', () => {
            const sykmeldingStatus: SykmeldingStatusFragment = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.BEKREFTET,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            }
            const avventendePeriode: Periode = {
                __typename: 'Periode',
                fom: '2021-05-01',
                tom: '2021-05-05',
                innspillTilArbeidsgiver: 'dette er et innspill',
                type: Periodetype.AVVENTENDE,
                reisetilskudd: false,
                gradert: null,
                behandlingsdager: null,
                aktivitetIkkeMulig: null,
            }
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[avventendePeriode]}
                    sykmeldingMerknader={[]}
                />,
            )
            expect(screen.queryByTestId('status-info')).not.toBeInTheDocument()
        })
    })

    describe('Tilbakedatert under behandling', () => {
        it('Renders under behandling info when status is SENDT and has merknad of type TILBAKEDATERING_UNDER_BEHANDLING', () => {
            const sykmeldingStatus: SykmeldingStatusFragment = {
                __typename: 'SykmeldingStatus',
                statusEvent: StatusEvent.SENDT,
                timestamp: '2021-05-01',
                arbeidsgiver: null,
                sporsmalOgSvarListe: [],
            }
            const merknad: Merknad = {
                __typename: 'Merknad',
                type: Merknadtype.UNDER_BEHANDLING,
                beskrivelse: null,
            }
            render(
                <StatusInfo
                    sykmeldingStatus={sykmeldingStatus}
                    sykmeldingsperioder={[]}
                    sykmeldingMerknader={[merknad]}
                />,
            )
            expect(
                screen.getByText(/Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over/),
            ).toBeInTheDocument()
            expect(
                screen.getByText(
                    /Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere om det var en gyldig grunn til dette/,
                ),
            ).toBeInTheDocument()
        })
    })

    describe('Standard digital søknad', () => {
        describe('SENDT', () => {
            it('Single reisetilskudd periode not in combination with another period type renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    reisetilskudd: true,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Reisetilskudd in combination with another period type renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode, aktivitetIkkeMuligPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Ansatt with reisetilskudd in combination with another period type renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode, aktivitetIkkeMuligPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info with freelancer info for FRILANSER', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.FRILANSER,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info with frilanser info for NAERINGSDRIVENDE', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info without frilanser info for ARBEIDSLEDIG', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Gradert reisetilskudd renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.SENDT,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                }
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.GRADERT,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })
        })

        describe('BEKREFTET', () => {
            it('Single reisetilskudd periode not in combination with another period type renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Reisetilskudd in combination with another period type renders standard info', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                const aktivitetIkkeMuligPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMuligPeriode',
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode, aktivitetIkkeMuligPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info with freelancer info for FRILANSER', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.FRILANSER,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info with frilanser info for NAERINGSDRIVENDE', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info without frilanser info for ARBEIDSLEDIG', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const reisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.REISETILSKUDD,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    gradert: null,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: true,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[reisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info with frilanser info for gradert reisetilskudd NAERINGSDRIVENDE', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.GRADERT,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })

            it('Renders standard info without frilanser info for gradert reisetilskudd ARBEIDSLEDIG', () => {
                const sykmeldingStatus: SykmeldingStatusFragment = {
                    __typename: 'SykmeldingStatus',
                    statusEvent: StatusEvent.BEKREFTET,
                    timestamp: '2021-05-01',
                    arbeidsgiver: null,
                    sporsmalOgSvarListe: [
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.ARBEIDSSITUASJON,
                            svar: {
                                __typename: 'ArbeidssituasjonSvar',
                                svarType: Svartype.ARBEIDSSITUASJON,
                                arbeidsituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                            },
                        },
                        {
                            __typename: 'Sporsmal',
                            tekst: 'sporsmalstekst',
                            shortName: ShortName.FORSIKRING,
                            svar: {
                                __typename: 'JaNeiSvar',
                                svarType: Svartype.JA_NEI,
                                jaNei: YesOrNo.NO,
                            },
                        },
                    ],
                }
                const gradertReisetilskuddPeriode: Periode = {
                    __typename: 'Periode',
                    fom: '2021-05-01',
                    tom: '2021-05-05',
                    type: Periodetype.GRADERT,
                    gradert: {
                        __typename: 'GradertPeriode',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                }
                render(
                    <StatusInfo
                        sykmeldingStatus={sykmeldingStatus}
                        sykmeldingsperioder={[gradertReisetilskuddPeriode]}
                        sykmeldingMerknader={[]}
                    />,
                )
                sjekkEos()
            })
        })
    })
})
