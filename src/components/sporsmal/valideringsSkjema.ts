import * as yup from 'yup';
import dayjs from 'dayjs';
import { JaEllerNei, Skjemafelt, Arbeidsforhold } from '../../types/sporsmalTypes';

const egenmeldingsperiodeValidering = yup.object({
    id: yup.number(),
    datoer: yup
        .array()
        .of(yup.date())
        .notRequired(),
});

export type Egenmeldingsperiode = yup.InferType<typeof egenmeldingsperiodeValidering>;

const skjemaShape = yup.object({
    opplysningeneErRiktige: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI])
        .required(),
    periode: yup.boolean().notRequired(),
    sykmeldingsgrad: yup.boolean().notRequired(),
    arbeidsgiver: yup.boolean().notRequired(),
    diagnose: yup.boolean().notRequired(),
    andreOpplysninger: yup.boolean().notRequired(),
    sykmeldtFra: yup
        .string()
        .notRequired()
        .when(Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE, {
            is: JaEllerNei.JA,
            then: yup.string().required(), // Dette skaper problemer når formState === 'dirty'
            otherwise: yup.string().notRequired(),
        }),
    oppfolging: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI])
        .notRequired(),
    frilanserEgenmelding: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI])
        .notRequired(),
    egenmeldingsperioder: yup
        .array()
        .of(egenmeldingsperiodeValidering)
        .min(1)
        .notRequired()
        .when(Skjemafelt.FRILANSER_EGENMELDING, {
            is: JaEllerNei.JA,
            then: yup
                .array()
                .of(egenmeldingsperiodeValidering)
                .min(1)
                .required(),
            otherwise: yup
                .array()
                .of(egenmeldingsperiodeValidering)
                .min(1)
                .notRequired(),
        }),
    frilanserForsikring: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI])
        .notRequired(),
});

export type Skjema = yup.InferType<typeof skjemaShape>;

export const skjemavalidering = skjemaShape
    .test('manglerOpplysninger', 'Du må oppgi hvilke opplysninger som ikke er riktige', (skjema: Skjema) => {
        if (skjema.opplysningeneErRiktige === JaEllerNei.NEI) {
            if (
                skjema.periode === false &&
                skjema.sykmeldingsgrad === false &&
                skjema.arbeidsgiver === false &&
                skjema.diagnose === false &&
                skjema.andreOpplysninger === false
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
    .test('manglerSykmeldtFra', 'Du må oppgi hva du er sykmeldt fra', (skjema: Skjema) => {
        if (!!skjema.opplysningeneErRiktige || skjema.periode === false || skjema.sykmeldingsgrad === false) {
            if (skjema.sykmeldtFra === '') {
                return new yup.ValidationError('Du må oppgi hva du er sykmeldt fra', null, Skjemafelt.SYKMELDT_FRA);
            }
        }
        return true;
    })
    .test(
        'manglerOppfolging',
        'Du må svare på om det er *ARBEIDSGIVER* som skal følge deg opp på jobben når du er syk',
        (skjema: Skjema) => {
            if (skjema.sykmeldtFra === Arbeidsforhold.ARBEIDSGIVER) {
                if (!!skjema.oppfolging) {
                    return new yup.ValidationError(
                        'Du må svare på om det er *ARBEIDSGIVER* som skal følge deg opp på jobben når du er syk',
                        null,
                        Skjemafelt.OPPFOLGING,
                    );
                }
            }
            return true;
        },
    )
    .test('egenmeldingsperioder', 'Du må oppgi hvilke periode du brukte egenmelding', (skjema: Skjema) => {
        // Hvis egenmeldingsperioder er registert ved skjema, men ikke har noen verdi
        if (!!skjema.egenmeldingsperioder && skjema.egenmeldingsperioder === undefined) {
            return new yup.ValidationError('Periode mangler ufylling', null, Skjemafelt.EGENMELDINGSPERIODER);
        }
        // Hvis en eller flere av egenmeldingsperiodene mangler dato, eller det kun finnes én dato
        if (
            !!skjema.egenmeldingsperioder &&
            skjema.egenmeldingsperioder.some(
                (periode: Egenmeldingsperiode) => periode.datoer === undefined || periode.datoer.length < 2,
            )
        ) {
            return new yup.ValidationError(
                'En eller flere perioder mangler utfylling',
                null,
                Skjemafelt.EGENMELDINGSPERIODER,
            );
        }

        const perioderMedDato: Egenmeldingsperiode[] = skjema.egenmeldingsperioder
            ? skjema.egenmeldingsperioder.filter((periode: Egenmeldingsperiode) => periode.datoer !== undefined)
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
        // Hvis noen av periodene overlapper
        for (let i = 0; i < sortertEtterStartDato.length - 1; i++) {
            // @ts-ignore
            if (dayjs(sortertEtterStartDato[i + 1].datoer[0]).isBefore(dayjs(sortertEtterStartDato[i].datoer[1]))) {
                return new yup.ValidationError(
                    'En eller flere perioder overlapper',
                    null,
                    Skjemafelt.EGENMELDINGSPERIODER,
                );
            }
        }
        return true;
    });
