import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import ArbeidsevneView from './ArbeidsevneView'

describe('ArbeidsevneView', () => {
    it('Renders only tiltakArbeidsplassen for arbeidsgiver', () => {
        render(<ArbeidsevneView tiltakArbeidsplassen="tiltak på arbeidsplassen" parentId="test" />)
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument()
    })

    it('Does not render tiltak if then dont exist', () => {
        render(<ArbeidsevneView parentId="test" />)
        expect(screen.queryByText('tiltak på arbeidsplassen')).not.toBeInTheDocument()
    })
})
