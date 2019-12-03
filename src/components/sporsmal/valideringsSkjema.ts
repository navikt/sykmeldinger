import * as yup from 'yup';
import { Arbeidsforhold, JaEllerNei } from './Sporsmal';
import { Egenmeldingsperiode } from './tilleggssporsmal/Egenmeldingsdager';
import dayjs from 'dayjs';

export const valideringsSkjema = yup
    .object()
    .shape({
        opplysningeneErRiktige: yup.string().required(),
        periode: yup.boolean(),
        sykmeldingsgrad: yup.boolean(),
        arbeidsgiver: yup.boolean(),
        diagnose: yup.boolean(),
        andreOpplysninger: yup.boolean(),
        sykmeldtFra: yup.string(),
        oppfolging: yup.string(),
        frilanserEgenmelding: yup.string(),
        frilanserForsikring: yup.string(),
    })
    .test('manglerOpplysninger', 'Du må oppgi hvilke opplysninger som ikke er riktige', (obj): any => {
        if (obj.opplysningeneErRiktige === 'nei') {
            if (
                obj.periode === false &&
                obj.sykmeldingsgrad === false &&
                obj.arbeidsgiver === false &&
                obj.diagnose === false &&
                obj.andreOpplysninger === false
            ) {
                return new yup.ValidationError(
                    'Du må oppgi hvilke opplysninger som ikke er riktige',
                    null,
                    'opplysninger',
                );
            }
        }
        return true;
    })
    .test('manglerSykmeldtFra', 'Du må oppgi hva du er sykmeldt fra', (obj): any => {
        if (!!obj.opplysningeneErRiktige || obj.periode === false || obj.sykmeldingsgrad === false) {
            if (obj.sykmeldtFra === '') {
                return new yup.ValidationError('Du må oppgi hva du er sykmeldt fra', null, 'sykmeldtFra');
            }
        }
        return true;
    })
    .test(
        'manglerOppfolging',
        'Du må svare på om det er *ARBEIDSGIVER* som skal følge deg opp på jobben når du er syk',
        (obj): any => {
            if (new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(obj.sykmeldtFra)) {
                if (obj.oppfolging === '') {
                    return new yup.ValidationError(
                        'Du må svare på om det er *ARBEIDSGIVER* som skal følge deg opp på jobben når du er syk',
                        null,
                        'oppfolging',
                    );
                }
            }
            return true;
        },
    )
    .test('manglerEgenmeldingbekreftelse', 'Fyll ut om du har brukt egenmelding', (obj): any => {
        if (
            obj.sykmeldtFra === Arbeidsforhold.FRILANSER ||
            obj.sykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE
        ) {
            if (obj.frilanserEgenmelding === '') {
                return new yup.ValidationError('Fyll ut egenmeldingsspørsmål', null, 'frilanserEgenmelding');
            }
        }
        return true;
    })
    .test('manglerForsikringbekreftelse', 'Fyll ut forsikringsspørsmål', (obj): any => {
        if (
            obj.sykmeldtFra === Arbeidsforhold.FRILANSER ||
            obj.sykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE
        ) {
            if (obj.frilanserForsikring === '') {
                return new yup.ValidationError('Fyll ut forsikringsspørsmål', null, 'frilanserForsikring');
            }
        }
        return true;
    })
    .test('egenmeldingsperioder', 'Du må oppgi hvilke periode du brukte egenmelding', (obj): any => {
        if (
            obj.sykmeldtFra === Arbeidsforhold.FRILANSER ||
            obj.sykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE
        ) {
            if (obj.frilanserEgenmelding === JaEllerNei.JA) {
                if (obj.egenmeldingsperioder === undefined) {
                    return new yup.ValidationError('Periode mangler utfylling', null, 'egenmeldingsperioder');
                }

                const finnesPeriodeMedNull = obj.egenmeldingsperioder.some(
                    (periode: Egenmeldingsperiode) => periode.startDato === null || periode.sluttDato == null,
                );
                if (finnesPeriodeMedNull) {
                    return new yup.ValidationError(
                        'En eller flere perioder mangler utfylling',
                        null,
                        'egenmeldingsperioder',
                    );
                }

                const perioderUtenNull = obj.egenmeldingsperioder.filter(
                    (periode: Egenmeldingsperiode) => periode.startDato !== null && periode.sluttDato !== null,
                );
                const sortertEtterStartDato = [...perioderUtenNull].sort(
                    (a: Egenmeldingsperiode, b: Egenmeldingsperiode) => {
                        if (a.startDato === null || b.startDato === null) {
                            return 0;
                        }
                        if (dayjs(a.startDato).isBefore(dayjs(b.startDato))) {
                            return -1;
                        } else if (dayjs(a.startDato).isSame(dayjs(b.startDato))) {
                            return 0;
                        }
                        return 1;
                    },
                );
                // Sjekk om noen av periodene overlapper
                for (let i = 0; i < sortertEtterStartDato.length - 1; i++) {
                    if (
                        sortertEtterStartDato[i].sluttDato === null ||
                        sortertEtterStartDato[i + 1].startDato === null
                    ) {
                        continue;
                    }
                    if (
                        dayjs(sortertEtterStartDato[i + 1].startDato).isBefore(
                            dayjs(sortertEtterStartDato[i].sluttDato),
                        )
                    ) {
                        return new yup.ValidationError(
                            'En eller flere perioder overlapper',
                            null,
                            'egenmeldingsperioder',
                        );
                    }
                }
            }
        }
        return true;
    });
