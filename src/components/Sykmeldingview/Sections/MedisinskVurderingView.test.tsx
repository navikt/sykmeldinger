import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MedisinskVurdering from '../../../models/Sykmelding/MedisinskVurdering';
import MedisinskVurderingView from './MedisinskVurderingView';

describe('MedisinskVurdering', () => {
    it('Renders hoveddiagnose if it exits', () => {
        const plainJson = {
            hovedDiagnose: {
                kode: 'tullekode',
                system: 'icd-10',
                tekst: 'Skummel sykdom',
            },
            biDiagnoser: [],
            svangerskap: false,
            yrkesskade: false,
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Diagnose')).toBeInTheDocument();
        expect(screen.getByText(plainJson.hovedDiagnose.tekst)).toBeInTheDocument();
    });

    it('Renders bidiagnoser if it exits', () => {
        const plainJson = {
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
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} />);

        expect(screen.getAllByText('Bidiagnose').length).toBe(2);
        expect(screen.getByText(plainJson.biDiagnoser[0].tekst)).toBeInTheDocument();
        expect(screen.getByText(plainJson.biDiagnoser[1].tekst)).toBeInTheDocument();
    });

    it('Does not render diagnose for arbeidsgiver', () => {
        const plainJson = {
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
            svangerskap: false,
            yrkesskade: false,
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} arbeidsgiver />);

        expect(screen.getByText('Diagnose')).toBeInTheDocument();
        expect(() => {
            screen.getByText(plainJson.hovedDiagnose.tekst);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson.biDiagnoser[0].tekst);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson.biDiagnoser[1].tekst);
        }).toThrow();
    });

    it('Renders annenFraversArsak if it exits', () => {
        const plainJson = {
            biDiagnoser: [],
            annenFraversArsak: {
                beskrivelse: 'Dette er en beskrivelse',
                grunn: ['DONOR'],
            },
            svangerskap: false,
            yrkesskade: false,
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Annen lovfestet fraværsgrunn')).toBeInTheDocument();
        expect(screen.getByText('Når vedkommende er donor eller er under vurdering som donor')).toBeInTheDocument();

        expect(screen.getByText('Beskrivelse av fraværsgrunn')).toBeInTheDocument();
        expect(screen.getByText(plainJson.annenFraversArsak.beskrivelse)).toBeInTheDocument();
    });

    it('Renders svangerskapsrelatert if it exits', () => {
        const plainJson = {
            biDiagnoser: [],
            svangerskap: true,
            yrkesskade: false,
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Sykdommen er svangerskapsrelatert')).toBeInTheDocument();
    });

    it('Renders yrkesskade if it exits', () => {
        const plainJson = {
            biDiagnoser: [],
            svangerskap: false,
            yrkesskade: true,
            yrkesskadeDato: '2020-04-01',
        };
        const medisinskVurdering = new MedisinskVurdering(plainJson);
        render(<MedisinskVurderingView medisinskVurdering={medisinskVurdering} />);

        expect(screen.getByText('Sykdommen kan skyldes en yrkesskade/yrkessykdom')).toBeInTheDocument();

        expect(screen.getByText('Skadedato')).toBeInTheDocument();
        expect(screen.getByText('1. april 2020')).toBeInTheDocument();
    });
});
