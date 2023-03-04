import { Heading, Loader } from '@navikt/ds-react'

interface SpinnerProps {
    headline: string
}

function Spinner({ headline }: SpinnerProps): JSX.Element {
    return (
        <div className="flex flex-col items-center">
            <Heading size="medium" className="mb-4">
                {headline}
            </Heading>
            <Loader />
        </div>
    )
}

export default Spinner
