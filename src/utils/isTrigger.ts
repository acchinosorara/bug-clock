export const isTrigger = (n: number): boolean => {
    const { randomInt } = random()
    return randomInt({min: 0, max: n}) === 0
}