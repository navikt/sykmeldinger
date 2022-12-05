import { render, screen } from '@testing-library/react'

import {
    AktivitetIkkeMuligPeriode,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../../../fetching/graphql.generated'

import AktivitetIkkeMuligView from './AktivitetIkkeMuligView'

describe('AktivitetIkkeMuligView', () => {
    it('Render arbeidsrelatert arsak for arbeidsgiver view', () => {
        const periode: AktivitetIkkeMuligPeriode = {
            __typename: 'AktivitetIkkeMuligPeriode',
            medisinskArsak: {
                __typename: 'MedisinskArsak',
                beskrivelse: 'medisinsk beskrivelse',
                arsak: [MedisinskArsakType.TILSTAND_HINDRER_AKTIVITET],
            },
            arbeidsrelatertArsak: {
                __typename: 'ArbeidsrelatertArsak',
                beskrivelse: 'arbeidsrelatert beskrivelse',
                arsak: [ArbeidsrelatertArsakType.MANGLENDE_TILRETTELEGGING],
            },
        }

        render(<AktivitetIkkeMuligView aktivitetIkkeMulig={periode} />)

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument()
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument()
        expect(screen.getByText('arbeidsrelatert beskrivelse')).toBeInTheDocument()
    })
})
