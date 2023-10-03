import { Heading, Skeleton } from '@navikt/ds-react'
import { ReactElement } from 'react'

type HeaderNormalProps = {
    title: string
    subTitle?: string
}

type HeaderSkeletonProps = {
    skeleton: true
}

export type HeaderProps = HeaderNormalProps | HeaderSkeletonProps

function Header(props: HeaderProps): ReactElement | null {
    return (
        <div className="mx-auto flex max-w-2xl items-center p-4">
            <div>
                {!('skeleton' in props) ? (
                    <Heading size="xlarge">{props.title ?? 'Sykmelding'}</Heading>
                ) : (
                    <Skeleton>
                        <Heading size="xlarge">Sykmelding</Heading>
                    </Skeleton>
                )}
                {!('skeleton' in props) ? (
                    props.subTitle ? (
                        <Heading size="medium" level="2">
                            {props.subTitle}
                        </Heading>
                    ) : null
                ) : (
                    <Skeleton>
                        <Heading size="medium">X. - XX. XXXX</Heading>
                    </Skeleton>
                )}
            </div>
        </div>
    )
}

export default Header
