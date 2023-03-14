import React, { PropsWithChildren } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import cn from 'classnames'

import SladdSvg from '../../SykmeldingViews/SykmeldingView/Svg/SladdSvg'

interface SykmeldingInfoProps {
    className?: string
    heading: string
    variant?: 'blue' | 'gray' | 'transparent'
}

/**
 * A small piece of information with a header and a small text description
 */
export function SykmeldingInfo({
    className,
    heading,
    children,
    variant = 'transparent',
}: PropsWithChildren<SykmeldingInfoProps>): JSX.Element {
    return (
        <div
            className={cn(className, 'rounded p-4', {
                'bg-blue-50': variant === 'blue',
                'bg-gray-50': variant === 'gray',
            })}
        >
            <Heading size="xsmall" level="4" spacing>
                {heading}
            </Heading>
            {typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}
        </div>
    )
}

/**
 * A small piece of information with a header and a multiple lines of text
 */
export function SykmeldingMultilineInfo({ lines, ...props }: SykmeldingInfoProps & { lines: string[] }): JSX.Element {
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
}): JSX.Element {
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
export function SykmeldingJaInfo(props: SykmeldingInfoProps): JSX.Element {
    return (
        <SykmeldingInfo {...props}>
            <BodyShort className="ml-4">Ja</BodyShort>
        </SykmeldingInfo>
    )
}

/**
 * SykmeldingInfo that are always just a sladd SVG
 */
export function SykmeldingSladd(props: SykmeldingInfoProps): JSX.Element {
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
}: PropsWithChildren<Pick<SykmeldingInfoProps, 'variant'>>): JSX.Element {
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
