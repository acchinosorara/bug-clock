export const useAnimationValStore = defineStore('animationVal', () => {
    const delay = 100
    const countMax = delay * 3
    return {
        delay,
        countMax
    }
})
