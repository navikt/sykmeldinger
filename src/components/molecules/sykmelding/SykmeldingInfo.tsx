import { ReactElement, PropsWithChildren } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import cn from 'classnames'

import SladdSvg from './SladdSvg'

interface SykmeldingInfoProps {
    icon?: ReactElement
    className?: string
    heading?: string
    level?: '3' | '4'
    variant?: 'blue' | 'gray' | 'transparent'
}

/**
 * A small piece of information with a header and a small text description
 */
export function SykmeldingInfo({
    className,
    heading,
    level = '4',
    children,
    icon,
    variant = 'transparent',
}: PropsWithChildren<SykmeldingInfoProps>): ReactElement {
    return (
        <div
            className={cn(className, 'rounded p-4', {
                'bg-blue-50': variant === 'blue',
                'bg-gray-50': variant === 'gray',
            })}
        >
            {heading && (
                <Heading size="xsmall" level={level} spacing>
                    {heading}
                </Heading>
            )}
            <div className="flex gap-3 items-center">
                {icon && <span className="text-xl">{icon}</span>}
                <div>{typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}</div>
            </div>
        </div>
    )
}

/**
 * A small piece of information with a header and a multiple lines of text
 */
export function SykmeldingMultilineInfo({ lines, ...props }: SykmeldingInfoProps & { lines: string[] }): ReactElement {
    return (
        <SykmeldingInfo {...props}>
            {lines.map((it) => (
                <BodyShort key={it}>{it}</BodyShort>
            ))}
        </SykmeldingInfo>
    )
}

/**
 * A small piece of information with a header and a list of text represented as a unordered list
 */
export function SykmeldingListInfo({
    texts,
    ...props
}: SykmeldingInfoProps & {
    texts: string[]
}): ReactElement {
    return (
        <SykmeldingInfo {...props}>
            <ul>
                {texts.map((text) => (
                    <li className="ml-4" key={text}>
                        <BodyShort>{text}</BodyShort>
                    </li>
                ))}
            </ul>
        </SykmeldingInfo>
    )
}

/**
 * SykmeldingInfo that are always "Ja"
 */
export function SykmeldingJaInfo(props: SykmeldingInfoProps): ReactElement {
    return (
        <SykmeldingInfo {...props}>
            <BodyShort className="ml-4">Ja</BodyShort>
        </SykmeldingInfo>
    )
}

/**
 * SykmeldingInfo that are always just a sladd SVG
 */
export function SykmeldingSladd(props: SykmeldingInfoProps): ReactElement {
    return (
        <SykmeldingInfo {...props}>
            <SladdSvg />
        </SykmeldingInfo>
    )
}

/**
 * Used to group a bunch of SykmeldingInfo with one background
 */
export function SykmeldingInfoSubGroup({
    variant,
    children,
}: PropsWithChildren<Pick<SykmeldingInfoProps, 'variant'>>): ReactElement {
    return (
        <div
            className={cn({
                'bg-blue-50': variant === 'blue',
                'bg-gray-50': variant === 'gray',
            })}
        >
            {children}
        </div>
    )
}

export function SykmeldingInfoMissing({ text, ...props }: SykmeldingInfoProps & { text: string }): ReactElement {
    return (
        <SykmeldingInfo className="text-gray-600" {...props}>
            <BodyShort as="em">{text}</BodyShort>
        </SykmeldingInfo>
    )
}
