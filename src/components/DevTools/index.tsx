import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Button, Tooltip, Popover, Heading, Link, Alert, Checkbox, Select } from '@navikt/ds-react'
import { SandboxIcon } from '@navikt/aksel-icons'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import type { Scenarios } from '../../server/graphql/mock-db/scenarios'
import {
    Dev_BrukerinformasjonDocument,
    Dev_ChangeUserScenarioDocument,
    Dev_SetAntallArbeidsgivereDocument,
    Dev_ToggleStrengtFortroligAdresseDocument,
} from '../../fetching/graphql.generated'
import { cn } from '../../utils/tw-utils'

function Index(): ReactElement {
    const [showHint, setShowHint] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('devtools-hint') !== 'true') {
                setShowHint(true)
            }
        }, 500)
    }, [])

    return (
        <div className="fixed right-4 top-24">
            <Tooltip content="Verktøy for testing">
                <Button
                    ref={buttonRef}
                    onClick={() => setOpenState((b) => !b)}
                    icon={<SandboxIcon title="Åpne testdataverktøy" />}
                    variant="tertiary-neutral"
                />
            </Tooltip>
            <Popover
                open={showHint}
                onClose={() => {
                    localStorage.setItem('devtools-hint', 'true')
                    setShowHint(false)
                }}
                placement="bottom-end"
                anchorEl={buttonRef.current}
            >
                <Popover.Content>
                    <Heading size="small" level="3">
                        Tips!
                    </Heading>
                    <div className="w-[220px]">Her finner du verktøy for å endre mellom forskjellige brukere</div>
                </Popover.Content>
            </Popover>
            <Popover
                placement="bottom-end"
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={buttonRef.current}
                className="min-w-[20rem]"
            >
                <DevToolsContent />
            </Popover>
        </div>
    )
}

function DevToolsContent(): ReactElement {
    return (
        <Popover.Content>
            <Heading size="medium" level="3" spacing>
                Testdataverktøy
            </Heading>
            <ScenarioPicker />
            <ScenarioOptions />
        </Popover.Content>
    )
}

function ScenarioPicker(): ReactElement {
    const router = useRouter()
    const client = useApolloClient()
    const [changeUserScenario, { loading, error }] = useMutation(Dev_ChangeUserScenarioDocument)

    const handleChangeUserScenario = (scenario: Scenarios) => async () => {
        await changeUserScenario({ variables: { scenario } })
        await router.push('/')
        await client.cache.reset()
    }

    return (
        <div className={cn({ 'cursor-not-allowed opacity-70': loading })}>
            <Heading size="small" level="4">
                Testscenario
            </Heading>
            <ul
                className={cn('ml-6 list-disc', {
                    'pointer-events-none': loading,
                })}
            >
                <li>
                    <Link role="button" onClick={handleChangeUserScenario('normal')}>
                        En ny og noen gamle
                    </Link>
                </li>
                <li>
                    <Link role="button" onClick={handleChangeUserScenario('emptyState')}>
                        Ingen sykmeldinger
                    </Link>
                </li>
                <li>
                    <Link role="button" onClick={handleChangeUserScenario('harUnderBehandling')}>
                        Har en innsendt under behandling
                    </Link>
                </li>
            </ul>
            <Alert variant="info" size="small" className="mt-2">
                Endring av scenario vil slette eventuelle innsendinger og endringer du har gjort.
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
            <Checkbox
                value="strengtFortroligAdresse"
                disabled={anyLoading}
                onChange={() => toggleMutation()}
                checked={brukerinformasjonQuery.data?.brukerinformasjon.strengtFortroligAdresse ?? false}
            >
                Strengt fortrolig adresse
            </Checkbox>
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
            </Select>
        </div>
    )
}

export default Index
