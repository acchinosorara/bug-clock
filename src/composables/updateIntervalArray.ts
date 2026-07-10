interface IntervalOptions {
    delay: number
    countMax: number
    length: number
    tick: (index: number) => void
}

export const useUpdateIntervalArray = (options: IntervalOptions): void => {
    const { delay, countMax, length, tick } = options
    const intervals = setArray<number>(length, 0)
    const counts = ref<number[]>(setArray<number>(length, 0))

    const interval = (i: number): void => {
        intervals[i] = setInterval(() => {
            counts.value[i] = (counts.value[i] ?? 0) + 1
            tick(i)
            const count = counts.value.at(i)
            if (count && count > countMax) {
                reset(i)
                interval(i)
            }
        }, delay)
    }

    const startAll = (): void => {
        for (let i = 0; i < length; i++) interval(i)
    }
    onMounted(startAll)

    const reset = (i: number): void => {
        clearInterval(intervals[i])
        counts.value[i] = 0
    }
}
