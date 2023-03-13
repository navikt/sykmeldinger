import { Heading } from '@navikt/ds-react'

interface HeaderProps {
    title?: string
    subTitle?: string
}

function Header({ title, subTitle }: HeaderProps): JSX.Element | null {
    if (!title) {
        return null
    }

    return (
        <div className="flex flex-col items-center bg-blue-100 py-5">
            <Heading size="large">{title}</Heading>
            {subTitle ? (
                <Heading size="medium" level="2">
                    {subTitle}
                </Heading>
            ) : null}
        </div>
    )
}

export default Header
