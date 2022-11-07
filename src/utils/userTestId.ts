export function getUserTestId(): string | 'standard' {
    if (typeof window === 'undefined') return 'standard'

    const searchParamUser: string | null = new URLSearchParams(window.location.search).get('user') ?? null
    return searchParamUser ?? localStorage.getItem('mockUser') ?? 'standard'
}
