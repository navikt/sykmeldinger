import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { MeldingTilNav } from 'queries'

import MeldingTilNavView from './MeldingTilNav'

describe('MeldingTilNavView', () => {
    it('Renders ønsker bistand if bistandUmiddelbart is true', () => {
        const meldingTilNav: MeldingTilNav = {
            __typename: 'MeldingTilNAV',
            bistandUmiddelbart: true,
            beskrivBistand: null,
        }
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} parentId="test" />)
        expect(screen.getByText('Melding til NAV')).toBeInTheDocument()
        expect(screen.getByText('Ønskes bistand fra NAV nå?')).toBeInTheDocument()
    })

    it('Does not render ønsker bistand if bistandUmiddelbart is false', () => {
        const meldingTilNav: MeldingTilNav = {
            __typename: 'MeldingTilNAV',
            bistandUmiddelbart: false,
            beskrivBistand: null,
        }
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} parentId="test" />)
        expect(() => {
            expect(screen.getByText('Melding til NAV'))
        }).toThrow()
        expect(() => {
            screen.getByText('Ønskes bistand fra NAV nå?')
        }).toThrow()
    })

    it('Renders beskrivelse', () => {
        const meldingTilNav: MeldingTilNav = {
            __typename: 'MeldingTilNAV',
            bistandUmiddelbart: true,
            beskrivBistand: 'beskrivelse av bistanden',
        }
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} parentId="test" />)
        expect(screen.getByText('Nærmere beskrivelse')).toBeInTheDocument()
        expect(screen.getByText('beskrivelse av bistanden')).toBeInTheDocument()
    })

    it('Does not render section if object does not exist', () => {
        render(<MeldingTilNavView parentId="test" />)
        expect(screen.queryByText('Melding til NAV')).not.toBeInTheDocument()
        expect(screen.queryByText('Ønskes bistand fra NAV nå?')).not.toBeInTheDocument()
        expect(screen.queryByText('Nærmere beskrivelse')).not.toBeInTheDocument()
    })
})
