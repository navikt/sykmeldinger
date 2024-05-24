import { describe, it, expect } from 'vitest'

import { AktivitetIkkeMuligPeriode, ArbeidsrelatertArsakType, MedisinskArsakType } from 'queries'

import { render, screen, axe } from '../../../../utils/test/testUtils'

import AktivitetIkkeMulig from './AktivitetIkkeMulig'

describe('AktivitetIkkeMulig', () => {
    it('Renders aktivitet ikke mulig periode with specified medisinsk- and arbeidsrelatert arsak', async () => {
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

        const { container } = render(<AktivitetIkkeMulig aktivitetIkkeMulig={periode} isV3={false} parentId="test" />)

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument()
        expect(screen.getByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).toBeInTheDocument()
        expect(screen.getByText('medisinsk beskrivelse')).toBeInTheDocument()

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument()
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument()
        expect(screen.getByText('arbeidsrelatert beskrivelse')).toBeInTheDocument()

        // @ts-expect-error vitest-axe doesn't work with vitest v1
        expect(await axe(container)).toHaveNoViolations()
    })

    it('should display text if medisinskArsak and arbeidsrelatertArsak is missing', () => {
        const periode: AktivitetIkkeMuligPeriode = {
            __typename: 'AktivitetIkkeMuligPeriode',
            medisinskArsak: null,
            arbeidsrelatertArsak: null,
        }

        render(<AktivitetIkkeMulig aktivitetIkkeMulig={periode} isV3={false} parentId="test" />)
        expect(screen.getByText('Aktivitet på arbeidsplassen')).toBeInTheDocument()
        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument()
        expect(screen.getByText('Ikke utfylt av behandler')).toBeInTheDocument()
    })
})
