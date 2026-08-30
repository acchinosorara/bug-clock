import type { CSSProperties } from 'vue'

export const useViewStore = defineStore('view', () => {
    const { viewDuration } = useAnimationValStore()
    const isInitModal = ref<boolean>(false)
    const initBlur = 'blur(20px)'
    const initStyle = (): CSSProperties | null =>
        isInitModal.value
            ? {
                  filter: initBlur
              }
            : {
                  transition: `filter ${viewDuration}s ease-out`
              }
    const clockKey = ref<number>(0)

    return {
        isInitModal,
        initBlur,
        initStyle,
        clockKey
    }
})
