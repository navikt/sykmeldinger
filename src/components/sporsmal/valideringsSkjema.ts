import * as yup from 'yup';
import dayjs from 'dayjs';
import { JaEllerNei, Skjemafelt, Arbeidsforhold } from '../../types/sporsmalTypes';
import tekster from './sporsmal-tekster';
import { getLedetekst } from '../../utils/ledetekst-utils';

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
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI], tekster['feilmelding.opplysningene-er-riktige'])
        .required(tekster['feilmelding.opplysningene-er-riktige']),
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
            then: yup.string().required(tekster['feilmelding.sykmeldt-fra']), // Dette skaper problemer når formState === 'dirty'
            otherwise: yup.string().notRequired(),
        }),
    oppfolging: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI])
        .notRequired(),
    frilanserEgenmelding: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI], tekster['feilmelding.frilanser.egenmelding'])
        .when(Skjemafelt.SYKMELDT_FRA, {
            is: Arbeidsforhold.FRILANSER || Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE,
            then: yup
                .string()
                .oneOf([JaEllerNei.JA, JaEllerNei.NEI], tekster['feilmelding.frilanser.egenmelding'])
                .required(),
            otherwise: yup.string().notRequired(),
        }),
    frilanserForsikring: yup
        .string()
        .oneOf([JaEllerNei.JA, JaEllerNei.NEI], tekster['feilmelding.frilanser.forsikring'])
        .when(Skjemafelt.SYKMELDT_FRA, {
            is: Arbeidsforhold.FRILANSER || Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE,
            then: yup
                .string()
                .oneOf([JaEllerNei.JA, JaEllerNei.NEI], tekster['feilmelding.frilanser.forsikring'])
                .required(),
            otherwise: yup.string().notRequired(),
        }),
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
                .required(tekster['feilmelding.egenmeldingsperioder.periode-mangler-utfylling']),
            otherwise: yup
                .array()
                .of(egenmeldingsperiodeValidering)
                .min(1)
                .notRequired(),
        }),
});

export type Skjema = yup.InferType<typeof skjemaShape>;

export const skjemavalidering = skjemaShape
    .test('sjekk-om-opplysninger-mangler', tekster['feilmelding.mangler-opplysninger'], (skjema: Skjema) => {
        if (skjema.opplysningeneErRiktige === JaEllerNei.NEI) {
            if (
                skjema.periode === false &&
                skjema.sykmeldingsgrad === false &&
                skjema.arbeidsgiver === false &&
                skjema.diagnose === false &&
                skjema.andreOpplysninger === false
            ) {
                return new yup.ValidationError(tekster['feilmelding.mangler-opplysninger'], null, 'opplysninger');
            }
        }
        return true;
    })
    .test('sjekk-om-sykmeldFra-er-fylt-ut', tekster['feilmelding.sykmeldt-fra'], (skjema: Skjema) => {
        if (!!skjema.opplysningeneErRiktige || skjema.periode === false || skjema.sykmeldingsgrad === false) {
            if (skjema.sykmeldtFra === '') {
                return new yup.ValidationError(tekster['feilmelding.sykmeldt-fra'], null, Skjemafelt.SYKMELDT_FRA);
            }
        }
        return true;
    })
    .test('sjekk-om-oppfolging-mangler', tekster['feilmelding.sykmeldt-fra.oppfolging'], (skjema: Skjema) => {
        if (skjema.sykmeldtFra && new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(skjema.sykmeldtFra)) {
            if (!!!skjema.oppfolging || skjema.oppfolging === undefined) {
                const naermesteLederNavn = skjema.sykmeldtFra.split('-')[2];

                return new yup.ValidationError(
                    getLedetekst(tekster['feilmelding.sykmeldt-fra.oppfolging'], {
                        '%ARBEIDSGIVER%': naermesteLederNavn,
                    }),
                    null,
                    Skjemafelt.OPPFOLGING,
                );
            }
        }
        return true;
    })

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
                tekster['feilmelding.egenmeldingsperioder.flere-perioder-mangler-utfylling'],
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
                    tekster['feilmelding.egenmeldingsperioder.overlapp'],
                    null,
                    Skjemafelt.EGENMELDINGSPERIODER,
                );
            }
        }
        return true;
    });
