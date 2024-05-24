import { useRouter } from 'next/router'

function useGetSykmeldingIdParam(): string {
    const router = useRouter()

    if (typeof router.query.sykmeldingId !== 'string') {
        throw new Error(`Illegal param: ${router.query.sykmeldingId}`)
    }

    return router.query.sykmeldingId
}

export default useGetSykmeldingIdParam
