import { render, screen } from '@testing-library/react';

import {
    AktivitetIkkeMuligPeriode,
    AktivitetIkkeMuligPeriodeSchema,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../../../models/Sykmelding/Periode';

import AktivitetIkkeMuligView from './AktivitetIkkeMuligView';

describe('AktivitetIkkeMuligView', () => {
    it('Render arbeidsrelatert arsak for arbeidsgiver view', () => {
        const periode: AktivitetIkkeMuligPeriode = AktivitetIkkeMuligPeriodeSchema.parse({
            medisinskArsak: {
                beskrivelse: 'medisinsk beskrivelse',
                arsak: [MedisinskArsakType.TILSTAND_HINDRER_AKTIVITET],
            },
            arbeidsrelatertArsak: {
                beskrivelse: 'arbeidsrelatert beskrivelse',
                arsak: [ArbeidsrelatertArsakType.MANGLENDE_TILRETTELEGGING],
            },
        });

        render(<AktivitetIkkeMuligView aktivitetIkkeMulig={periode} />);

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('arbeidsrelatert beskrivelse')).toBeInTheDocument();
    });
});
