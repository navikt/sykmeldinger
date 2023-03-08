import React from 'react'
import mockRouter from 'next-router-mock'

import { render, screen } from '../../utils/test/testUtils'
import {
    createMock,
    createSykmelding,
    createSykmeldingPeriode,
    createSykmeldingStatus,
} from '../../utils/test/dataUtils'
import {
    ArbeidsgiverStatus,
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

    function setup(input: SykmeldingFragment | SykmeldingFragment[], sykmeldingByIdIndex = 0): void {
        const sykmeldinger = Array.isArray(input) ? input : [input]

        render(<EndreEgenmeldingsdagerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmeldinger[sykmeldingByIdIndex] } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: sykmeldinger } },
                }),
            ],
        })
    }

    describe('when displaying existing egenmeldingsdager', () => {
        it('shall correctly handle a single period', async () => {
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

        it('shall correctly handle a two periods', async () => {
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

        it('shall correctly handle a three periods', async () => {
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

            setup(sykmelding)

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
