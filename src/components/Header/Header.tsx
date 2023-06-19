import { Heading } from '@navikt/ds-react'

import SykmeldingIcon from './SykmeldingIcon'

interface HeaderProps {
    title?: string
    subTitle?: string
}

function Header({ title, subTitle }: HeaderProps): JSX.Element | null {
    if (!title) {
        return null
    }

    return (
        <div className="mx-auto flex max-w-2xl items-center p-4">
            <SykmeldingIcon className="mr-8 h-16 w-16" />
            <div>
                <Heading size="xlarge">{title}</Heading>
                {subTitle ? (
                    <Heading size="medium" level="2">
                        {subTitle}
                    </Heading>
                ) : null}
            </div>
        </div>
    )
}

export default Header
