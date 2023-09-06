import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import mockRouter from 'next-router-mock'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/react'
import { MockedResponse } from '@apollo/client/testing'

import { render, screen, Screen, waitFor } from '../../utils/test/testUtils'
import {
    createEgenmeldingsdagerSporsmal,
    createMock,
    createSykmelding,
    createSykmeldingPeriode,
    createSykmeldingStatus,
} from '../../utils/test/dataUtils'
import {
    ArbeidsgiverStatus,
    EndreEgenmeldingsdagerDocument,
    Periodetype,
    StatusEvent,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    SykmeldingFragment,
} from '../../fetching/graphql.generated'

import EndreEgenmeldingsdagerPage from './endre-egenmeldingsdager.page'

const arbeidsgiver: ArbeidsgiverStatus = {
    __typename: 'ArbeidsgiverStatus',
    orgNavn: 'Arbeidsgiver AS',
    orgnummer: '69',
}

describe('endre egenmeldingsdager page', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id/endre-egenmeldingsdager`)
        vi.stubGlobal('innerWidth', 766)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    function setup(input: SykmeldingFragment | SykmeldingFragment[], mutationMocks: MockedResponse[] = []): void {
        const sykmeldinger = Array.isArray(input) ? input : [input]

        render(<EndreEgenmeldingsdagerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmeldinger[sykmeldinger.length - 1] } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: sykmeldinger } },
                }),
                ...mutationMocks,
            ],
        })
    }

    describe('given a single egenmeldingperiod', () => {
        const sykmeldingWith1EgenmeldingPeriod = createSykmelding({
            id: 'sykmelding-id',
            sykmeldingsperioder: [
                createSykmeldingPeriode({
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    fom: '2020-05-01',
                    tom: '2020-05-10',
                }),
            ],
            sykmeldingStatus: createSykmeldingStatus({
                statusEvent: StatusEvent.SENDT,
                arbeidsgiver,
                sporsmalOgSvarListe: [createEgenmeldingsdagerSporsmal(['2020-04-28', '2020-04-29'])],
            }),
        })

        it('shall correctly display the summary', async () => {
            setup(sykmeldingWith1EgenmeldingPeriod)

            expect(
                await screen.findRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 2 egenmeldingsdager' })).toHaveTextContent(
                /28. april 2020(.*)29. april 2020/,
            )

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 12. - 14. april 2020/ },
                    { name: 'Nei' },
                ),
            ).toBeChecked()
        })

        it('editing the period should work as expected', async () => {
            setup(sykmeldingWith1EgenmeldingPeriod, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: sykmeldingWith1EgenmeldingPeriod.id,
                            egenmeldingsdager: ['2020-04-26', '2020-04-27', '2020-04-29'],
                        },
                    },
                    result: {
                        data: { __typename: 'Mutation', updateEgenmeldingsdager: sykmeldingWith1EgenmeldingPeriod },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 2 egenmeldingsdager/ })).toBeInTheDocument()

            const section = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            await userEvent.click(section.getByRole('button', { name: 'Endre' }))
            await clickDays(
                section,
                // Untoggling this date
                /28\. april/,
                // Adding these
                /27\. april/,
                /26\. april/,
            )
            await userEvent.click(section.getByRole('button', { name: 'Videre' }))

            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 10. - 14. april 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })

        it('editing the period and adding a new period should work as expected', async () => {
            setup(sykmeldingWith1EgenmeldingPeriod, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: sykmeldingWith1EgenmeldingPeriod.id,
                            egenmeldingsdager: [
                                '2020-04-11',
                                '2020-04-12',
                                '2020-04-13',
                                '2020-04-14',
                                '2020-04-26',
                                '2020-04-28',
                                '2020-04-29',
                            ],
                        },
                    },
                    result: {
                        data: { __typename: 'Mutation', updateEgenmeldingsdager: sykmeldingWith1EgenmeldingPeriod },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 2 egenmeldingsdager/ })).toBeInTheDocument()

            const section = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            await userEvent.click(section.getByRole('button', { name: 'Endre' }))
            await clickDays(section, /26\. april/)
            await userEvent.click(section.getByRole('button', { name: 'Videre' }))

            const newSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 10. - 14. april 2020/,
                }),
            )

            await userEvent.click(newSection.getByRole('radio', { name: 'Ja' }))
            await clickDays(newSection, /11\. april/, /12\. april/, /13\. april/, /14\. april/)
            await userEvent.click(newSection.getByRole('button', { name: 'Videre' }))

            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 26. mars - 9. april 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })
    })

    describe('given two egenmeldingperiods', () => {
        const sykmeldingWith2EgenmeldingPeriods = createSykmelding({
            id: 'sykmelding-id',
            sykmeldingsperioder: [
                createSykmeldingPeriode({
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    fom: '2020-05-01',
                    tom: '2020-05-10',
                }),
            ],
            sykmeldingStatus: createSykmeldingStatus({
                statusEvent: StatusEvent.SENDT,
                arbeidsgiver,
                sporsmalOgSvarListe: [createEgenmeldingsdagerSporsmal(['2020-04-12', '2020-04-28', '2020-04-29'])],
            }),
        })

        it('shall correctly display the summary', async () => {
            setup(sykmeldingWith2EgenmeldingPeriods)

            expect(
                await screen.findRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 2 egenmeldingsdager' })).toHaveTextContent(
                /28. april 2020(.*)29. april 2020/,
            )

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 12. - 14. april 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 1 egenmeldingsdag' })).toHaveTextContent(
                /12. april 2020/,
            )

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 27. mars - 11. april 2020/ },
                    { name: 'Nei' },
                ),
            ).toBeChecked()
        })

        it('adding a new period on top of the existing periods should work as expected', async () => {
            setup(sykmeldingWith2EgenmeldingPeriods, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: sykmeldingWith2EgenmeldingPeriods.id,
                            egenmeldingsdager: ['2020-04-03', '2020-04-06', '2020-04-12', '2020-04-28', '2020-04-29'],
                        },
                    },
                    result: {
                        data: { __typename: 'Mutation', updateEgenmeldingsdager: sykmeldingWith2EgenmeldingPeriods },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 1 egenmeldingsdag/ })).toBeInTheDocument()

            const section = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 27. mars - 11. april 2020/,
                }),
            )

            await userEvent.click(section.getByRole('radio', { name: 'Ja' }))
            await clickDays(section, /^3\. april/, /^6\. april/)
            await userEvent.click(section.getByRole('button', { name: 'Videre' }))

            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 18. - 26. mars 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })
    })

    describe('given three egenmeldingperiods', () => {
        const sykmeldingWith3EgenemeldingsPeriods = createSykmelding({
            id: 'sykmelding-id',
            sykmeldingsperioder: [
                createSykmeldingPeriode({
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    fom: '2020-05-01',
                    tom: '2020-05-10',
                }),
            ],
            sykmeldingStatus: createSykmeldingStatus({
                statusEvent: StatusEvent.SENDT,
                arbeidsgiver,
                sporsmalOgSvarListe: [
                    createEgenmeldingsdagerSporsmal([
                        '2020-03-26',
                        '2020-04-02',
                        '2020-04-12',
                        '2020-04-15',
                        '2020-04-18',
                        '2020-04-29',
                    ]),
                ],
            }),
        })

        it('shall correctly display the summary', async () => {
            setup(sykmeldingWith3EgenemeldingsPeriods)

            expect(
                await screen.findRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 3 egenmeldingsdager' })).toHaveTextContent(
                /15. april 2020(.*)18. april 2020(.*)29. april 2020/,
            )

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 30. mars - 14. april 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 2 egenmeldingsdager' })).toHaveTextContent(
                /2. april 2020(.*)12. april 2020/,
            )

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 17. - 29. mars 2020/ },
                    { name: 'Ja' },
                ),
            ).toBeChecked()
            expect(screen.getByRole('list', { name: 'Du brukte 1 egenmeldingsdag' })).toHaveTextContent(/26. mars 2020/)

            expect(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 10. - 16. mars 2020/ },
                    { name: 'Nei' },
                ),
            ).toBeChecked()
        })

        it('editing the last of 3 periods should work as expected', async () => {
            setup(sykmeldingWith3EgenemeldingsPeriods, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: sykmeldingWith3EgenemeldingsPeriods.id,
                            egenmeldingsdager: [
                                '2020-03-23',
                                '2020-03-25',
                                '2020-03-26',
                                '2020-04-02',
                                '2020-04-12',
                                '2020-04-15',
                                '2020-04-18',
                                '2020-04-29',
                            ],
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            updateEgenmeldingsdager: sykmeldingWith3EgenemeldingsPeriods,
                        },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 1 egenmeldingsdag/ })).toBeInTheDocument()

            const lastSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 17. - 29. mars 2020/,
                }),
            )

            // Add some new days to the third section
            await userEvent.click(lastSection.getByRole('button', { name: 'Endre' }))
            await clickDays(lastSection, /25\. mars/, /23\. mars/)
            await userEvent.click(lastSection.getByRole('button', { name: 'Videre' }))

            // We have to select no for the fourth section again since the form state is nuked from the n-th section.
            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 7. - 16. mars 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })

        it('editing the first of 3 periods should work as expected when you stop at the first', async () => {
            setup(sykmeldingWith3EgenemeldingsPeriods, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            egenmeldingsdager: ['2020-04-15', '2020-04-16', '2020-04-18', '2020-04-29'],
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            updateEgenmeldingsdager: sykmeldingWith3EgenemeldingsPeriods,
                        },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 3 egenmeldingsdag/ })).toBeInTheDocument()

            const lastSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            // Add some new days to the first section
            await userEvent.click(lastSection.getByRole('button', { name: 'Endre' }))
            await clickDays(lastSection, /16\. april/)
            await userEvent.click(lastSection.getByRole('button', { name: 'Videre' }))

            // Select NO on the second section, so we should end up with only a single section
            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 30. mars - 14. april 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })

        it('editing the first of 3 periods should work as expected when you re-fill out the second period', async () => {
            setup(sykmeldingWith3EgenemeldingsPeriods, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            egenmeldingsdager: [
                                '2020-04-03',
                                '2020-04-14',
                                '2020-04-15',
                                '2020-04-17',
                                '2020-04-18',
                                '2020-04-29',
                            ],
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            updateEgenmeldingsdager: sykmeldingWith3EgenemeldingsPeriods,
                        },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 3 egenmeldingsdag/ })).toBeInTheDocument()

            const lastSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            // Add some new days to the first section
            await userEvent.click(lastSection.getByRole('button', { name: 'Endre' }))
            await clickDays(lastSection, /17\. april/)
            await userEvent.click(lastSection.getByRole('button', { name: 'Videre' }))

            const secondSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 30. mars - 14. april 2020/,
                }),
            )

            // Fill out the second section, which is now empty
            await userEvent.click(secondSection.getByRole('radio', { name: 'Ja' }))
            await clickDays(secondSection, /^3\. april/, /14\. april/)
            await userEvent.click(secondSection.getByRole('button', { name: 'Videre' }))

            // Select NO on the third section, so we should end up with only two sections worth of dates
            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 18. - 29. mars 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })

        it('setting the first question to no should remove all egenmeldinsgdager', async () => {
            setup(sykmeldingWith3EgenemeldingsPeriods, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            egenmeldingsdager: [],
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            updateEgenmeldingsdager: sykmeldingWith3EgenemeldingsPeriods,
                        },
                    },
                }),
            ])

            expect(await screen.findByRole('heading', { name: /Du brukte 3 egenmeldingsdag/ })).toBeInTheDocument()

            const lastSection = within(
                screen.getByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            // Add some new days to the first section
            await userEvent.click(lastSection.getByRole('button', { name: 'Endre' }))
            await userEvent.click(lastSection.getByRole('radio', { name: 'Nei' }))

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })
    })

    describe('given no existing egenmeldingsperiod (e.g. user did not send any to begin with)', () => {
        const sykmeldingWithNoExistingEgenmeldingsdager = createSykmelding({
            id: 'sykmelding-id',
            sykmeldingsperioder: [
                createSykmeldingPeriode({
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    fom: '2020-05-01',
                    tom: '2020-05-10',
                }),
            ],
            sykmeldingStatus: createSykmeldingStatus({
                statusEvent: StatusEvent.SENDT,
                arbeidsgiver,
                sporsmalOgSvarListe: [],
            }),
        })

        it('should be allowed to edit and render initial input', async () => {
            setup(sykmeldingWithNoExistingEgenmeldingsdager, [])

            expect(
                await screen.findRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                    { name: 'Ja' },
                ),
            ).not.toBeChecked()
            expect(
                await screen.findRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                    { name: 'Nei' },
                ),
            ).not.toBeChecked()
        })

        it('should be able to add egenmeldinsgdager', async () => {
            setup(sykmeldingWithNoExistingEgenmeldingsdager, [
                createMock({
                    request: {
                        query: EndreEgenmeldingsdagerDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            egenmeldingsdager: ['2020-04-17', '2020-04-23'],
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            updateEgenmeldingsdager: sykmeldingWithNoExistingEgenmeldingsdager,
                        },
                    },
                }),
            ])

            const section = within(
                await screen.findByRole('region', {
                    name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/,
                }),
            )

            await userEvent.click(section.getByRole('radio', { name: 'Ja' }))
            await clickDays(section, /^17\. april/, /23\. april/)
            await userEvent.click(section.getByRole('button', { name: 'Videre' }))

            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 1. - 14. april 2020/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })
    })

    describe('given that the sykmelding is right up against the previous sykmelding', () => {
        it('should be warned that this sykmelding does not require egenmeldingsdager', async () => {
            const sykmeldingWithoutEgenmeldingssporsmal = createSykmelding({
                id: 'sykmelding-id',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                        fom: '2020-05-01',
                        tom: '2020-05-10',
                    }),
                ],
                sykmeldingStatus: createSykmeldingStatus({
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver,
                    sporsmalOgSvarListe: [],
                }),
            })
            const previousSykmelding = createSykmelding({
                id: 'previous-id',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                        fom: '2020-04-15',
                        tom: '2020-04-30',
                    }),
                ],
                sykmeldingStatus: createSykmeldingStatus({
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver,
                    sporsmalOgSvarListe: [],
                }),
            })

            setup([previousSykmelding, sykmeldingWithoutEgenmeldingssporsmal])

            expect(await screen.findByRole('heading', { name: 'Sykmeldingen gjelder' })).toBeInTheDocument()
            expect(
                await screen.findByRole('heading', {
                    name: 'Du kan ikke legge til egenmeldingsdager på denne sykmeldingen.',
                }),
            ).toBeInTheDocument()
        })
    })
})

export async function clickDays(
    section: Screen | ReturnType<typeof within>,
    ...days: (string | RegExp)[]
): Promise<void> {
    for (const day of days) {
        await userEvent.click(section.getByRole('button', { name: day }))
    }
}
