interface IntervalOptions {
    delay: number
    countMax: number
    length: number
    tick: (index: number) => void
    immediate?: boolean
}

export const useUpdateIntervalArray = (options: IntervalOptions): void => {
    const { delay, countMax, length, tick, immediate = false } = options
    const intervals = setArray<number | undefined>(length, undefined)
    const counts = ref<number[]>(setArray<number>(length, 0))

    const stop = (i: number): void => {
        clearInterval(intervals[i])
        intervals[i] = undefined
    }

    const run = (i: number): void => {
        stop(i)
        intervals[i] = setInterval(() => {
            counts.value[i] = (counts.value[i] ?? 0) + 1
            tick(i)
            if ((counts.value[i] ?? 0) >= countMax) reset(i)
        }, delay)
    }

    // 一定周期でリセット＋再実行
    const reset = (i: number): void => {
        counts.value[i] = 0
        run(i)
    }

    const startAll = (): void => {
        for (let i = 0; i < length; i++) run(i)
    }

    const stopAll = (): void => {
        for (let i = 0; i < length; i++) stop(i)
    }

    if (immediate) startAll()
    else onMounted(startAll)
    onScopeDispose(stopAll)
}
