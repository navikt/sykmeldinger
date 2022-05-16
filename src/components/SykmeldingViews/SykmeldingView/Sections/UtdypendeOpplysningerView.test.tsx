import { render, screen } from '@testing-library/react';

import { UtdypendeOpplysning, UtdypendeOpplysningSchema } from '../../../../models/Sykmelding/UtdypendeOpplysninger';

import UtdypendeOpplysningerView from './UtdypendeOpplysningerView';

describe('PeriodeView', () => {
    it('Renders utdypende opplysninger', () => {
        const utdypende: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det første spørsmålet',
            svar: 'dette er det første svaret',
            restriksjoner: [],
        });
        const utdypende2: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det andre spørsmålet',
            svar: 'dette er det andre svaret',
            restriksjoner: [],
        });
        const utdypende3: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det tredje spørsmålet',
            svar: 'dette er det tredje svaret',
            restriksjoner: [],
        });

        const utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>> = {
            '6.1': {
                '6.1.1': utdypende,
                '6.1.2': utdypende2,
            },
            '6.2': {
                '6.2.1': utdypende3,
            },
        };

        render(<UtdypendeOpplysningerView utdypendeOpplysninger={utdypendeOpplysninger} arbeidsgiver={false} />);

        expect(screen.getByText('Utdypende opplysninger')).toBeInTheDocument();
        expect(screen.getByText('dette er det første spørsmålet')).toBeInTheDocument();
        expect(screen.getByText('dette er det første svaret')).toBeInTheDocument();
        expect(screen.getByText('dette er det andre spørsmålet')).toBeInTheDocument();
        expect(screen.getByText('dette er det andre svaret')).toBeInTheDocument();
        expect(screen.getByText('dette er det tredje spørsmålet')).toBeInTheDocument();
        expect(screen.getByText('dette er det tredje svaret')).toBeInTheDocument();
    });

    it('Does not render utdypende opplysninger for arbeidsgiver', () => {
        const utdypende: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det første spørsmålet',
            svar: 'dette er det første svaret',
            restriksjoner: [],
        });
        const utdypende2: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det andre spørsmålet',
            svar: 'dette er det andre svaret',
            restriksjoner: [],
        });
        const utdypende3: UtdypendeOpplysning = UtdypendeOpplysningSchema.parse({
            sporsmal: 'dette er det tredje spørsmålet',
            svar: 'dette er det tredje svaret',
            restriksjoner: [],
        });

        const utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>> = {
            '6.1': {
                '6.1.1': utdypende,
                '6.1.2': utdypende2,
            },
            '6.2': {
                '6.2.1': utdypende3,
            },
        };

        render(<UtdypendeOpplysningerView utdypendeOpplysninger={utdypendeOpplysninger} arbeidsgiver />);

        expect(screen.queryByText('Utdypende opplysninger')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det første spørsmålet')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det første svaret')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det andre spørsmålet')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det andre svaret')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det tredje spørsmålet')).not.toBeInTheDocument();
        expect(screen.queryByText('dette er det tredje svaret')).not.toBeInTheDocument();
    });
});
