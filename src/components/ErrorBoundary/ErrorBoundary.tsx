import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react'
import { ContentContainer } from '@navikt/ds-react'
import { createChildLogger } from '@navikt/next-logger'

import { getUserRequestId } from '../../utils/userRequestId'

import ErrorFallback from './ErrorFallback'

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
    private childLogger = createChildLogger(getUserRequestId())

    constructor(props: PropsWithChildren<unknown>) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.childLogger.error(
            new Error(
                `Caught error in ErrorBoundary's componentDidCatch hasError: ${error != null}, hasErrorInfo:${
                    errorInfo != null
                }`,
                { cause: error },
            ),
        )
        this.childLogger.error(JSON.stringify({ error, errorInfo, requestId: getUserRequestId() }))
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
