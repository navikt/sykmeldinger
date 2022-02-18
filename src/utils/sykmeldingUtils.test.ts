import { formatISO, sub } from 'date-fns';

import { sykmeldingApen } from '../mock/data/sykmelding-apen';
import { sykmeldingAvbrutt } from '../mock/data/sykmelding-avbrutt';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { sykmeldingSendt } from '../mock/data/sykmelding-sendt';
import { sykmeldingUnderbehandlingTilbakedatering } from '../mock/data/sykmelding-under-behandling-tilbakedatering';

import { isActiveSykmelding } from './sykmeldingUtils';

describe('isActiveSykmelding', () => {
    const now = formatISO(new Date());

    it('should be inactive if status is not APEN', () => {
        expect(isActiveSykmelding(new Sykmelding(sykmeldingAvbrutt(now)))).toBe(false);
    });

    it('should be inactive if status is SENDT', () => {
        expect(isActiveSykmelding(new Sykmelding(sykmeldingSendt(now)))).toBe(false);
    });

    it('should be active if status is SENDT with merknad UNDER_BEHANDLING', () => {
        expect(isActiveSykmelding(new Sykmelding(sykmeldingUnderbehandlingTilbakedatering(now)))).toBe(true);
    });

    it('should be active if status is APEN', () => {
        expect(isActiveSykmelding(new Sykmelding(sykmeldingApen(now)))).toBe(true);
    });

    it('should be inactive if status is APEN but older than a year', () => {
        expect(isActiveSykmelding(new Sykmelding(sykmeldingApen(formatISO(sub(new Date(), { days: 365 })))))).toBe(
            false,
        );
    });
});
