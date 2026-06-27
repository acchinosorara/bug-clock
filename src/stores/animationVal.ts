export const useAnimationValStore = defineStore('animationVal', () => {
    const delay = 100
    const countMax = delay * 300
    return {
        delay,
        countMax
    }
})