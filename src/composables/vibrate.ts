export const useVibrate = (): Ref<number> => {
    const { delay, countMax } = useAnimationValStore()
    const { randomInt } = random()

    const vibrateVal = ref<number>(0)
    const count = ref<number>(0)
    let interval: number

    const rotateMin = 1
    const rotateMax = 6

    const vibrate = (): void => {
        interval = setInterval(() => {
            count.value++

            // 一定確率で角度を変動
            if (isTrigger(4)) return
            const sign = setPlusMinus()
            vibrateVal.value = Number(`${sign}${randomInt({min: rotateMin, max: rotateMax})}`)

            if (count.value >= countMax * 2) reset()
        }, delay / 2)
    }
    onMounted(vibrate)

    const reset = (): void => {
        count.value = 0
        clearInterval(interval)
        vibrate()
    }

    return vibrateVal
}