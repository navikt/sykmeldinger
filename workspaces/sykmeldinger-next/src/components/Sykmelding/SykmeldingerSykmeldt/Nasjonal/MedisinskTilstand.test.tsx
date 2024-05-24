import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { AnnenFraverGrunn, MedisinskVurdering } from 'queries'

import MedisinskTilstand from './MedisinskTilstand'

describe('MedisinskTilstand', () => {
    it('Renders annenFraversArsak if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = {
            __typename: 'MedisinskVurdering',
            hovedDiagnose: null,
            biDiagnoser: [],
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak',
                beskrivelse: 'Dette er en beskrivelse',
                grunn: [AnnenFraverGrunn.DONOR],
            },
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
        }
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} isV3={false} parentId="test" />)

        expect(screen.getByText('Annen lovfestet fraværsgrunn')).toBeInTheDocument()
        expect(screen.getByText('Når vedkommende er donor eller er under vurdering som donor')).toBeInTheDocument()

        expect(screen.getByText('Beskrivelse av fraværsgrunn')).toBeInTheDocument()
        expect(screen.getByText('Dette er en beskrivelse')).toBeInTheDocument()
    })

    it('Renders svangerskapsrelatert if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = {
            __typename: 'MedisinskVurdering',
            hovedDiagnose: null,
            biDiagnoser: [],
            svangerskap: true,
            yrkesskade: false,
            yrkesskadeDato: null,
            annenFraversArsak: null,
        }
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} isV3={false} parentId="test" />)

        expect(screen.getByText('Er sykdommen svangerskapsrelatert?')).toBeInTheDocument()
    })

    it('Renders yrkesskade if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = {
            __typename: 'MedisinskVurdering',
            hovedDiagnose: null,
            biDiagnoser: [],
            svangerskap: false,
            yrkesskade: true,
            yrkesskadeDato: '2020-04-01',
            annenFraversArsak: null,
        }
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} isV3={false} parentId="test" />)

        expect(screen.getByText('Kan sykdommen skyldes en yrkesskade/yrkessykdom?')).toBeInTheDocument()

        expect(screen.getByText('Skadedato')).toBeInTheDocument()
        expect(screen.getByText('1. april 2020')).toBeInTheDocument()
    })

    it('should render Bidiagnose', () => {
        const medisinskVurdering: MedisinskVurdering = {
            __typename: 'MedisinskVurdering',
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak',
                beskrivelse: '',
                grunn: [],
            },
            biDiagnoser: [
                {
                    __typename: 'Diagnose',
                    kode: '',
                    system: '',
                    tekst: 'Vondt i foten',
                },
            ],
            hovedDiagnose: null,
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
        }
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} isV3={false} parentId="test" />)
        expect(screen.getByText('Bidiagnose')).toBeInTheDocument()
        expect(screen.getByText('Vondt i foten')).toBeInTheDocument()
    })

    it('should not render Bidiagnose if tekst is missing', () => {
        const medisinskVurdering: MedisinskVurdering = {
            __typename: 'MedisinskVurdering',
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak',
                beskrivelse: '',
                grunn: [],
            },
            biDiagnoser: [],
            hovedDiagnose: null,
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
        }
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} isV3={false} parentId="test" />)
        expect(screen.queryByText('Bidiagnose')).not.toBeInTheDocument()
    })
})
