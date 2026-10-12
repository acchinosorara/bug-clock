export const useColorsStore = defineStore('colors', () => {
	const { randomInt } = random()

	// (H)n+-195 | (n+-40|30) (S)75 | 50 (L)55
	const colorsPattern = [
		['#e28c36', '#3661e2'],
		['#c6539f', '#53c65c'],
		['#e26a36', '#e2c036'],
		['#e2c036', '#90c653'],
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
		setColorIndex,
	}
})
