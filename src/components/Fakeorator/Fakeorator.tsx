import { DecoratorComponents } from '@navikt/nav-dekoratoren-moduler/ssr'
import Image from 'next/image'

import logo from './logo.svg'

export function getFakeDecorator(): DecoratorComponents {
    return {
        Header: () => (
            <div className="">
                <div className="h-20 border-b">
                    <div className="mx-auto flex h-full max-w-screen-xl items-center px-8">
                        <Image src={logo} alt="" width="64" height="20" />
                    </div>
                </div>
                <div className="mx-auto my-4 h-10 max-w-screen-xl px-8">Brødsmuler {'>'} For lokal utvikling</div>
            </div>
        ),
        Styles: () => <div />,
        Scripts: () => <div />,
        Footer: () => <div />,
    }
}
