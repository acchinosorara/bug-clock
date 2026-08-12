export const useOnetimePopStore = defineStore('onetimePop', () => {
    const isPopover = ref<boolean>(false)
    const isCopied = ref<boolean>(false)
    const charSize = ref<number | null>(null)
    const timeout = ref<number>(0)
    const limit = 60000

    return {
        isPopover,
        isCopied,
        charSize,
        timeout,
        limit
    }
})
