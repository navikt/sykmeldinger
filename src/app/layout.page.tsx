import '../style/global.css'

import { PropsWithChildren, ReactElement } from 'react'

import Decorator from './decorator/decorator'

export default function RootLayout({ children }: PropsWithChildren): ReactElement {
    return (
        <Decorator>
            <main>{children}</main>
        </Decorator>
    )
}
