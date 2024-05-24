import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Arbeidsevne from './Arbeidsevne'

describe('Arbeidsevne', () => {
    it('Renders only tiltakArbeidsplassen for arbeidsgiver', () => {
        render(<Arbeidsevne tiltakArbeidsplassen="tiltak på arbeidsplassen" parentId="test" />)
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument()
    })

    it('Does not render tiltak if then dont exist', () => {
        render(<Arbeidsevne parentId="test" />)
        expect(screen.queryByText('tiltak på arbeidsplassen')).not.toBeInTheDocument()
    })
})
