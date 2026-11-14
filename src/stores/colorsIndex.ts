export const useColorsStore = defineStore('colors', () => {
	const { randomInt } = random()

	// (H)n+-195 or 130 | (n+-40|30) (S)75 | 50 (L)55
	const colorsPattern = [
		['#e28c36', '#3661e2'],
		['#e2366f', '#36e27e'],
		['#e26a36', '#e2c036'],
		['#e2c036', '#90c653'],
		['#5dc653', '#5d53c6'],
		['#36e2e2', '#c653b3'],
		['#368ce2', '#e2366f']
	]

	const setIndex = (length: number): number => randomInt({ min: 0, max: length })

	// 第1インデックス
	const colorsIndex = ref<number>(setIndex(colorsPattern.length))
	const setColorsIndex = (): void => {
		colorsIndex.value = setIndex(colorsPattern.length)
	}

	// 第2インデックス
	const colorIndexSelect = (): number => {
		const length = colorsPattern[colorsIndex.value]?.length ?? 0
		return randomInt({ min: 0, max: length })
	}

	const colorIndex = ref<number>(colorIndexSelect())
	const setColorIndex = (): void => {
		colorIndex.value = colorIndexSelect()
	}

	return {
		colorsPattern,
		colorsIndex,
		colorIndex,
		setColorsIndex,
		setColorIndex
	}
})
