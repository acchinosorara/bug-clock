export const useClockSizeStore = defineStore('clockSize', () => {
    const val = 480
    const clockSize = val
    const clockSizeSub = ref<number>(val)

    return {
        clockSize,
        clockSizeSub,
    }
})