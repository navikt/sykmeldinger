import React, { ReactElement } from 'react'
import Link from 'next/link'
import { isBefore } from 'date-fns'

import { LinkPanel, Tag } from '../aksel/client'
import { Heading, BodyShort } from '../aksel/server'
import { cn } from '../../../utils/tw-utils'
import { Periodetype, RegelStatus, StatusEvent } from '../../../fetching/graphql.generated'
import LenkepanelIcon from '../../../components/SykmeldingLinkPanel/Lenkepanel/LenkepanelIcon'
import { Sykmelding } from '../../db'
import { diffInDays, toDate, toReadableDatePeriod } from '../../../utils/dateUtils'

function SykmeldingLinkPanel({ sykmelding, notifying }: { sykmelding: Sykmelding; notifying: boolean }): ReactElement {
    return (
        <Link legacyBehavior passHref href={`/new/${sykmelding.sykmelding_id}`}>
            <LinkPanel
                className={cn('mb-4 p-6 [&>div]:w-full', {
                    'border-orange-300 bg-orange-50 hover:border-orange-500': notifying,
                })}
            >
                <div className="flex gap-3 max-[560px]:flex-col">
                    <div className="mr-8 hidden sm:block">
                        <LenkepanelIcon
                            behandlingsutfall={sykmelding.rule_hits[0].ruleStatus as RegelStatus}
                            isPaper={sykmelding.sykmelding.papirsykmelding}
                        />
                    </div>
                    <div className="grow">
                        <BodyShort>{getReadableSykmeldingLength(sykmelding)}</BodyShort>
                        <Heading size="small" level="3">
                            Sykmelding
                        </Heading>
                        <ul className="list-disc pl-4">
                            {sykmelding.sykmelding.sykmeldingsperioder.map((periode, index) => (
                                <li key={index}>
                                    <BodyShort>{getDescription(periode, sykmelding.arbeidsgiver?.orgNavn)}</BodyShort>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex shrink-0 items-center">
                        <SykmeldingLinkPanelTag
                            status={sykmelding.event as StatusEvent}
                            behandlingsutfall={sykmelding.rule_hits[0].ruleStatus as RegelStatus}
                        />
                    </div>
                </div>
            </LinkPanel>
        </Link>
    )
}

function SykmeldingLinkPanelTag({
    status,
    behandlingsutfall,
}: {
    status: StatusEvent
    behandlingsutfall: RegelStatus
}): ReactElement | null {
    if (behandlingsutfall === 'INVALID') {
        if (status === 'APEN' || status === 'BEKREFTET') {
            return (
                <Tag variant="warning" size="small">
                    Avvist av NAV
                </Tag>
            )
        }
    }

    switch (status) {
        case 'AVBRUTT':
            return (
                <Tag variant="error" size="small">
                    Avbrutt av deg
                </Tag>
            )
        case 'SENDT':
            return (
                <Tag variant="success" size="small">
                    Sendt til arbeidsgiver
                </Tag>
            )
        case 'UTGATT':
            return (
                <Tag variant="info" size="small">
                    Utgått
                </Tag>
            )
        case 'BEKREFTET':
            return (
                <Tag variant="success" size="small">
                    Sendt til NAV
                </Tag>
            )
        default:
            return null
    }
}

function getReadableSykmeldingLength(sykmelding: Sykmelding): string {
    const fom = sykmelding.sykmelding.sykmeldingsperioder
        .map((it) => toDate(it.fom))
        .reduce((acc, value) => {
            return isBefore(value, acc) ? value : acc
        })

    const tom = sykmelding.sykmelding.sykmeldingsperioder
        .map((it) => toDate(it.tom))
        .reduce((acc, value) => {
            return isBefore(value, acc) ? value : acc
        })

    return toReadableDatePeriod(fom, tom)
}

export function getDescription(
    periode: Sykmelding['sykmelding']['sykmeldingsperioder'][number],
    arbeidsgiverNavn?: string,
): string {
    const periodLength = diffInDays(periode.fom, periode.tom)

    switch (periode.type) {
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                periodLength > 1 ? 'er' : ''
            }`
        case Periodetype.GRADERT:
            return `${periode.gradert?.grad}% sykmeldt${
                arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
            } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.BEHANDLINGSDAGER:
            return `${periode.behandlingsdager} behandlingsdag${
                periode.behandlingsdager && periode.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.AVVENTENDE:
            return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        case Periodetype.REISETILSKUDD:
            return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`
        default:
            return ''
    }
}

export default SykmeldingLinkPanel
