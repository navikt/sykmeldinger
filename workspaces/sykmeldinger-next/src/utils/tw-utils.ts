import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export function cn(...names: Parameters<typeof classNames>): string {
    return twMerge(classNames(...names))
}
