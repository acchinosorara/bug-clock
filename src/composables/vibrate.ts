import { useUpdateInterval } from '@/composables/updateInterval'

export const useVibrate = (): Ref<number> => {
    const { delay, countMax } = useAnimationValStore()
    const { randomInt } = random()

    const vibrateVal = ref<number>(0)
    const rotateMin = 1
    const rotateMax = 6

    useUpdateInterval({
        delay: delay / 2,
        countMax: countMax * 2,
        tick: () => {
            if (isTrigger(4)) return
            const sign = setPlusMinus()
            vibrateVal.value = Number(`${sign}${randomInt({min: rotateMin, max: rotateMax})}`)
        }
    })

    return vibrateVal
}
