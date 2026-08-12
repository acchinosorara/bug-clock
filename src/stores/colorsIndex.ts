export const useColorsIndexStore = defineStore('colorsIndex', () => {
    const { randomInt } = random()
    const colors = colorPattern()

    // colorPatternの第1引数
    const randomColorsIndex = (): number => randomInt({ min: 0, max: colors.length })
    const colorsIndex = ref<number>(randomColorsIndex())

    const setColorsIndex = (): void => {
        colorsIndex.value = randomColorsIndex()
    }

    // colorPatternの第2引数（whiteは除外）
    const colorIndexSelect = (): number => {
        const length = colors[colorsIndex.value]?.length ?? 0
        return randomInt({ min: 0, max: Math.max(length - 1, 0) })
    }
    const colorIndex = ref<number>(colorIndexSelect())

    const setColorIndex = (): void => {
        colorIndex.value = colorIndexSelect()
    }

    return {
        colorsIndex,
        colorIndex,
        setColorsIndex,
        setColorIndex
    }
})
