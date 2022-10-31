import { StatusEvent, SykmeldingStatus } from '../fetching/graphql.generated'

import { sortSykmeldingerByArbeidsgiver } from './sykmeldingSortUtils'
import { createSykmelding } from './test/dataUtils'

describe('sortSykmeldingerByArbeidsgiver', () => {
    it('should sort by orgNavn', () => {
        const result = sortSykmeldingerByArbeidsgiver([
            createSykmelding({
                sykmeldingStatus: createSykmeldingStatusWithArbeidsgiver('Garbeidsgiver'),
            }),
            createSykmelding({
                sykmeldingStatus: createSykmeldingStatusWithArbeidsgiver('Arbeidsgiversen'),
            }),
            createSykmelding({
                sykmeldingStatus: createSykmeldingStatusWithArbeidsgiver('Ågardsson Arbeidsgiver'),
            }),
        ])

        expect(result.map((sykmelding) => sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn)).toEqual([
            'Arbeidsgiversen',
            'Garbeidsgiver',
            'Ågardsson Arbeidsgiver',
        ])
    })
})

function createSykmeldingStatusWithArbeidsgiver(orgNavn: string): SykmeldingStatus {
    return {
        __typename: 'SykmeldingStatus',
        timestamp: '2020-01-01',
        statusEvent: StatusEvent.Apen,
        sporsmalOgSvarListe: [],
        arbeidsgiver: {
            __typename: 'ArbeidsgiverStatus',
            orgNavn,
            juridiskOrgnummer: '123',
            orgnummer: '123',
        },
    }
}
