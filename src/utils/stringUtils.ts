export function pluralize(value: string, count: number): string {
    return `${count} ${value}${count > 1 ? 'er' : ''}`;
}
