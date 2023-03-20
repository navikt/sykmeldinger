import React, { Suspense } from 'react'
import { ApolloClient, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { headers } from 'next/headers'

import possibleTypesGenerated from '../fetching/possible-types.generated'
import schema from '../server/graphql/schema'
import { SykmeldingerDocument } from '../fetching/graphql.generated'
import LoadingError from '../components-new/page-loading/LoadingError'
import ClientSykmeldingerList from '../components-new/sykmeldinger/ClientSykmeldingerList'
import Header from '../components/Header/Header'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'

export function createSsrApolloClient(): ApolloClient<NormalizedCacheObject> {
    const authHeader = headers().get('Authorization')

    console.log('Local dev: authHeader', authHeader)

    return new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache({ possibleTypes: possibleTypesGenerated.possibleTypes }),
        link: from([
            new SchemaLink({
                schema,
                context: () => ({
                    accessToken: 'fake',
                    payload: 'fake-payload',
                    requestId: 'local-dev',
                }),
            }),
        ]),
    })
}

async function Page(): Promise<JSX.Element> {
    return (
        <>
            <head>
                <title>Sykmeldinger - www.nav.no</title>
            </head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                <Suspense fallback={<SykmledingSkeleton />}>
                    {/* @ts-expect-error Wrong JSX typing for RSC */}
                    <SykmeldingerList />
                </Suspense>
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
    )
}

async function SykmeldingerList(): Promise<JSX.Element> {
    const client = createSsrApolloClient()
    const sykmeldinger = await client.query({ query: SykmeldingerDocument })

    if (sykmeldinger.error) {
        return <LoadingError message={sykmeldinger.error.message} />
    }

    return <ClientSykmeldingerList sykmeldinger={sykmeldinger.data.sykmeldinger} />
}

function SykmledingSkeleton(): JSX.Element {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Page
