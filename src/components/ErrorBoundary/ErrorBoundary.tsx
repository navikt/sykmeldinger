import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react'
import { ContentContainer } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

import ErrorFallback from './ErrorFallback'

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren<unknown>, State> {
    constructor(props: PropsWithChildren<unknown>) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        logger.error({ error, errorInfo })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <ContentContainer>
                    <ErrorFallback />
                </ContentContainer>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
