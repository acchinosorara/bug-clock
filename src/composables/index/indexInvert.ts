import { classStateObject } from '@/utils/classStateObject'
import type { ClassState } from '@/types/ClassState'

const name = 'invert'
const invertNames = [`${name}-x`, `${name}-y`, `${name}-xy`]

export const useIndexInvert = (structure: string[][]) => {
    const invertClassStates = ref<ClassState[][]>(
        structure.map((index) => index.map(() => classStateObject(invertNames)))
    )

    const setInvert = (i: number, index: number): void => {
        const invertState = invertClassStates.value.at(i)?.at(index)
        if (!invertState) return

        for (const name of invertNames) {
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
