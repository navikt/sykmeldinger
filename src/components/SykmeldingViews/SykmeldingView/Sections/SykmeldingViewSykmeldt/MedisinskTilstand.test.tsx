import { render, screen } from '@testing-library/react';

import { MedisinskVurderingSchema, MedisinskVurdering } from '../../../../../models/Sykmelding/MedisinskVurdering';

import MedisinskTilstand from './MedisinskTilstand';

describe('MedisinskTilstand', () => {
    it('Renders annenFraversArsak if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: null,
            biDiagnoser: [],
            annenFraversArsak: {
                beskrivelse: 'Dette er en beskrivelse',
                grunn: ['DONOR'],
            },
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
        });
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Annen lovfestet fraværsgrunn')).toBeInTheDocument();
        expect(screen.getByText('Når vedkommende er donor eller er under vurdering som donor')).toBeInTheDocument();

        expect(screen.getByText('Beskrivelse av fraværsgrunn')).toBeInTheDocument();
        expect(screen.getByText('Dette er en beskrivelse')).toBeInTheDocument();
    });

    it('Renders svangerskapsrelatert if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: null,
            biDiagnoser: [],
            svangerskap: true,
            yrkesskade: false,
            yrkesskadeDato: null,
            annenFraversArsak: null,
        });
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Er sykdommen svangerskapsrelatert?')).toBeInTheDocument();
    });

    it('Renders yrkesskade if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: null,
            biDiagnoser: [],
            svangerskap: false,
            yrkesskade: true,
            yrkesskadeDato: '2020-04-01',
            annenFraversArsak: null,
        });
        render(<MedisinskTilstand medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Kan sykdommen skyldes en yrkesskade/yrkessykdom?')).toBeInTheDocument();

        expect(screen.getByText('Skadedato')).toBeInTheDocument();
        expect(screen.getByText('1. april 2020')).toBeInTheDocument();
    });
});
