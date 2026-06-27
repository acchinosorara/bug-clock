export const setArray = <T>(len: number, val: T | ((index: number) => T)): T[] => {
    return Array.from({ length: len }, (_, i) =>
        typeof val === 'function' ? (val as (index: number) => T)(i) : val
    )
}