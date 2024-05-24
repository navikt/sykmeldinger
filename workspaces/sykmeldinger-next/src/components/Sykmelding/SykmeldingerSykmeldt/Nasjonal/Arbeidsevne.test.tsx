import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Arbeidsevne from './Arbeidsevne'

describe('Arbeidsevne', () => {
    it('Renders tiltak if they exist', () => {
        render(
            <Arbeidsevne
                tiltakArbeidsplassen="tiltak på arbeidsplassen"
                tiltakNAV="tiltak nav"
                andreTiltak="andre tiltak"
                parentId="test"
            />,
        )
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument()
        expect(screen.getByText('tiltak nav')).toBeInTheDocument()
        expect(screen.getByText('andre tiltak')).toBeInTheDocument()
    })

    it('Renders tiltakArbeidsplassen even if other tiltaks are null', () => {
        render(<Arbeidsevne tiltakArbeidsplassen="tiltak på arbeidsplassen" parentId="test" />)
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument()
    })

    it('Does not render tiltak if then dont exist', () => {
        render(<Arbeidsevne parentId="test" />)
        expect(screen.queryByText('tiltak på arbeidsplassen')).not.toBeInTheDocument()
        expect(screen.queryByText('tiltak nav')).not.toBeInTheDocument()
        expect(screen.queryByText('andre tiltak')).not.toBeInTheDocument()
    })
})
