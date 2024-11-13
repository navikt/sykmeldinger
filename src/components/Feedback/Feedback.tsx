import { Alert, BodyShort, Button, Heading, Textarea } from '@navikt/ds-react'
import { PropsWithChildren, ReactElement, useReducer } from 'react'
import { MagnifyingGlassIcon, ThumbUpIcon } from '@navikt/aksel-icons'
import { useMutation } from '@apollo/client'

import { FeedbackDocument } from 'queries'

import { cn } from '../../utils/tw-utils'

import { feedbackReducer, initialState } from './FeedbackReducer'

type Props = {
    feedbackId: string
    metadata: Record<string, string>
}

const responseTypeToLabelMap = {
    JA: 'Vil du foreslå en forbedring? (valgfritt)',
    NEI: 'Hva synes du var utfordrene?',
} as const

function Feedback({ feedbackId, metadata }: Props): ReactElement {
    const [{ activeResponseType, textValue, errorMessage, isComplete }, dispatch] = useReducer(
        feedbackReducer,
        initialState,
    )
    const [mutate, result] = useMutation(FeedbackDocument)

    const handleSend = async (): Promise<void> => {
        if (activeResponseType === 'NEI' && (textValue == null || textValue.trim() === '')) {
            dispatch({ type: 'error', message: 'Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.' })
            return
        }

        const payload = {
            app: 'sykmeldinger',
            feedback: textValue ?? null,
            svar: activeResponseType,
            feedbackId,
            ...metadata,
        }

        await mutate({ variables: { feedback: payload } })

        dispatch({ type: 'complete' })
    }

    return (
        <section aria-label="Tilbakemelding på sykmeldingen">
            <div className="w:full mt-16 md:w-3/4" data-cy="feedback-wrapper">
                {!isComplete && (
                    <>
                        <div className="flex p-4 bg-surface-subtle">
                            <MagnifyingGlassIcon className="self-center mr-2" fontSize="2rem" aria-hidden />
                            <div>
                                <Heading className="mb-1" level="2" size="xsmall">
                                    Tilbakemeldingen din er viktig for oss!
                                </Heading>
                                <BodyShort>Svarene dine er anonyme</BodyShort>
                            </div>
                        </div>
                        <div className="mt-1 rounded-medium p-6">
                            <BodyShort className="mb-6">Gikk det greit å sende inn sykmeldingen?</BodyShort>
                            <div className="flex w-full gap-2">
                                <FeedbackButton
                                    handleClick={() => dispatch({ type: 'feedback-type', value: 'JA' })}
                                    active={activeResponseType === 'JA'}
                                    disabled={result.loading}
                                >
                                    Ja
                                </FeedbackButton>
                                <FeedbackButton
                                    handleClick={() => dispatch({ type: 'feedback-type', value: 'NEI' })}
                                    active={activeResponseType === 'NEI'}
                                    disabled={result.loading}
                                >
                                    Nei
                                </FeedbackButton>
                            </div>
                            {activeResponseType != null && (
                                <form className="mt-6 flex w-full flex-col gap-4">
                                    <Textarea
                                        data-cy="feedback-textarea"
                                        error={errorMessage}
                                        label={responseTypeToLabelMap[activeResponseType]}
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter' && e.ctrlKey) {
                                                e.preventDefault()
                                                await handleSend()
                                            }
                                        }}
                                        disabled={result.loading}
                                        value={textValue ?? ''}
                                        onChange={(e) => {
                                            dispatch({ type: 'input', value: e.target.value })
                                        }}
                                        maxLength={600}
                                        minRows={3}
                                        description="Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger."
                                    />
                                    <Alert variant="warning">
                                        Tilbakemeldingen din er anonym og vil ikke knyttes til søknaden din. Den brukes
                                        kun for å gjøre nettsidene bedre.
                                    </Alert>
                                    <Button
                                        data-cy="send-feedback"
                                        className="mr-auto"
                                        size="small"
                                        variant="secondary-neutral"
                                        type="button"
                                        onClick={handleSend}
                                        loading={result.loading}
                                    >
                                        Send tilbakemelding
                                    </Button>
                                </form>
                            )}
                        </div>
                    </>
                )}
                <div aria-live="polite">
                    {isComplete && (
                        <div className="flex mt-2 rounded-medium bg-surface-success-subtle p-6">
                            <ThumbUpIcon className="self-center" title="Tommel opp" fontSize="3rem" />
                            <div className="ml-4">
                                <Heading level="2" size="small" as="p" className="flex items-center">
                                    Takk for tilbakemeldingen!
                                </Heading>
                                <BodyShort className="mt-2">
                                    Vi setter pris på at du tok deg tid til å dele dine tanker med oss.
                                </BodyShort>
                            </div>
                        </div>
                    )}
                    {result.error && (
                        <Alert variant="error">
                            Vi klarte dessverre ikke å ta i mot tilbakemeldingen din. Prøv gjerne igjen om litt!
                        </Alert>
                    )}
                </div>
            </div>
        </section>
    )
}

interface FeedbackButtonProps {
    handleClick: () => void
    active?: boolean
    disabled?: boolean
}

function FeedbackButton({
    active,
    disabled,
    handleClick,
    children,
}: PropsWithChildren<FeedbackButtonProps>): ReactElement {
    return (
        <Button
            variant="secondary-neutral"
            size="small"
            onClick={handleClick}
            disabled={disabled}
            className={cn({
                'bg-surface-neutral-active text-text-on-inverted hover:bg-surface-neutral-active focus:text-white':
                    active,
            })}
        >
            {children}
        </Button>
    )
}

export default Feedback
