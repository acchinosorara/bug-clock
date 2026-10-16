import type { CSSProperties } from 'vue'

export const onetimeHuge = (characters: string[]): CSSProperties => {
	const { randomDeci } = random()
	const { width } = useWindowSize()
	const baseSize = width.value / characters.length
	const val = randomDeci({ min: baseSize, max: baseSize * 1.8 })

	return {
		fontSize: `${val}px`,
	}
}
