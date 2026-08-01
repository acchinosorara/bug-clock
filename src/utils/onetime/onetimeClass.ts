import { useOnetimePatternStore } from '@/stores/onetime/onetimePattern'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import type { ClassState } from '@/types/ClassState'

export const onetimeClass = (characters: string[], currentPattern: string | null): ClassState[] => {
    const { randomInt } = random()
    const { pattern } = useOnetimePatternStore()
    const { invertClassNames } = setCommonClass()

    const className = (): string => {
        let key = currentPattern as string
        if (currentPattern === pattern[0]) {
            const length = invertClassNames.length
            const index = randomInt({ min: 0, max: length })
            key = invertClassNames[index]!
        }
        return key
    }

    return characters.map(() => ({
        [className()]: isTrigger(3)
    }))
}
