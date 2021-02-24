import { Sykmelding } from '../types/sykmelding';
import { Arbeidsgiver } from '../types/arbeidsgiver';

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
