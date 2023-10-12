import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver'

describe('MeldingTilArbeidsgiver', () => {
    it('should render meldingTilArbeidsgiver', () => {
        render(<MeldingTilArbeidsgiver meldingTilArbeidsgiver="Lang melding" parentId="test" />)
        expect(screen.getByText('Melding til arbeidsgiver')).toBeInTheDocument()
        expect(screen.getByText('Lang melding')).toBeInTheDocument()
    })

    it('should not render title if meldingTilArbeidsgiver is missing', () => {
        render(<MeldingTilArbeidsgiver meldingTilArbeidsgiver={null} parentId="test" />)
        expect(screen.queryByText('Melding til arbeidsgiver')).not.toBeInTheDocument()
    })
})
