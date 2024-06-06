import { BodyLong, Heading, Skeleton } from '@navikt/ds-react'
import { ReactElement } from 'react'

type HeaderNormalProps = {
    title: string
    subTitle?: string
}

type HeaderSkeletonProps = {
    skeleton: true
}

export type HeaderProps = HeaderNormalProps | HeaderSkeletonProps

function Header(props: HeaderProps): ReactElement {
    return (
        <div className="mx-auto flex max-w-2xl items-center p-4">
            <div>
                {!('skeleton' in props) ? (
                    <Heading level="1" size="xlarge">
                        {props.title ?? 'Sykmelding'}
                    </Heading>
                ) : (
                    <Skeleton>
                        <Heading level="1" size="xlarge">
                            Sykmelding
                        </Heading>
                    </Skeleton>
                )}
                {!('skeleton' in props) ? (
                    props.subTitle ? (
                        <BodyLong className="font-bold text-2xl">{props.subTitle}</BodyLong>
                    ) : null
                ) : (
                    <Skeleton>
                        <BodyLong className="font-bold text-2xl">X. - XX. XXXX</BodyLong>
                    </Skeleton>
                )}
            </div>
        </div>
    )
}

export default Header
