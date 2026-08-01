export const useNowStore = defineStore('now', () => {
    const now = useNow()
    return {
        now
    }
})
