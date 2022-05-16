import { formatISO, sub } from 'date-fns';

import { SykmeldingSchema } from '../models/Sykmelding/Sykmelding';

import { sykmeldingApen } from './test/mockData/sykmelding-apen';
import { sykmeldingAvbrutt } from './test/mockData/sykmelding-avbrutt';
import { sykmeldingSendt } from './test/mockData/sykmelding-sendt';
import { sykmeldingUnderbehandlingTilbakedatering } from './test/mockData/sykmelding-under-behandling-tilbakedatering';
import { isActiveSykmelding } from './sykmeldingUtils';

describe('isActiveSykmelding', () => {
    const now = formatISO(new Date());

    it('should be inactive if status is not APEN', () => {
        expect(isActiveSykmelding(SykmeldingSchema.parse(sykmeldingAvbrutt(now)))).toBe(false);
    });

    it('should be inactive if status is SENDT', () => {
        expect(isActiveSykmelding(SykmeldingSchema.parse(sykmeldingSendt(now)))).toBe(false);
    });

    it('should be active if status is SENDT with merknad UNDER_BEHANDLING', () => {
        expect(isActiveSykmelding(SykmeldingSchema.parse(sykmeldingUnderbehandlingTilbakedatering(now)))).toBe(true);
    });

    it('should be active if status is APEN', () => {
        expect(isActiveSykmelding(SykmeldingSchema.parse(sykmeldingApen(now)))).toBe(true);
    });

    it('should be inactive if status is APEN but older than a year', () => {
        expect(
            isActiveSykmelding(SykmeldingSchema.parse(sykmeldingApen(formatISO(sub(new Date(), { days: 365 }))))),
        ).toBe(false);
    });
});
