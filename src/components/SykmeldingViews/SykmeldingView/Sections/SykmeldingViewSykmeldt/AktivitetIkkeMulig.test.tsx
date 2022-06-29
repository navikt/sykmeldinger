import { render, screen } from '@testing-library/react';

import {
    AktivitetIkkeMuligPeriode,
    AktivitetIkkeMuligPeriodeSchema,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../../../models/Sykmelding/Periode';

import AktivitetIkkeMulig from './AktivitetIkkeMulig';

describe('AktivitetIkkeMulig', () => {
    it('Renders aktivitet ikke mulig periode with specified medisinsk- and arbeidsrelatert arsak', () => {
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

        render(<AktivitetIkkeMulig aktivitetIkkeMulig={periode} />);

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).toBeInTheDocument();
        expect(screen.getByText('medisinsk beskrivelse')).toBeInTheDocument();

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('arbeidsrelatert beskrivelse')).toBeInTheDocument();
    });
});
