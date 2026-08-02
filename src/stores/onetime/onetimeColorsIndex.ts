export const useOnetimeColorsIndexStore = defineStore('onetimeColorsIndex', () => {
    const { randomInt } = random()
    const length = colorPattern().length
    const index = ref<number>(randomInt({ min: 0, max: length }))

    return {
        index
    }
})
