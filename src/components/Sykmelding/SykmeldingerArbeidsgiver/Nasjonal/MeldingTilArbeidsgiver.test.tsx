import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import MeldingTilArbeidsgiverView from './MeldingTilArbeidsgiver'

describe('MeldingTilArbeidsgiver', () => {
    it('Renders melding til arbeidsgiver if present', () => {
        const meldingTilArbeidsgiver = 'melding til arbeidsgiver'
        render(<MeldingTilArbeidsgiverView meldingTilArbeidsgiver={meldingTilArbeidsgiver} parentId="test" />)
        expect(screen.getByText('Melding til arbeidsgiver')).toBeInTheDocument()
        expect(screen.getByText(meldingTilArbeidsgiver)).toBeInTheDocument()
    })

    it('Does not render section if meldingTilArbeidsgiver is undefined', () => {
        const meldingTilArbeidsgiver = 'melding til arbeidsgiver'
        render(<MeldingTilArbeidsgiverView meldingTilArbeidsgiver={undefined} parentId="test" />)
        expect(() => {
            screen.getByText(meldingTilArbeidsgiver)
        }).toThrow()
    })
})
