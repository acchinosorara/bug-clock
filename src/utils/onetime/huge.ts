export const onetimeHuge = (characters: string[]): string => {
	const { randomDeci } = random()
	const { width } = useWindowSize()
	const baseSize = width.value / characters.length
	const val = randomDeci({ min: baseSize, max: baseSize * 1.8 })

	return `${val}px`
}
