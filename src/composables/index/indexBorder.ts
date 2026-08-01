import { classStateObject } from '@/utils/commonClass/classStateObject'
import type { ClassState } from '@/types/ClassState'

export const useIndexBorder = (
    length: number,
    borderClassNames: Ref<string[]>,
    currentBackgrounds: Ref<(string | null)[]>
) => {
    const { randomInt } = random()

    const borderClassStates = ref<ClassState[]>(
        Array.from({ length }, () => classStateObject(borderClassNames.value))
    )

    const setBorder = (i: number): void => {
        const borderState = borderClassStates.value.at(i)
        if (!borderState) return
        for (const name of borderClassNames.value) {
            borderState[name] = false
        }
        const bg = currentBackgrounds.value[i]
        const isBorder = isTrigger(2)
        if (!bg || !isBorder) return

        const reBorderClass = borderClassNames.value.filter((name) => name !== bg)
        const color = reBorderClass[randomInt({ min: 0, max: reBorderClass.length })]
        borderState[`${color}`] = true
    }

    return {
        borderClassStates,
        setBorder
    }
}
