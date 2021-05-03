import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UtdypendeOpplysning from '../../../../../models/Sykmelding/UtdypendeOpplysninger';
import UtdypendeOpplysningerView from './UtdypendeOpplysningerView';

describe('PeriodeView', () => {
    it('Renders utdypende opplysninger', () => {
        const plainJson = {
            sporsmal: 'dette er det første spørsmålet',
            svar: 'dette er det første svaret',
            restriksjoner: [],
        };
        const plainJson2 = {
            sporsmal: 'dette er det andre spørsmålet',
            svar: 'dette er det andre svaret',
            restriksjoner: [],
        };
        const plainJson3 = {
            sporsmal: 'dette er det tredje spørsmålet',
            svar: 'dette er det tredje svaret',
            restriksjoner: [],
        };

        const utdypende = new UtdypendeOpplysning(plainJson);
        const utdypende2 = new UtdypendeOpplysning(plainJson2);
        const utdypende3 = new UtdypendeOpplysning(plainJson3);

        const utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>> = new Map();

        utdypendeOpplysninger.set('6.1', new Map());
        utdypendeOpplysninger.get('6.1')?.set('6.1.1', utdypende);
        utdypendeOpplysninger.get('6.1')?.set('6.1.2', utdypende2);

        utdypendeOpplysninger.set('6.2', new Map());
        utdypendeOpplysninger.get('6.2')?.set('6.2.1', utdypende3);

        render(<UtdypendeOpplysningerView utdypendeOpplysninger={utdypendeOpplysninger} />);

        expect(screen.getByText('Utdypende opplysninger')).toBeInTheDocument();
        expect(screen.getByText(plainJson.sporsmal)).toBeInTheDocument();
        expect(screen.getByText(plainJson.svar)).toBeInTheDocument();
        expect(screen.getByText(plainJson2.sporsmal)).toBeInTheDocument();
        expect(screen.getByText(plainJson2.svar)).toBeInTheDocument();
        expect(screen.getByText(plainJson3.sporsmal)).toBeInTheDocument();
        expect(screen.getByText(plainJson3.svar)).toBeInTheDocument();
    });

    it('Does not render utdypende opplysninger for arbeidsgiver', () => {
        const plainJson = {
            sporsmal: 'dette er det første spørsmålet',
            svar: 'dette er det første svaret',
            restriksjoner: [],
        };
        const plainJson2 = {
            sporsmal: 'dette er det andre spørsmålet',
            svar: 'dette er det andre svaret',
            restriksjoner: [],
        };
        const plainJson3 = {
            sporsmal: 'dette er det tredje spørsmålet',
            svar: 'dette er det tredje svaret',
            restriksjoner: [],
        };

        const utdypende = new UtdypendeOpplysning(plainJson);
        const utdypende2 = new UtdypendeOpplysning(plainJson2);
        const utdypende3 = new UtdypendeOpplysning(plainJson3);

        const utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>> = new Map();

        utdypendeOpplysninger.set('6.1', new Map());
        utdypendeOpplysninger.get('6.1')?.set('6.1.1', utdypende);
        utdypendeOpplysninger.get('6.1')?.set('6.1.2', utdypende2);

        utdypendeOpplysninger.set('6.2', new Map());
        utdypendeOpplysninger.get('6.2')?.set('6.2.1', utdypende3);

        render(<UtdypendeOpplysningerView utdypendeOpplysninger={utdypendeOpplysninger} arbeidsgiver />);

        expect(() => {
            screen.getByText('Utdypende opplysninger');
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson.sporsmal);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson.svar);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson2.sporsmal);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson2.svar);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson3.sporsmal);
        }).toThrow();
        expect(() => {
            screen.getByText(plainJson3.svar);
        }).toThrow();
    });
});
