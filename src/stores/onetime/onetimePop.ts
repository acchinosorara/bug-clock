export const useOnetimePopStore = defineStore('onetimePop', () => {
    const isPopover = ref<boolean>(false)
    const timeout = ref<number>(0)
    const limit = 60000

    return {
        isPopover,
        timeout,
        limit
    }
})
