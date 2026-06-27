type GlitchColor = BorderClassNames[number] | ''
type Glitch = {
    glitchX: Ref<string[]>
    glitchY: Ref<string[]>
    glitchColor: Ref<GlitchColor[]>
}

export const useGlitch = (index: number): Glitch => {
    const { delay, countMax } = useAnimationValStore()
    const { randomInt } = random()
    const { borderClassNames } = setColorClass()

    const unit = 'px'
    const x = ref<string[]>(
        setArray<string>(index, `0${unit}`)
    )
    const y = ref<string[]>(
        setArray<string>(index, `0${unit}`)
    )
    const className = ref<GlitchColor[]>(
        setArray<GlitchColor>(index, '')
    )

    const count = ref<number>(0)
    let interval: number

    const setPos = (): string => {
        const sign = setPlusMinus()
        const pixel = 5
        const num = randomInt({min: 0, max: pixel})
        return `${sign} ${num}${unit}`
    }

    const setClass = (): GlitchColor => {
        const length = borderClassNames.length
        const index = randomInt({min: 0, max: length + 1})
        return borderClassNames[index] ?? ''
    }

    const glitch = (): void => {
        interval = setInterval(() => {
            count.value++

            for (let i = 0; i < index; i++) {
                if (!isTrigger(3)) {
                    x.value[i] = setPos()
                    y.value[i] = setPos()
                    className.value[i] = setClass()
                }
            }

            if (count.value >= countMax) reset()
        }, delay)
    }
    onMounted(glitch)

    const reset = (): void => {
        count.value = 0
        clearInterval(interval)
        glitch()
    }

    return {
        glitchX: x,
        glitchY: y,
        glitchColor: className
    }
}