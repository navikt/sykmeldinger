import React, { PropsWithChildren } from 'react'
import { Props } from '@navikt/nav-dekoratoren-moduler/ssr'

import { fetchDecoratorReact } from '../components-new/ssr'

async function RscDecorator({ children }: PropsWithChildren<Props>): Promise<JSX.Element> {
    const Decorator = await fetchDecoratorReact({
        env: 'prod',
        chatbot: false,
        context: 'privatperson',
    })

    return (
        <div>
            <Decorator.Styles />
            <Decorator.Header />
            {children}
            <Decorator.Footer />
            <Decorator.Scripts />
        </div>
    )
}

export default RscDecorator
