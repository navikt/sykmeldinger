import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { KontaktMedPasient } from 'queries'

import Tilbakedatering from './Tilbakedatering'

describe('TilbakedateringView', () => {
    it('Renders kontaktdato', () => {
        const kontaktMedPasient: KontaktMedPasient = {
            __typename: 'KontaktMedPasient',
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: null,
        }
        render(<Tilbakedatering kontaktMedPasient={kontaktMedPasient} parentId="test" />)

        expect(screen.getByText('Tilbakedatering')).toBeInTheDocument()
        expect(screen.getByText('Dato for dokumenterbar kontakt med pasienten')).toBeInTheDocument()
        expect(screen.getByText('1. april 2021')).toBeInTheDocument()
    })

    it('Not render it kontaktDato is missing', () => {
        const kontaktMedPasient: KontaktMedPasient = {
            __typename: 'KontaktMedPasient',
            kontaktDato: null,
            begrunnelseIkkeKontakt: null,
        }
        render(<Tilbakedatering kontaktMedPasient={kontaktMedPasient} parentId="test" />)

        expect(screen.queryByText('Tilbakedatering')).not.toBeInTheDocument()
    })
})
