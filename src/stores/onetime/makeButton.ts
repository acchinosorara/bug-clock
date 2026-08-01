export const useMakeButtonStore = defineStore('makeButton', () => {
    const makeButton = ref<HTMLButtonElement | null>(null)
    return {
        makeButton
    }
})
