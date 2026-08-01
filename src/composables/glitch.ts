import { useUpdateInterval } from '@/composables/updateInterval'
import { setCommonClass, type BorderClassNames } from '@/utils/commonClass/setCommonClass'

type GlitchColor = BorderClassNames[number] | ''
interface GlitchOptions {
    glitchX: Ref<string[]>
    glitchY: Ref<string[]>
    glitchColor: Ref<GlitchColor[]>
}

export const useGlitch = (index: number): GlitchOptions => {
    const { delay, countMax } = useAnimationValStore()
    const { randomInt } = random()
    const { colorsIndex } = storeToRefs(useColorsIndexStore())
    const { borderClassNames } = setCommonClass()

    const unit = 'px'
    const x = ref<string[]>(setArray<string>(index, `0${unit}`))
    const y = ref<string[]>(setArray<string>(index, `0${unit}`))
    const className = ref<GlitchColor[]>(setArray<GlitchColor>(index, ''))

    const setPos = (): string => {
        const sign = setPlusMinus()
        const pixel = 5
        const num = randomInt({ min: 0, max: pixel })
        return `${sign} ${num}${unit}`
    }

    const setClass = (): GlitchColor => {
        const length = borderClassNames.length
        const classNamesIndex = randomInt({ min: 0, max: length + 1 })
        return borderClassNames[colorsIndex.value]?.[classNamesIndex] ?? ''
    }

    useUpdateInterval({
        delay,
        countMax,
        tick: () => {
            for (let i = 0; i < index; i++) {
                if (!isTrigger(3)) {
                    x.value[i] = setPos()
                    y.value[i] = setPos()
                    className.value[i] = setClass()
                }
            }
        }
    })

    return {
        glitchX: x,
        glitchY: y,
        glitchColor: className
    }
}
