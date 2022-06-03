import { render, screen } from '@testing-library/react';

import { MedisinskVurderingSchema, MedisinskVurdering } from '../../../../models/Sykmelding/MedisinskVurdering';

import MedisinskVurderingView from './MedisinskVurderingView';

describe('MedisinskVurdering', () => {
    it('Renders hoveddiagnose if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: {
                kode: 'tullekode',
                system: 'icd-10',
                tekst: 'Skummel sykdom',
            },
            biDiagnoser: [],
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
            annenFraversArsak: null,
        });
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver={false} />);

        expect(screen.getByText('Diagnose')).toBeInTheDocument();
        expect(screen.getByText('Skummel sykdom')).toBeInTheDocument();
    });

    it('Renders bidiagnoser if it exits', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: null,
            biDiagnoser: [
                {
                    kode: 'tullekode1',
                    system: 'icd-10',
                    tekst: 'Skummel sykdom',
                },
                {
                    kode: 'tullekode2',
                    system: 'icd-10',
                    tekst: 'Farlig sykdom',
                },
            ],
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: null,
            annenFraversArsak: null,
        });
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver={false} />);

        expect(screen.getAllByText('Bidiagnose').length).toBe(2);
        expect(screen.getByText('Skummel sykdom')).toBeInTheDocument();
        expect(screen.getByText('Farlig sykdom')).toBeInTheDocument();
    });

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
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver={false} />);

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
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver={false} />);

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
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver={false} />);

        expect(screen.getByText('Kan sykdommen skyldes en yrkesskade/yrkessykdom?')).toBeInTheDocument();

        expect(screen.getByText('Skadedato')).toBeInTheDocument();
        expect(screen.getByText('1. april 2020')).toBeInTheDocument();
    });

    it('Does not render anything if arbeidsgiver', () => {
        const medisinskVurdering: MedisinskVurdering = MedisinskVurderingSchema.parse({
            hovedDiagnose: {
                kode: 'tullekode',
                system: 'icd-10',
                tekst: 'Skummel sykdom',
            },
            biDiagnoser: [
                {
                    kode: 'tullekode1',
                    system: 'icd-10',
                    tekst: 'Skummel sykdom',
                },
                {
                    kode: 'tullekode2',
                    system: 'icd-10',
                    tekst: 'Farlig sykdom',
                },
            ],
            annenFraversArsak: {
                beskrivelse: 'Dette er en beskrivelse',
                grunn: ['DONOR'],
            },
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2020-04-01',
        });
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver />);

        // Diagnose
        expect(screen.getByText('Diagnose')).toBeInTheDocument();
        expect(screen.queryByText('Skummel sykdom')).not.toBeInTheDocument();

        // Bidiagnoser
        expect(screen.getAllByText('Bidiagnose').length).toBe(2);
        expect(screen.queryByText('Skummel sykdom')).not.toBeInTheDocument();
        expect(screen.queryByText('Farlig sykdom')).not.toBeInTheDocument();

        // AnnenFraversArsak
        expect(screen.queryByText('Annen lovfestet fraværsgrunn')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Når vedkommende er donor eller er under vurdering som donor'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Beskrivelse av fraværsgrunn')).not.toBeInTheDocument();
        expect(screen.queryByText('Dette er en beskrivelse')).not.toBeInTheDocument();

        // Svangerskap
        expect(screen.queryByText('Er sykdommen svangerskapsrelatert?')).not.toBeInTheDocument();

        // Yrkesskade
        expect(screen.queryByText('Skadedato')).not.toBeInTheDocument();
        expect(screen.queryByText('1. april 2020')).not.toBeInTheDocument();
    });
});
