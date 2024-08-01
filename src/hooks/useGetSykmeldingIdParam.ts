import { useParams } from 'next/navigation'

function useGetSykmeldingIdParam(): string {
    const params = useParams()

    if (params == null) {
        throw new Error(`Missing all params`)
    }

    if (typeof params.sykmeldingId !== 'string') {
        throw new Error(`Illegal param: ${params.sykmeldingId}`)
    }

    return params.sykmeldingId
}

export default useGetSykmeldingIdParam
