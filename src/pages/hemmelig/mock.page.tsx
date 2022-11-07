import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Button, TextField, Select, Heading, BodyLong, Tabs } from '@navikt/ds-react'
import Link from 'next/link'

import { getPublicEnv, isLocalOrDemo } from '../../utils/env'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { sykmeldingApen } from '../../server/graphql/mockData/sykmelding-apen'
import { toDateString } from '../../utils/dateUtils'
import { withAuthenticatedPage } from '../../auth/withAuthentication'

import styles from './mock.module.css'

const publicEnv = getPublicEnv()

async function fetchUsers(): Promise<string[]> {
    return fetch(`${publicEnv.publicPath}/api/mock/get-mock-users`)
        .then((it) => it.json())
        .then(({ users }) => users)
}

function MockPage(): JSX.Element {
    useUpdateBreadcrumbs(() => [{ title: 'Hemmelig Mock', href: '/hemmelig/mock' }], [])

    const [state, setState] = useState('simple')
    const [users, setUsers] = useState<string[]>([])

    const refetchUsers = useCallback(() => {
        fetchUsers().then(setUsers)
    }, [])

    useEffect(() => {
        refetchUsers()
    }, [refetchUsers])

    return (
        <div className={styles.contentWrapper}>
            <Tabs value={state} onChange={setState}>
                <Tabs.List>
                    <Tabs.Tab value="simple" label="Lag enkel sykmelding" />
                    <Tabs.Tab value="advanced" label="Lag avansert sykmelding" />
                    <Tabs.Tab value="delete-user" label="Slett bruker" />
                </Tabs.List>
                <Tabs.Panel value="simple">
                    <CreateSimpleSykmelding users={users} />
                </Tabs.Panel>
                <Tabs.Panel value="advanced">
                    <CreateAdvancedSykmelding users={users} />
                </Tabs.Panel>
                <Tabs.Panel value="delete-user">
                    <DeleteUser users={users} refetchUsers={refetchUsers} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

function CreateSimpleSykmelding({ users }: { users: string[] }): JSX.Element {
    const [dataCreated, setDataCreated] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        setError(null)
        setDataCreated(null)

        event.preventDefault()

        // @ts-expect-error - it exists
        const formElements = event.target.elements
        const body = {
            isAdvanced: false,
            user: formElements.user.value,
            id: formElements.id.value,
            periodeFom: formElements.fom.value,
            periodeTom: formElements.tom.value,
            arbeidsgiverNavn: formElements.arbeidsgiver.value,
        }

        const result = await fetch(`${publicEnv.publicPath}/api/mock/create-mock`, {
            method: 'POST',
            body: JSON.stringify(body),
        })

        if (result.ok) {
            const { id } = await result.json()
            setDataCreated(id)
        } else {
            setError(JSON.stringify(await result.json(), null, 2))
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Select name="user" label="Bruker">
                {users.map((user) => (
                    <option key={user} value={user}>
                        {user}
                    </option>
                ))}
            </Select>
            <BodyLong className={styles.explanation}>
                I enkel modus opprettes en enkel sykmelding med èn AktivitetIkkeMulig-periode med gitt fra og til
                datoer.
            </BodyLong>
            <div className={styles.simpleMode}>
                <TextField name="id" label="Sykmelding ID, denne vises i URL-en" />
                <TextField name="arbeidsgiver" label="Navn på arbeidsgiver" />
                <TextField name="fom" label="Periode fom (YYYY-MM-DD)" />
                <TextField name="tom" label="Periode tom (YYYY-MM-DD)" />
            </div>
            <Button className={styles.opprettButton}>Opprett sykmelding</Button>
            <CreateFeedback dataCreated={dataCreated} error={error} />
        </form>
    )
}

function CreateAdvancedSykmelding({ users }: { users: string[] }): JSX.Element {
    const advancedRef = useRef<HTMLPreElement | null>(null)
    const [dataCreated, setDataCreated] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        setError(null)
        setDataCreated(null)

        event.preventDefault()

        // @ts-expect-error - it exists
        const formElements = event.target.elements
        const body = {
            isAdvanced: true,
            user: formElements.user.value,
            sykmelding: advancedRef.current?.innerText,
        }

        const result = await fetch(`${publicEnv.publicPath}/api/mock/create-mock`, {
            method: 'POST',
            body: JSON.stringify(body),
        })

        if (result.ok) {
            const { id } = await result.json()
            setDataCreated(id)
        } else {
            setError(JSON.stringify(await result.json(), null, 2))
        }
    }
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Heading size="medium">Hemmelig side for generering av testadata i labs</Heading>
            <div>
                <Select name="user" label="Bruker">
                    {users.map((user) => (
                        <option key={user} value={user}>
                            {user}
                        </option>
                    ))}
                </Select>
            </div>
            <BodyLong className={styles.explanation}>
                I avansert modus har du full kontroll, dette er i utgangspunktet en sykmelding med to perioder, for å
                redigere den må du passe JSON-en du lager være gyldig
            </BodyLong>
            <pre ref={advancedRef} contentEditable className={styles.advancedInput}>
                {JSON.stringify(sykmeldingApen(toDateString(new Date()), 'CHANGE-ME'), null, 2)}
            </pre>
            <Button className={styles.opprettButton}>Opprett sykmelding</Button>
            <CreateFeedback dataCreated={dataCreated} error={error} />
        </form>
    )
}

function CreateFeedback({ dataCreated, error }: { dataCreated: string | null; error: string | null }): JSX.Element {
    return (
        <div className={styles.feedback}>
            {dataCreated && (
                <Alert variant="success">
                    Mock data laget,{' '}
                    <Link href={`/${dataCreated}`}>
                        <a>gå til sykmelding</a>
                    </Link>
                    . Husk å sette brukeren du opprettet sykmeldinen for som aktiv.
                </Alert>
            )}
            {error && (
                <Alert variant="error">
                    <pre>{error}</pre>
                </Alert>
            )}
        </div>
    )
}

function DeleteUser({ users, refetchUsers }: { users: string[]; refetchUsers: () => void }): JSX.Element {
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        // @ts-expect-error - it exists
        const formElements = event.target.elements
        const result = await fetch(`${publicEnv.publicPath}/api/mock/delete-mock-user`, {
            method: 'POST',
            body: JSON.stringify({ user: formElements.user.value }),
        })

        if (result.ok) {
            setResult('ok')
            refetchUsers()
        } else {
            setError(JSON.stringify(await result.json(), null, 2))
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Select name="user" label="Bruker">
                {users.map((user) => (
                    <option key={user} value={user}>
                        {user}
                    </option>
                ))}
            </Select>
            <Button variant="danger" className={styles.opprettButton}>
                Slett bruker
            </Button>
            {result && <Alert variant="success">Bruker slettet {result}</Alert>}
            {error && (
                <Alert variant="error">
                    <pre>{error}</pre>
                </Alert>
            )}
        </form>
    )
}

export const getServerSideProps = withAuthenticatedPage(async () => {
    if (!isLocalOrDemo) {
        return { notFound: true }
    }

    return { props: {} }
})

export default MockPage
