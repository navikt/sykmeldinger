import React, { ReactElement } from 'react'
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

interface Props {
    children: React.ReactNode
}

const decorator = await fetchDecoratorReact({
    env: 'prod',
    params: {},
})

const { Styles, Scripts, Header, Footer } = decorator

const Decorator = ({ children }: Props): ReactElement => {
    return (
        <React.Fragment>
            <Styles />
            <Scripts />
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Decorator
