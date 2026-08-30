export const useAnimationValStore = defineStore('animationVal', () => {
    const duration = 0.2
    const viewDuration = 0.8
    const delay = 100
    const countMax = delay * 3
    return {
        duration,
        viewDuration,
        delay,
        countMax
    }
})
