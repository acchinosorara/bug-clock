import { classStateObject } from '@/utils/classStateObject'
import type { ClassState } from '@/types/ClassState'

export const useIndexBackground = (length: number, bgClassNames: Ref<string[]>) => {
    const bgClassStates = ref<ClassState[]>(
        Array.from({ length }, () => classStateObject(bgClassNames.value))
    )

    const currentBackgrounds = ref<(string | null)[]>(setArray<string | null>(length, null))

    const setBackground = (i: number): void => {
        const backgroundState = bgClassStates.value.at(i)
        if (!backgroundState) return

        let selected: string | null = null
        for (const name of bgClassNames.value) {
            const isClass = isTrigger(6)
            backgroundState[name] = isClass
            if (isClass) selected = name
        }
        currentBackgrounds.value[i] = selected
    }

    return {
        bgClassStates,
        currentBackgrounds,
        setBackground
    }
}
