import { render, screen } from '@testing-library/react'

import {
    AktivitetIkkeMuligPeriode,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../../../fetching/graphql.generated'

import AktivitetIkkeMulig from './AktivitetIkkeMulig'

describe('AktivitetIkkeMulig', () => {
    it('Renders aktivitet ikke mulig periode with specified medisinsk- and arbeidsrelatert arsak', () => {
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

        render(<AktivitetIkkeMulig aktivitetIkkeMulig={periode} isV3={false} />)

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument()
        expect(screen.getByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).toBeInTheDocument()
        expect(screen.getByText('medisinsk beskrivelse')).toBeInTheDocument()

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument()
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument()
        expect(screen.getByText('arbeidsrelatert beskrivelse')).toBeInTheDocument()
    })

    it('should display title if medisinskArsak and arbeidsrelatertArsak is missing', () => {
        const periode: AktivitetIkkeMuligPeriode = {
            __typename: 'AktivitetIkkeMuligPeriode',
            medisinskArsak: null,
            arbeidsrelatertArsak: null,
        }

        render(<AktivitetIkkeMulig aktivitetIkkeMulig={periode} isV3={false} />)
        expect(screen.queryByText('Aktivitet på arbeidsplassen')).not.toBeInTheDocument()
    })
})
