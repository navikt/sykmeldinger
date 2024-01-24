import React, { ReactElement } from 'react'
import { BoatIcon, BriefcaseIcon, CheckmarkCircleIcon, TasklistIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'
import { ExpansionCard } from '@navikt/ds-react'

import { BrukerSvarFragment, JaEllerNei } from 'queries'

import { SykmeldingInfo, SykmeldingListInfo } from '../../../molecules/sykmelding/SykmeldingInfo'
import { arbeidsSituasjonEnumToText, uriktigeOpplysningerEnumToText } from '../../../../utils/sporsmal'
import { capitalizeFirstLetter, pluralize } from '../../../../utils/stringUtils'
import { toReadableDate, toReadableDatePeriod } from '../../../../utils/dateUtils'
import { FormValues } from '../../../SendSykmelding/SendSykmeldingForm'

import { mapFormValuesToBrukerSvar, SporsmaltekstMetadata } from './BrukerSvarUtils'

export type { SporsmaltekstMetadata }

type Props = {
    brukerSvar: BrukerSvarFragment | { values: FormValues; sporsmaltekstMetadata: SporsmaltekstMetadata }
}

export function BrukerSvarExpansionCard({ brukerSvar }: Props): ReactElement {
    const mappedValues: BrukerSvarFragment =
        '__typename' in brukerSvar
            ? brukerSvar
            : mapFormValuesToBrukerSvar(brukerSvar.values, brukerSvar.sporsmaltekstMetadata)

    return (
        <ExpansionCard aria-labelledby="oppsummering-bruker-svar-heading" className="pb-8">
            <ExpansionCard.Header>
                <div className="flex items-center gap-4">
                    <div className="mt-1.5 grid shrink-0 place-content-center text-4xl">
                        <TasklistIcon role="img" aria-hidden />
                    </div>
                    <ExpansionCard.Title id="oppsummering-bruker-svar-heading" as="h2">
                        Dine svar
                    </ExpansionCard.Title>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BrukerSvar brukerSvar={mappedValues} />
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

function BrukerSvar({ brukerSvar }: { brukerSvar: BrukerSvarFragment }): ReactElement {
    return (
        <div>
            <YesNoAnswer response={brukerSvar.erOpplysningeneRiktige} />
            <UriktigeOpplysningerAnswer response={brukerSvar.uriktigeOpplysninger} />
            <ArbeidssituasjonAnswer response={brukerSvar.arbeidssituasjon} />
            <ArbeidsgiverOrgnummerAnswer response={brukerSvar.arbeidsgiverOrgnummer} />
            <YesNoAnswer response={brukerSvar.riktigNarmesteLeder} />
            <YesNoAnswer response={brukerSvar.harBruktEgenmeldingsdager} />
            <EgenmeldingsdagerAnswer response={brukerSvar.egenmeldingsdager} />
            <YesNoAnswer response={brukerSvar.harBruktEgenmelding} />
            <FrilanserEgenmeldingsperioderAnswer response={brukerSvar.egenmeldingsperioder} />
            <YesNoAnswer response={brukerSvar.harForsikring} />
            <FiskerBladAnswer response={brukerSvar.fisker?.blad} />
            <FiskerLottOgHyreAnswer response={brukerSvar.fisker?.lottOgHyre} />
        </div>
    )
}

function UriktigeOpplysningerAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['uriktigeOpplysninger']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst}>
            <ul className="flex gap-1 flex-col">
                {response.svar.map((svar) => (
                    <li key={svar} className="flex gap-3 items-center">
                        <XMarkOctagonIcon aria-hidden className="text-xl" />
                        {uriktigeOpplysningerEnumToText(svar)}
                    </li>
                ))}
            </ul>
        </SykmeldingInfo>
    )
}

function YesNoAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<BrukerSvarFragment['erOpplysningeneRiktige']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} icon={<CheckmarkCircleIcon aria-hidden />}>
            {response.svar === JaEllerNei.JA ? 'Ja' : 'Nei'}
        </SykmeldingInfo>
    )
}

function ArbeidssituasjonAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['arbeidssituasjon']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} icon={<BriefcaseIcon aria-hidden />}>
            {capitalizeFirstLetter(arbeidsSituasjonEnumToText(response.svar))}
        </SykmeldingInfo>
    )
}

function ArbeidsgiverOrgnummerAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<BrukerSvarFragment['arbeidsgiverOrgnummer']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    // Name of employer?
    return (
        <SykmeldingInfo heading={response.sporsmaltekst} icon={<BriefcaseIcon aria-hidden />}>
            {response.svar}
        </SykmeldingInfo>
    )
}

function FiskerBladAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<NonNullable<BrukerSvarFragment['fisker']>['blad']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} icon={<BoatIcon aria-hidden />}>
            Blad {response.svar}
        </SykmeldingInfo>
    )
}

function FiskerLottOgHyreAnswer({
    response,
}: {
    response:
        | Pick<NonNullable<NonNullable<BrukerSvarFragment['fisker']>['lottOgHyre']>, 'sporsmaltekst' | 'svar'>
        | null
        | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingInfo heading={response.sporsmaltekst} icon={<BoatIcon aria-hidden />}>
            {capitalizeFirstLetter(response.svar.toLocaleLowerCase())}
        </SykmeldingInfo>
    )
}

function EgenmeldingsdagerAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['egenmeldingsdager']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingListInfo
            heading={response.sporsmaltekst}
            texts={[...response.svar.map(toReadableDate), `(${pluralize('dag', response.svar.length)})`]}
        />
    )
}

function FrilanserEgenmeldingsperioderAnswer({
    response,
}: {
    response: Pick<NonNullable<BrukerSvarFragment['egenmeldingsperioder']>, 'sporsmaltekst' | 'svar'> | null | undefined
}): ReactElement | null {
    if (response == null) return null

    return (
        <SykmeldingListInfo
            heading={response.sporsmaltekst}
            texts={response.svar.map((it) => toReadableDatePeriod(it.fom, it.tom))}
        />
    )
}
