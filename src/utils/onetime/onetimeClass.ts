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
            case pattern[0]: {
                const index = randomInt({ min: 0, max: invertClassNames.length })
                classStates.push({ [invertClassNames[index]!]: isTrigger(3) })
                break
            }
            case pattern[2]:
                classStates.push({ [pattern[2]!]: isEffectIndex.value[i] ?? false })
                break
            default:
                classStates.push({ [currentPattern as string]: isTrigger(3) })
        }
    })

    return classStates
}
