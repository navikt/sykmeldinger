import { render, screen } from '@testing-library/react';

import { MedisinskVurdering } from '../../../../../fetching/graphql.generated';

import Diagnoser from './Diagnoser';

describe('Diagnoser', () => {
    it('should render title', () => {
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
                    tekst: '',
                },
            ],
            hovedDiagnose: {
                __typename: 'Diagnose',
                kode: '',
                system: '',
                tekst: '',
            },
            svangerskap: false,
            yrkesskade: false,
            yrkesskadeDato: '',
        };
        render(<Diagnoser medisinskVurdering={medisinskVurdering} sladd />);
        expect(screen.getByText('Medisinsk tilstand')).toBeInTheDocument();
    });

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
            yrkesskadeDato: '',
        };
        render(<Diagnoser medisinskVurdering={medisinskVurdering} sladd />);
        expect(screen.queryByText('Bidiagnose')).not.toBeInTheDocument();
    });
});
