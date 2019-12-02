import * as yup from 'yup';
import { Arbeidsforhold } from './Sporsmal';

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
    .test('egenmeldingsperioder', 'Du må oppgi hvilke periode du brukte egenmelding', (obj): any => {
        if (obj.hasOwnProperty('egenmeldingsperioder') && obj.egenmeldingsperioder === undefined) {
            return new yup.ValidationError('Periode mangler ufylling', null, 'egenmeldingsperioder');
        } else if (
            obj.hasOwnProperty('egenmeldingsperioder') &&
            obj.egenmeldingsperioder.some((periode: any) => periode['startDato'] === undefined)
        ) {
            return new yup.ValidationError('En eller flere perioder mangler utfylling', null, 'egenmeldingsperioder');
        }
        return true;
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
            if (obj.sykmeldtFra === Arbeidsforhold.ARBEIDSGIVER) {
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
    });
