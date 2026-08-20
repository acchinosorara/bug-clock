export const useAnimationValStore = defineStore('animationVal', () => {
    const duration = 0.2
    const delay = 100
    const countMax = delay * 3
    return {
        duration,
        delay,
        countMax
    }
})
