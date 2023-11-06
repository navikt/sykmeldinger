import { CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Tooltip, Popover, Heading, Alert, Select, LinkPanel, Modal, Link, Switch } from '@navikt/ds-react'
import { SandboxIcon } from '@navikt/aksel-icons'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { toPairs } from 'remeda'

import {
    Dev_BrukerinformasjonDocument,
    Dev_ChangeUserScenarioDocument,
    Dev_SetAntallArbeidsgivereDocument,
    Dev_ToggleStrengtFortroligAdresseDocument,
} from 'queries'

import type { Scenarios } from '../../server/graphql/mock-db/scenarios'
import { cn } from '../../utils/tw-utils'
import { simpleScenarios, otherScenarios } from '../../server/graphql/mock-db/scenarios'

function Index(): ReactElement {
    const [showHint, setShowHint] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    const dismissHint = useCallback(() => {
        localStorage.setItem('devtools-hint', 'true')
        setShowHint(false)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('devtools-hint') !== 'true') {
                setShowHint(true)
            }
        }, 1000)
    }, [])

    return (
        <>
            <div className="fixed bottom-4 right-4 sm:right-4 sm:top-24" hidden={openState}>
                <Tooltip content="Verktøy for testing">
                    <Button
                        ref={buttonRef}
                        onClick={() => setOpenState((b) => !b)}
                        icon={<SandboxIcon title="Åpne testdataverktøy" />}
                        variant="tertiary-neutral"
                    />
                </Tooltip>
                <div
                    style={
                        {
                            '--ac-popover-bg': 'var(--a-surface-info-subtle)',
                            '--ac-popover-border': 'var(--a-border-info)',
                        } as CSSProperties
                    }
                >
                    <Popover open={showHint} onClose={() => void 0} placement="bottom-end" anchorEl={buttonRef.current}>
                        <Popover.Content>
                            <Heading size="small" level="3" className="motion-safe:animate-bounce">
                                Tips!
                            </Heading>
                            <div className="w-[220px]">
                                Her finner du verktøy for å endre mellom forskjellige brukere
                            </div>
                            <Button onClick={dismissHint} className="mt-2" variant="secondary-neutral" size="small">
                                OK!
                            </Button>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
            <Modal
                open={openState}
                onClose={() => {
                    if (showHint) dismissHint()

                    setOpenState(false)
                }}
                header={{ heading: 'Testdataverktøy' }}
            >
                <DevToolsContent closeModal={() => setOpenState(false)} />
            </Modal>
        </>
    )
}

function DevToolsContent({ closeModal }: { closeModal: () => void }): ReactElement {
    return (
        <Modal.Body>
            <ScenarioPicker closeModal={closeModal} />
            <ScenarioOptions />
        </Modal.Body>
    )
}

function ScenarioPicker({ closeModal }: { closeModal: () => void }): ReactElement {
    const router = useRouter()
    const client = useApolloClient()
    const [changeUserScenario, { loading, error }] = useMutation(Dev_ChangeUserScenarioDocument)

    const handleChangeUserScenario = (scenario: Scenarios) => async () => {
        await changeUserScenario({ variables: { scenario } })
        if (router.pathname !== '/') {
            await router.push('/')
        }
        await client.cache.reset()

        closeModal()
    }

    return (
        <div className={cn({ 'cursor-not-allowed opacity-70': loading })}>
            <Alert variant="warning" size="small" className="mt-2" inline>
                Endring av scenario vil slette eventuelle innsendinger og endringer du har gjort.
            </Alert>
            <Heading size="small" level="4" className="mt-2">
                Vanlige scenarioer
            </Heading>
            <ul
                className={cn('mt-2 flex flex-col gap-2', {
                    'pointer-events-none': loading,
                })}
            >
                {toPairs.strict(simpleScenarios).map(([key, { description }]) => {
                    return (
                        <li key={key}>
                            <LinkPanel
                                as="button"
                                onClick={handleChangeUserScenario(key)}
                                className="w-full text-start"
                            >
                                {description}
                            </LinkPanel>
                        </li>
                    )
                })}
            </ul>
            <Heading size="small" level="4" className="mt-2">
                Andre scenarioer
            </Heading>
            <ul
                className={cn('mt-2 flex flex-col gap-2', {
                    'pointer-events-none': loading,
                })}
            >
                {toPairs.strict(otherScenarios).map(([key, { description }]) => {
                    return (
                        <li key={key}>
                            <LinkPanel
                                as="button"
                                onClick={handleChangeUserScenario(key)}
                                className="w-full text-start"
                            >
                                {description}
                            </LinkPanel>
                        </li>
                    )
                })}
            </ul>
            <Alert variant="info" inline className="mt-2">
                Noen ønsker til scenarioer i demo-versjonen? Ta kontakt på{' '}
                <Link href="https://nav-it.slack.com/archives/CMA3XV997" target="_blank" rel="noopener noreferrer">
                    #team-sykmelding
                </Link>{' '}
                på Slack!
            </Alert>
            {error && (
                <Alert variant="error" className="mt-4">
                    Kunne ikke endre scenario
                </Alert>
            )}
        </div>
    )
}

function ScenarioOptions(): ReactElement {
    const brukerinformasjonQuery = useQuery(Dev_BrukerinformasjonDocument)
    const [toggleMutation, toggleMutationResult] = useMutation(Dev_ToggleStrengtFortroligAdresseDocument, {
        refetchQueries: [Dev_BrukerinformasjonDocument],
    })
    const [antallArbeidsgivereMutation, antallArbeidsgivereMutationResult] = useMutation(
        Dev_SetAntallArbeidsgivereDocument,
        { refetchQueries: [Dev_BrukerinformasjonDocument] },
    )

    const anyLoading =
        brukerinformasjonQuery.loading || toggleMutationResult.loading || antallArbeidsgivereMutationResult.loading

    return (
        <div className={cn({ 'cursor-not-allowed opacity-70': anyLoading })}>
            <Heading size="small" level="4" className="mt-4">
                Oppdater scenario
            </Heading>
            <Switch
                value="strengtFortroligAdresse"
                disabled={anyLoading}
                onChange={() => toggleMutation()}
                checked={brukerinformasjonQuery.data?.brukerinformasjon.strengtFortroligAdresse ?? false}
            >
                Strengt fortrolig adresse
            </Switch>
            <Select
                label="Antall arbeidsgivere"
                onChange={(event) =>
                    antallArbeidsgivereMutation({
                        variables: { antall: +event.currentTarget.value },
                    })
                }
                disabled={anyLoading}
                value={brukerinformasjonQuery.data?.brukerinformasjon.arbeidsgivere.length.toString()}
            >
                <option value="0">Ingen</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </Select>
        </div>
    )
}

export default Index
