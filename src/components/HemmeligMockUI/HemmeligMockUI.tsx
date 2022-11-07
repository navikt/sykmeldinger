import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Popover, Select } from '@navikt/ds-react'
import { Settings } from '@navikt/ds-icons'
import { useApolloClient } from '@apollo/client'

import { getPublicEnv } from '../../utils/env'

import styles from './HemmeligMockUI.module.css'

const publicEnv = getPublicEnv()

function HemmeligMockUI(): JSX.Element | null {
    const client = useApolloClient()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)
    const [users, setUsers] = useState<string[]>([])
    const searchParamUser: string | null = new URLSearchParams(window.location.search).get('user') ?? null
    const localStorageUser = localStorage.getItem('mockUser') ?? 'standard'

    useLayoutEffect(() => {
        if (searchParamUser?.trim() && searchParamUser.trim() !== localStorageUser) {
            localStorage.setItem('mockUser', searchParamUser.trim())
            client.resetStore()
            client.refetchQueries({ include: 'all' })
        }
    }, [client, localStorageUser, searchParamUser])

    useEffect(() => {
        fetch(`${publicEnv.publicPath}/api/mock/get-mock-users`)
            .then((it) => it.json())
            .then(({ users }) => setUsers(users))
    }, [])

    return (
        <>
            <Button
                className={styles.mockWrapper}
                ref={buttonRef}
                onClick={() => setOpenState((b) => !b)}
                variant="tertiary"
                icon={<Settings />}
            >
                Aktiv bruker: {localStorageUser}
            </Button>
            <Popover open={openState} onClose={() => setOpenState(false)} anchorEl={buttonRef.current}>
                <Popover.Content className={styles.popoverContent}>
                    <Link href="/hemmelig/mock">
                        <a onClick={() => setOpenState(false)}>Gå til labs testdatagenerator</a>
                    </Link>
                    <Select
                        label="Velg testbruker"
                        value={localStorageUser}
                        onChange={(value) => {
                            localStorage.setItem('mockUser', value.target.value)
                            client.resetStore()
                            client.refetchQueries({ include: 'all' })
                            setOpenState(false)
                        }}
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </Select>
                    <div>
                        Bruk query param ?user=brukernavn for å velge eller opprette andre brukere, eller for å lage en
                        lenke du kan sende til tester med test-brukeren aktivert.
                    </div>
                </Popover.Content>
            </Popover>
        </>
    )
}

export default HemmeligMockUI
