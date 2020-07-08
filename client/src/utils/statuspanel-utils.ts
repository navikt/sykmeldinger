import { Soknad } from '../types/soknad';
import { Soknadstype } from '../pages/sykmelding/components/Statuspanel/Statuspanel';
import { Sykmelding } from '../types/sykmelding';
import { Arbeidsgiver } from '../types/arbeidsgiver';
import dayjs from 'dayjs';

export const getSoknadstype = (soknader: Soknad[]): Soknadstype => {
    const nyeSoknader = soknader.filter((soknad) => soknad.status === 'NY');
    const fremtidigeSoknader = soknader.filter((soknad) => soknad.status === 'FREMTIDIG');

    // TODO: complete this
    if (nyeSoknader.length) {
        return 'SOK_NA';
    } else if (fremtidigeSoknader.length === 1) {
        return 'SOK_SENERE_KORT_SYKMELDING';
    } else if (fremtidigeSoknader.length > 1) {
        return 'SOK_SENERE_LANG_SYKMELDING';
    }
    return 'UTEN_SOKNAD';
};

export const getSoknadFomDato = (soknader: Soknad[]): Date | undefined => {
    const nyeSoknader = soknader.filter((soknad) => soknad.status === 'NY');
    const fremtidigeSoknader = soknader.filter((soknad) => soknad.status === 'FREMTIDIG');

    if (!nyeSoknader.length && fremtidigeSoknader.length) {
        // Date from earliest soknad
        return fremtidigeSoknader.reduce((earliestSoknad, currentSoknad) => {
            if (dayjs(currentSoknad.fom).isBefore(dayjs(earliestSoknad.fom))) {
                return currentSoknad;
            }
            return earliestSoknad;
        }).fom;
    }
};

export const getArbeidsgiverForskutterer = (
    sykmelding: Sykmelding,
    arbeidsgivere: Arbeidsgiver[],
): boolean | undefined => {
    const mottakendeArbeidsgiver = sykmelding.sykmeldingStatus.arbeidsgiver
        ? arbeidsgivere.find(
              (arbeidsgiver) => arbeidsgiver.orgnummer === sykmelding.sykmeldingStatus.arbeidsgiver!.orgnummer,
          )
        : undefined;
    return !!mottakendeArbeidsgiver?.naermesteLeder.arbeidsgiverForskuttererLoenn;
};
