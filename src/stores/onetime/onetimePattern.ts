export const useOnetimePatternStore = defineStore('onetimePattern', () => {
	const pattern = ['huge', 'reverse', 'spacing', 'slash', 'tag', 'katakana', 'rome', 'error']
	const patternLength = pattern.length
	const currentPattern = ref<string | null>(null)
	const isEffectIndex = ref<boolean[]>([])

	return {
		pattern,
		patternLength,
		currentPattern,
		isEffectIndex,
	}
})
