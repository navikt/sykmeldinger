import { Heading, Loader } from '@navikt/ds-react'
import cn from 'classnames'
import { ReactElement } from 'react'

interface SpinnerProps {
    className?: string
    headline: string
}

function Spinner({ className, headline }: SpinnerProps): ReactElement {
    return (
        <div className={cn(className, 'flex flex-col items-center')}>
            <Heading level="2" size="medium" className="mb-4">
                {headline}
            </Heading>
            <Loader />
        </div>
    )
}

export default Spinner
