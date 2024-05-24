import { ReactElement } from 'react'
import { logger } from '@navikt/next-logger'
import { NextPageContext } from 'next'
import NextErrorComponent, { ErrorProps } from 'next/error'

interface MyErrorProps extends ErrorProps {
    hasGetInitialPropsRun: boolean
    err?: Error
}

function MyError({ statusCode, hasGetInitialPropsRun, err }: MyErrorProps): ReactElement {
    if (!hasGetInitialPropsRun && err) {
        // getInitialProps is not called in case of
        // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
        // err via _app.js, so it can be captured
        logger.error(err)
    }

    return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async (context: NextPageContext): Promise<MyErrorProps> => {
    const errorInitialProps: ErrorProps = await NextErrorComponent.getInitialProps(context)

    const { res, err, asPath } = context

    // Returning early because we don't want to log 404 errors
    if (res?.statusCode === 404) {
        return {
            ...errorInitialProps,
            // Workaround for https://github.com/vercel/next.js/issues/8592, mark when getInitialProps has run
            hasGetInitialPropsRun: true,
        }
    }

    // Running on the server, the response object (`res`) is available.
    //
    // Next.js will pass an err on the server if a page's data fetching methods
    // threw or returned a Promise that rejected
    //
    // Running on the client (browser), Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
        logger.error(err)

        return {
            ...errorInitialProps,
            // Workaround for https://github.com/vercel/next.js/issues/8592, mark when getInitialProps has run
            hasGetInitialPropsRun: true,
        }
    }

    // If this point is reached, getInitialProps was called without any
    // information about what the error might be. This is unexpected and may
    // indicate a bug introduced in Next.js, so record it
    logger.error(new Error(`_error.js getInitialProps missing data at path: ${asPath}`))

    return {
        ...errorInitialProps,
        // Workaround for https://github.com/vercel/next.js/issues/8592, mark when getInitialProps has run
        hasGetInitialPropsRun: true,
    }
}

export default MyError
