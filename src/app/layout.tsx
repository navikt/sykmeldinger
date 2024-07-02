import '../style/global.css'

import { PropsWithChildren, ReactElement, ReactNode } from 'react'

import Decorator from './decorator/decorator'
import { PreloadResources } from './preload-resources'

type Props = {
    crumbs: ReactNode
}

export default function RootLayout({ children, crumbs }: PropsWithChildren<Props>): ReactElement {
    return (
        <Decorator>
            <PreloadResources />
            {crumbs}
            <main>{children}</main>
        </Decorator>
    )
}
