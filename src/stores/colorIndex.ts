export const useColorsIndexStore = defineStore('colorsIndex', () => {
    const { randomInt } = random()
    const colorsLength = colorPattern().length
    const colorsIndex = ref<number>(randomInt({ min: 0, max: colorsLength }))

    return {
        colorsIndex
    }
})
