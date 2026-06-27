export const useScaleHeightStore = defineStore('scaleSize', () => {
    const scaleHeightDefault = 29
    const scaleHeight = ref<null | number>(null)
    return {
        scaleHeightDefault,
        scaleHeight
    }
})