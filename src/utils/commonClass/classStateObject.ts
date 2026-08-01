type ClassName = Record<string, boolean>
export const classStateObject = (names: string[]): ClassName => {
    return Object.fromEntries(names.map((name) => [name, false]))
}
