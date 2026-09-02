export const random = () => {
    type RandomArg = {
        min: number
        max: number
    }
    const randomInt = (num: RandomArg): number => {
        return Math.floor(Math.random() * (num.max - num.min)) + num.min
    }
    const randomDeci = (num: RandomArg): number => {
        const val = Math.random() * (num.max - num.min) + num.min
        return Math.round(val * 10) / 10
    }
    return {
        randomInt,
        randomDeci
    }
}
