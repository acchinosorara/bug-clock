import { useStrongEffect } from '@/composables/strongEffect'
import type { CSSProperties } from 'vue'

export const useLongHands = (): Ref<CSSProperties> => {
    const longStyle = ref<CSSProperties>({})
    const setLongStyle = (): void => {
        longStyle.value = {
            height: '100vw'
        }
    }

    const { isActive, endEffect } = useStrongEffect('longHands')
    const { start } = useTimeoutFn(
        () => {
            longStyle.value = {}
            endEffect()
        },
        6000,
        { immediate: false }
    )

    watch(isActive, (val) => {
        if (!val) return
        setLongStyle()
        start()
    })

    return longStyle
}
