import React, { useEffect, useRef, useState } from 'react'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'
import { Close } from '@navikt/ds-icons'

import { FormValues } from '../SendSykmeldingForm'
import {
    ArbeidssituasjonType,
    ChangeSykmeldingStatusMutation,
    SendSykmeldingMutation,
    SykmeldingChangeStatus,
} from '../../../fetching/graphql.generated'
import { useChangeSykmeldingStatus } from '../../../hooks/useMutations'
import { logAmplitudeEvent } from '../../../amplitude/amplitude'

import { getTrengerNySykmelding } from './shared/sykmeldingUtils'
import styles from './ActionSection.module.css'
import { QuestionWrapper } from './shared/FormStructure'

interface Props {
    sykmeldingId: string
    sendResult: MutationResult<SendSykmeldingMutation>
}

function ActionSection({ sykmeldingId, sendResult }: Props): JSX.Element {
    const avbryteRef = useRef<HTMLButtonElement>(null)
    const [avbrytSykmelding, setAvbrytSykmelding] = useState(false)
    const { watch } = useFormContext<FormValues>()

    const erArbeidstaker = watch('arbeidssituasjon') === ArbeidssituasjonType.Arbeidstaker
    const trengerNySykmelding = getTrengerNySykmelding(watch('uriktigeOpplysninger'))

    if (trengerNySykmelding) {
        return <AvbrytTrengerNySykmelding sykmeldingId={sykmeldingId} />
    }

    return (
        <QuestionWrapper>
            <div className={styles.actionSectionButtons}>
                <Button variant="primary" type="submit" loading={sendResult.loading}>
                    {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding
                </Button>
                <Button
                    ref={avbryteRef}
                    variant="tertiary"
                    type="button"
                    onClick={() => setAvbrytSykmelding((b) => !b)}
                >
                    Jeg vil avbryte sykmeldingen
                </Button>
            </div>
            {avbrytSykmelding && (
                <AvbrytSykmeldingen
                    sykmeldingId={sykmeldingId}
                    closeAvbryt={() => {
                        setAvbrytSykmelding(false)
                        requestAnimationFrame(() => avbryteRef.current?.focus())
                    }}
                />
            )}
            {sendResult.error && (
                <Alert className={styles.feedbackError} variant="error" role="alert">
                    <Heading size="small" level="3" spacing>
                        Klarte ikke å sende inn sykmeldingen
                    </Heading>
                    <BodyShort spacing>
                        Innsendingen av ble ikke gjennomført på grunn av en ukjent feil, vi jobber allerede med å løse
                        problemet. Vennligst prøv igjen senere.
                    </BodyShort>
                    <BodyShort>Vennligst kontakt NAV dersom problemet vedvarer.</BodyShort>
                </Alert>
            )}
        </QuestionWrapper>
    )
}

function AvbrytTrengerNySykmelding({ sykmeldingId }: { sykmeldingId: string }): JSX.Element {
    const panelRef = useRef<HTMLDivElement>(null)
    const [{ loading, error }, avbryt] = useAvbryt(sykmeldingId)

    return (
        <Panel ref={panelRef} className={styles.avbrytPanel}>
            <Heading size="small" level="3" spacing>
                Du kan ikke bruke denne sykmeldingen
            </Heading>
            <BodyShort className={styles.avbrytText}>
                Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
            </BodyShort>
            <Button className={styles.confirmButton} variant="danger" type="button" loading={loading} onClick={avbryt}>
                Avbryt sykmeldingen
            </Button>
            {error && (
                <Alert className={styles.feedbackError} variant="error" role="alert">
                    Det oppsto en feil ved avbryting av sykmeldingen. Vennligst prøv igjen senere.
                </Alert>
            )}
        </Panel>
    )
}

function AvbrytSykmeldingen({
    sykmeldingId,
    closeAvbryt,
}: {
    sykmeldingId: string
    closeAvbryt: () => void
}): JSX.Element {
    const panelRef = useRef<HTMLDivElement>(null)
    const [{ loading, error }, avbryt] = useAvbryt(sykmeldingId)

    useEffect(() => {
        panelRef.current?.focus()
    }, [panelRef])

    return (
        <Panel
            ref={panelRef}
            className={styles.avbrytPanel}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    closeAvbryt()
                }
            }}
            tabIndex={-1}
            role="dialog"
            aria-labelledby={`${sykmeldingId}-avbryt-body`}
        >
            <BodyShort id={`${sykmeldingId}-avbryt-body`} className={styles.avbrytText}>
                Er du sikker på at du vil avbryte sykmeldingen?
            </BodyShort>
            <Button className={styles.confirmButton} variant="danger" type="button" loading={loading} onClick={avbryt}>
                Ja, jeg er sikker
            </Button>
            <Button
                className={styles.closeAvbryt}
                variant="tertiary"
                type="button"
                icon={<Close title="Lukk avbryt panel" />}
                onClick={closeAvbryt}
            />
            {error && (
                <Alert className={styles.feedbackError} variant="error" role="alert">
                    Det oppsto en feil ved avbryting av sykmeldingen. Vennligst prøv igjen senere.
                </Alert>
            )}
        </Panel>
    )
}

function useAvbryt(sykmeldingId: string): [MutationResult<ChangeSykmeldingStatusMutation>, () => void] {
    return useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Avbryt,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn: 'avbryt åpen sykmelding' } }),
        () =>
            logAmplitudeEvent({
                eventName: 'skjema innsending feilet',
                data: { skjemanavn: 'avbryt åpen sykmelding' },
            }),
    )
}

export default ActionSection
