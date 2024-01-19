import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Prognose } from 'queries'

import PrognoseView from './PrognoseView'

describe('PrognoseView', () => {
    it('Renders section title ', () => {
        const prognose: Prognose = {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        }
        render(<PrognoseView prognose={prognose} parentId="test" />)
        expect(screen.getByText('Prognose')).toBeInTheDocument()
    })

    it('Renders arbeidsforEtterPeriode if true', () => {
        const prognose: Prognose = {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        }
        render(<PrognoseView prognose={prognose} parentId="test" />)
        expect(screen.getByText('Er pasienten 100% arbeidsfør etter denne perioden?')).toBeInTheDocument()
    })

    it('Does not renders arbeidsforEtterPeriode if false', () => {
        const prognose: Prognose = {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        }
        render(<PrognoseView prognose={prognose} parentId="test" />)
        expect(screen.queryByText('Er pasienten 100% arbeidsfør etter denne perioden?')).not.toBeInTheDocument()
    })

    it('Renders hensynArbeidsplassen', () => {
        const prognose: Prognose = {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        }
        render(<PrognoseView prognose={prognose} parentId="test" />)
        expect(screen.getByText('Hensyn som må tas på arbeidsplassen')).toBeInTheDocument()
        expect(screen.getByText('hensyn på arbeidsplassen')).toBeInTheDocument()
    })

    it('Dose not render hensynArbeidsplassen if null', () => {
        const prognose: Prognose = {
            __typename: 'Prognose',
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: null,
            erIArbeid: null,
            erIkkeIArbeid: null,
        }
        render(<PrognoseView prognose={prognose} parentId="test" />)
        expect(screen.queryByText('Hensyn som må tas på arbeidsplassen')).not.toBeInTheDocument()
    })
})
