export const useColorStates = (structure: string[][]) => {
	const { randomInt } = random()
	const colorsIndexStore = useColorsStore()
	const { colorsIndex } = storeToRefs(colorsIndexStore)
	const { colorsPattern } = colorsIndexStore
	const white = '#f0f0f0'
	const colors = computed(() => colorsPattern[colorsIndex.value] ?? [])
	const length = structure.length

	// 背景色・枠線色・文字色
	const backgrounds = ref<(string | undefined)[]>(setArray<string | undefined>(length, undefined))

	const borderColors = ref<(string | undefined)[]>(
		setArray<string | undefined>(length, undefined),
	)
	const textColors = ref<(string | undefined)[][]>(
		structure.map((index) => index.map(() => undefined)),
	)

	const setBackground = (i: number): void => {
		const candidates = [...colors.value].reverse().concat(white)
		backgrounds.value[i] = candidates.find(() => isTrigger(6))
	}

	const setBorder = (i: number): void => {
		borderColors.value[i] = undefined
		const bg = backgrounds.value[i]
		const isBorder = isTrigger(2)
		if (!bg || !isBorder) return

		const candidates = [...colors.value, white].filter((color) => color !== bg)
		borderColors.value[i] = candidates[randomInt({ min: 0, max: candidates.length })]
	}

	const setColor = (i: number, index: number): void => {
		const row = textColors.value.at(i)
		if (!row) return
		row[index] = colors.value.find(() => isTrigger(6))
	}

	return {
		white,
		backgrounds,
		borderColors,
		textColors,
		setBackground,
		setBorder,
		setColor,
	}
}
