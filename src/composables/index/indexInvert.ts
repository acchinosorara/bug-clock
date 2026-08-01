import { classStateObject } from '@/utils/commonClass/classStateObject'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import type { ClassState } from '@/types/ClassState'

export const useIndexInvert = (structure: string[][]) => {
    const { invertClassNames } = setCommonClass()
    const invertClassStates = ref<ClassState[][]>(
        structure.map((index) => index.map(() => classStateObject(invertClassNames)))
    )

    const setInvert = (i: number, index: number): void => {
        const invertState = invertClassStates.value.at(i)?.at(index)
        if (!invertState) return

        for (const name of invertClassNames) {
            invertState[name] = false
            if (isTrigger(6)) {
                invertState[name] = true
                return
            }
        }
    }

    return {
        invertClassStates,
        setInvert
    }
}
