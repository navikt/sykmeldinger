import React, { ReactElement, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import {
    Dev_ChangeUserScenarioDocument,
    Dev_SetAntallArbeidsgivereDocument,
    Dev_ToggleStrengtFortroligAdresseDocument,
} from '../../fetching/graphql.generated'
import { Scenarios } from '../../server/graphql/mock-db/scenarios'

type PlaywrightDevtoolFunctions = {
    setArbeidsgivereCount: (count: number) => void
    setStrengtFortroligAdresse: () => void
    setScenario: (scenario: Scenarios) => void
}

declare global {
    interface Window {
        playwrightDevtools?: PlaywrightDevtoolFunctions
    }
}

function PlaywrightDevtools(): ReactElement {
    const client = useApolloClient()
    const [scenarioMutation, scenarioMutationResult] = useMutation(Dev_ChangeUserScenarioDocument)
    const [antallArbeidsgivereMutation, antallArbeidsgivereMutationResult] = useMutation(
        Dev_SetAntallArbeidsgivereDocument,
    )
    const [toggleMutation, toggleMutationResult] = useMutation(Dev_ToggleStrengtFortroligAdresseDocument)

    useEffect(() => {
        window.playwrightDevtools = {
            setArbeidsgivereCount: (count: number): void => {
                logger.info(`Setting antall arbeidsgivere to ${count}`)
                antallArbeidsgivereMutation({
                    variables: { antall: count },
                })
            },
            setStrengtFortroligAdresse: (): void => {
                logger.info('Toggling strengt fortrolig adresse')
                toggleMutation()
            },
            setScenario: (scenario: Scenarios): void => {
                logger.info(`Setting scenario to ${scenario}`)
                scenarioMutation({
                    variables: { scenario },
                }).then(() => client.cache.reset())
            },
        }

        return () => {
            delete window.playwrightDevtools
        }
    }, [antallArbeidsgivereMutation, client.cache, scenarioMutation, toggleMutation])

    return (
        <div
            data-testid="playwright-devtools"
            data-is-loading={
                antallArbeidsgivereMutationResult.loading ||
                toggleMutationResult.loading ||
                scenarioMutationResult.loading
            }
        />
    )
}

export default PlaywrightDevtools
