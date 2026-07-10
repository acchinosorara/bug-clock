interface IntervalOptions {
    delay: number
    countMax: number
    tick: () => void
}

export const useUpdateInterval = (options: IntervalOptions): void => {
    const { delay, countMax, tick } = options
    const count = ref<number>(0)
    let interval: number

    const run = (): void => {
        interval = setInterval(() => {
            count.value++
            tick()
            if (count.value >= countMax) reset()
        }, delay)
    }
    onMounted(run)

    const reset = (): void => {
        count.value = 0
        clearInterval(interval)
        run()
    }
}
