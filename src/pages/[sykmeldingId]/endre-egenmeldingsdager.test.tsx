import React from 'react'
import mockRouter from 'next-router-mock'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/react'
import { MockedResponse } from '@apollo/client/testing'

import { render, screen, waitFor } from '../../utils/test/testUtils'
import {
    createMock,
    createSykmelding,
    createSykmeldingPeriode,
    createSykmeldingStatus,
} from '../../utils/test/dataUtils'
import {
    ArbeidsgiverStatus,
    EndreEgenmeldingsdagerDocument,
    Periodetype,
    ShortName,
    StatusEvent,
    Svartype,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    SykmeldingFragment,
    SykmeldingStatusFragment,
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
    })

    function setup(input: SykmeldingFragment | SykmeldingFragment[], mutationMocks: MockedResponse[] = []): void {
        const sykmeldinger = Array.isArray(input) ? input : [input]

        render(<EndreEgenmeldingsdagerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmeldinger[0] } },
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
        it('shall correctly display the summary', async () => {
            const sykmelding = createSykmelding({
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

            setup(sykmelding)

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
    })

    describe('given two egenmeldingperiods', () => {
        it('shall correctly display the summary', async () => {
            const sykmelding = createSykmelding({
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

            setup(sykmelding)

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
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 10. - 16. mars 2020?/ },
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
                                '2020-04-15',
                                '2020-04-18',
                                '2020-04-29',
                                '2020-04-02',
                                '2020-04-12',
                                '2020-03-26',
                                '2020-03-25',
                                '2020-03-23',
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
            await userEvent.click(lastSection.getByRole('button', { name: /25\. mars/ }))
            await userEvent.click(lastSection.getByRole('button', { name: /23\. mars/ }))
            await userEvent.click(lastSection.getByRole('button', { name: 'Videre' }))

            // We have to select no for the fourth section again since the form state is nuked from the n-th section.
            await userEvent.click(
                screen.getRadioInGroup(
                    { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 7. - 16. mars 2020?/ },
                    { name: 'Nei' },
                ),
            )

            await userEvent.click(await screen.findByRole('button', { name: 'Registrer endringene' }))
            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        })
    })
})

function createEgenmeldingsdagerSporsmal(dates: string[]): SykmeldingStatusFragment['sporsmalOgSvarListe'][0] {
    return {
        __typename: 'Sporsmal',
        tekst: '',
        shortName: ShortName.EGENMELDINGSDAGER,
        svar: {
            __typename: 'DagerSvar',
            svarType: Svartype.DAGER,
            dager: dates,
        },
    }
}
