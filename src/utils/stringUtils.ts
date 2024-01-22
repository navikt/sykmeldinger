export function pluralize(value: string, count: number): string {
    return `${count} ${value}${count > 1 ? 'er' : ''}`
}

export function cleanId(input: string): string {
    return input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
