import type { ClassState } from '@/types/ClassState'

export const onetimeClass = (characters: string[], currentPattern: string | null): ClassState[] => {
	const { randomInt } = random()
	const onetimePatternStore = useOnetimePatternStore()
	const { pattern } = onetimePatternStore
	const { isEffectIndex } = storeToRefs(onetimePatternStore)
	const { invertClassNames } = setCommonClass()

	const classStates: ClassState[] = []

	characters.forEach((_, i) => {
		switch (currentPattern) {
			case pattern[1]: {
				const index = randomInt({ min: 0, max: invertClassNames.length })
				classStates.push({ [invertClassNames[index]!]: isTrigger(3) })
				break
			}
			case pattern[5]:
				classStates.push({ [pattern[5]!]: isEffectIndex.value[i] ?? false })
				break
		}
	})

	return classStates
}
