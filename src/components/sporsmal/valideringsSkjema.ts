import * as yup from 'yup';
import { Arbeidsforhold, JaEllerNei } from './Sporsmal';
import { Egenmeldingsperiode } from './tilleggssporsmal/Egenmeldingsdager';
import dayjs from 'dayjs';

interface Valideringsfeil {
    opplysningeneErRiktige?: JaEllerNei;
    periode?: boolean;
    sykmeldingsgrad?: boolean;
    arbeidsgiver?: boolean;
    diagnose?: boolean;
    andreOpplysninger?: boolean;
    sykmeldtFra?: string;
    oppfolging?: string;
    frilanserEgenmelding?: string;
    frilanserForsikring?: string;
}

const skjema = yup.object({
    opplysningeneErRiktige: yup
        .mixed()
        .required(),
    periode: yup.boolean(),
    sykmeldingsgrad: yup.boolean(),
    arbeidsgiver: yup.boolean(),
    diagnose: yup.boolean(),
    andreOpplysninger: yup.boolean(),
    sykmeldtFra: yup.mixed().oneOf(['filanser', 1]),
});

export const valideringsSkjema = yup
    .object({
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
    .test('manglerOpplysninger', 'Du må oppgi hvilke opplysninger som ikke er riktige', (obj: Valideringsfeil) => {
        if (obj.opplysningeneErRiktige === JaEllerNei.NEI) {
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
    .test('egenmeldingsperioder', 'Du må oppgi hvilke periode du brukte egenmelding', (obj): any => {
        // Hvis egenmeldingsperioder er registert ved skjema, men ikke har noen verdi
        if (!!obj.egenmeldingsperioder && obj.egenmeldingsperioder === undefined) {
            return new yup.ValidationError('Periode mangler ufylling', null, 'egenmeldingsperioder');
        }
        // Hvis en eller flere av egenmeldingsperiodene mangler dato, eller det kun finnes én dato
        if (
            !!obj.egenmeldingsperioder &&
            obj.egenmeldingsperioder.some(
                (periode: Egenmeldingsperiode) => periode.datoer === undefined || periode.datoer.length < 2,
            )
        ) {
            return new yup.ValidationError('En eller flere perioder mangler utfylling', null, 'egenmeldingsperioder');
        }

        const perioderMedDato: Egenmeldingsperiode[] = obj.egenmeldingsperioder
            ? obj.egenmeldingsperioder.filter((periode: Egenmeldingsperiode) => periode.datoer !== undefined)
            : [];

        const sortertEtterStartDato = [...perioderMedDato].sort((a, b) => {
            // @ts-ignore
            if (dayjs(a.datoer[0]).isBefore(dayjs(b.datoer[0]))) {
                return -1;
                // @ts-ignore
            } else if (dayjs(a.datoer[0]).isSame(dayjs(b.datoer[0]))) {
                return 0;
            }
            return 1;
        });
        console.log(sortertEtterStartDato);
        // Hvis noen av periodene overlapper
        for (let i = 0; i < sortertEtterStartDato.length - 1; i++) {
            // @ts-ignore
            if (dayjs(sortertEtterStartDato[i + 1].datoer[0]).isBefore(dayjs(sortertEtterStartDato[i].datoer[1]))) {
                return new yup.ValidationError('En eller flere perioder overlapper', null, 'egenmeldingsperioder');
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
