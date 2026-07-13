export const useClockKeyStore = defineStore('clockKey', () => {
    const clockKey = ref<number>(0)
    return {
        clockKey
    }
})
