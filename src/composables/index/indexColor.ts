import { classStateObject } from '@/utils/commonClass/classStateObject'
import type { ClassState } from '@/types/ClassState'

export const useIndexColor = (structure: string[][], classNames: Ref<string[]>) => {
    const colorClassStates = ref<ClassState[][]>(
        structure.map((index) => index.map(() => classStateObject(classNames.value)))
    )

    const setColor = (i: number, index: number): void => {
        const colorState = colorClassStates.value.at(i)?.at(index)
        if (!colorState) return

        for (const name of classNames.value) {
            const isColorClass = isTrigger(6)
            colorState[name] = isColorClass
            if (isColorClass) return
        }
    }

    return {
        colorClassStates,
        setColor
    }
}
