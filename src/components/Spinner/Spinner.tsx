import { Heading, Loader } from '@navikt/ds-react'
import cn from 'classnames'

interface SpinnerProps {
    className?: string
    headline: string
}

function Spinner({ className, headline }: SpinnerProps): JSX.Element {
    return (
        <div className={cn(className, 'flex flex-col items-center')}>
            <Heading size="medium" className="mb-4">
                {headline}
            </Heading>
            <Loader />
        </div>
    )
}

export default Spinner
