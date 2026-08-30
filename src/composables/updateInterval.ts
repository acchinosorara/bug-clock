interface IntervalOptions {
    delay: number
    countMax: number
    tick: () => void
    immediate?: boolean
}

export const useUpdateInterval = (options: IntervalOptions): void => {
    const { delay, countMax, tick, immediate = false } = options
    const count = ref<number>(0)
    let interval: number | undefined

    const stop = (): void => {
        clearInterval(interval)
        interval = undefined
    }

    const run = (): void => {
        stop()
        interval = setInterval(() => {
            count.value++
            tick()
            if (count.value >= countMax) reset()
        }, delay)
    }

    // 一定周期でリセット＋再実行
    const reset = (): void => {
        count.value = 0
        run()
    }

    if (immediate) run()
    else onMounted(run)
    onScopeDispose(stop)
}
