import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { UtdypendeOpplysning } from 'queries'

import UtdypendeOpplysninger from './UtdypendeOpplysninger'

describe('UtdypendeOpplysninger', () => {
    it('Renders utdypende opplysninger', () => {
        const utdypende: UtdypendeOpplysning = {
            __typename: 'UtdypendeOpplysning',
            sporsmal: 'dette er det første spørsmålet',
            svar: 'dette er det første svaret',
            restriksjoner: [],
        }
        const utdypende2: UtdypendeOpplysning = {
            __typename: 'UtdypendeOpplysning',
            sporsmal: 'dette er det andre spørsmålet',
            svar: 'dette er det andre svaret',
            restriksjoner: [],
        }
        const utdypende3: UtdypendeOpplysning = {
            __typename: 'UtdypendeOpplysning',
            sporsmal: 'dette er det tredje spørsmålet',
            svar: 'dette er det tredje svaret',
            restriksjoner: [],
        }

        const utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>> = {
            '6.1': {
                '6.1.1': utdypende,
                '6.1.2': utdypende2,
            },
            '6.2': {
                '6.2.1': utdypende3,
            },
        }

        render(<UtdypendeOpplysninger utdypendeOpplysninger={utdypendeOpplysninger} parentId="test" />)

        expect(screen.getByText('Utdypende opplysninger')).toBeInTheDocument()
        expect(screen.getByText('dette er det første spørsmålet')).toBeInTheDocument()
        expect(screen.getByText('dette er det første svaret')).toBeInTheDocument()
        expect(screen.getByText('dette er det andre spørsmålet')).toBeInTheDocument()
        expect(screen.getByText('dette er det andre svaret')).toBeInTheDocument()
        expect(screen.getByText('dette er det tredje spørsmålet')).toBeInTheDocument()
        expect(screen.getByText('dette er det tredje svaret')).toBeInTheDocument()
    })
})
