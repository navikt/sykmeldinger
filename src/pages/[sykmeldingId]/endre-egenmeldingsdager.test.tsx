import React from 'react'
import mockRouter from 'next-router-mock'
import { logRoles } from '@testing-library/react'

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

    it('should display egenmelding form with the correct responses given a single period', async () => {
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

        render(<EndreEgenmeldingsdagerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmelding } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [sykmelding] } },
                }),
            ],
        })

        expect(
            await screen.findRadioInGroup(
                { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 15. - 30. april 2020/ },
                { name: 'Ja' },
            ),
        ).toBeInTheDocument()
        expect(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Arbeidsgiver AS i perioden 12. - 14. april 2020/ },
                { name: 'Ja' },
            ),
        ).toBeInTheDocument()

        logRoles(document.body)
        screen.openPlayground()
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
