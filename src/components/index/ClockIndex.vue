<script setup lang="ts">
import { setColorClass } from '@/utils/setColorClass'
import { useClockSizeStore } from '@/stores/clockSize'
import { useScaleHeightStore } from '@/stores/scaleHeight'
import { useUpdateIntervalArray } from '@/composables/updateIntervalArray'
import type { CSSProperties } from 'vue'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const { colorClassNames, bgClassNames, borderClassNames } = setColorClass()

const hour = 12
const setIndex = (i: number): string => {
    const val = i === 0 ? 12 : i
    return val.toString()
}
const indexDefaults = setArray<string[]>(hour, i => setIndex(i).split(''))
const indexRefs = ref<string[][]>(
    indexDefaults.map(index => [...index])
)

const garbledCharacters = [
    ['Q', '@', '□'],
    ['i', '/', '!'],
    ['Z', '?', '≥'],
    ['E', '}', '÷'],
    ['A', '+', '↑'],
    ['S', '≤', '§'],
    ['b', 'G', '('],
    ['F', '>', '┐'],
    ['B', '&', ':'],
    ['P', 'q', ',']
]

// class名の状態管理
type ClassName = Record<string, boolean>
const setStateObj = (names: string[]): ClassName => {
    return Object.fromEntries(
        names.map(name => [name, false])
    )
}
const bgClassStates = ref<ClassName[]>(
    Array.from({length: hour}, () => setStateObj(bgClassNames))
)
const borderClassStates = ref<ClassName[]>(
    Array.from({length: hour}, () => setStateObj(borderClassNames))
)
const colorClassStates = ref<ClassName[][]>(
    indexDefaults.map(index => index.map(() =>
        setStateObj(colorClassNames)
    ))
)
const invert = 'invert'
const invertNames = [`${invert}-x`, `${invert}-y`, `${invert}-xy`]
const invertClassStates = ref<ClassName[][]>(
    indexDefaults.map(index => index.map(() =>
        setStateObj(invertNames)
    ))
)
const setTextClass = (i: number): ClassName[] | void => {
    const background = bgClassStates.value.at(i)
    const border = borderClassStates.value.at(i)
    if (!background || !border) return
    return [
        background,
        border
    ]
}
const setCharClass = (i: number, index: number): ClassName[] | void => {
    const color = colorClassStates.value.at(i)?.at(index)
    const invert = invertClassStates.value.at(i)?.at(index)
    if (!color || !invert) return
    return [
        color,
        invert
    ]
}

// 文字列のデザインを指定
const setCharacter = (i: number): void => {
    indexRefs.value[i]?.forEach((_, index) => {
        const defaultChar = indexDefaults.at(i)?.at(index)
        const list = garbledCharacters.at(Number(defaultChar))
        const garbledChar = indexRefs.value.at(i)
        if (!defaultChar || !list || !garbledChar) return

        // 文字化け or 元の数字
        const charLength = randomInt({min: 0, max: list.length + 1})
        const randomChar = list.at(charLength)
        garbledChar[index] = randomChar || defaultChar

        const colorState = colorClassStates.value.at(i)?.at(index)
        const invertState = invertClassStates.value.at(i)?.at(index)
        if (!colorState || !invertState) return

        // 文字色
        for (const name of colorClassNames) {
            const isColorClass = isTrigger(6)
            colorState[name] = isColorClass
            if (isColorClass) return
        }

        // 上下左右反転
        for (const name of invertNames) {
            invertState[name] = false
            if (isTrigger(6)) {
                invertState[name] = true
                return
            }
        }
    })
}

// 現在の背景色を記録
const currentBackgrounds = ref<(string | null)[]>(
    setArray<string | null>(hour, null)
)

// 背景色を指定
const setBackground = (i: number): void => {
    const backgroundState = bgClassStates.value.at(i)
    if (!backgroundState) return
    let selected: string | null = null
    for (const name of bgClassNames) {
        const isClass = isTrigger(6)
        backgroundState[name] = isClass
        if (isClass) selected = name
    }
    currentBackgrounds.value[i] = selected
}

// 枠線を指定
const setBorder = (i: number): void => {
    const borderState = borderClassStates.value.at(i)
    if (!borderState) return
    for (const name of borderClassNames) {
        borderState[name] = false
    }
    const bg = currentBackgrounds.value[i]
    const isBorder = isTrigger(2)
    if (!bg || !isBorder) return

    const reBorderClass = borderClassNames.filter(name => name !== bg)
    const color = reBorderClass[randomInt({min: 0, max: reBorderClass.length})]
    borderState[`${color}`] = true
}

useUpdateIntervalArray({
    delay,
    countMax,
    length: hour,
    tick: (i) => {
        setCharacter(i)
        setBackground(i)
        setBorder(i)
    }
})

const { clockSizeSub } = storeToRefs(useClockSizeStore())
const scaleStore = useScaleHeightStore()
const { scaleHeightDefault } = scaleStore
const { scaleHeight } = storeToRefs(scaleStore)

// styleを出力
const setTextStyle = (i: number): CSSProperties => {
    return {
        '--i': i,
        '--pos': `
            calc(${clockSizeSub.value / 2}px - 0.5em - ${Math.round(scaleHeight.value ?? scaleHeightDefault / 1.5)}px)
        `
    }
}
</script>

<template>
    <div class="index">
        <div
            v-for="(_, i) in hour" :key="i"
            :style="setTextStyle(i)"
            :class="setTextClass(i)" class="index-text">
            <span
                v-for="(char, index) in indexRefs[i]" :key="index"
                :class="setCharClass(i, index)" class="index-text-char">
                {{ char }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@layer base, overwrite;

.index {
    @include center;
    width: 100%;
    height: 100%;
    rotate: -90deg;

    &-text {
        @include circular(12);
        display: flex;
        color: $light;
        font-size: $index-size;
        font-weight: bold;
        line-height: 1;
        border: solid $border-light transparent;
        rotate: 90deg;
        transform-origin: center;

        &.bg {
            &-white {
                background-color: $light;
            }
            &-orange {
                background-color: $orange;
            }
            &-blue {
                background-color: $blue;
            }
        }

        &.border {
            &-white {
                border-color: $light;
            }
            &-orange {
                border-color: $orange;
            }
            &-blue {
                border-color: $blue;
            }
        }

        @layer overwrite {
            &-char {
                &.color {
                    &-white {
                        color: $light;
                    }
                    &-orange {
                        color: $orange;
                    }
                    &-blue {
                        color: $blue;
                    }
                }

                &.invert {
                    &-x {
                        scale: -1 1;
                    }
                    &-y {
                        scale: 1 -1;
                    }
                    &-xy {
                        scale: -1 -1;
                    }
                }
            }
        }
    }
}
</style>
