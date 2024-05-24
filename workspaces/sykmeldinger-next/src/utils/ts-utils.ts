export function notNull<T>(value: T | null | undefined): value is T {
    return value != null
}

export function raise(message: string): never {
    throw new Error(message)
}
