<script setup lang="ts">
import { setColorClass } from '@/utils/setColorClass'
import { useClockSizeStore } from '@/stores/clockSize'
import { useScaleHeightStore } from '@/stores/scaleHeight'
import { useUpdateIntervalArray } from '@/composables/updateIntervalArray'
import { useIndexInvert } from '@/composables/index/indexInvert'
import { useIndexBackground } from '@/composables/index/indexBackground'
import { useIndexBorder } from '@/composables/index/indexBorder'
import { useIndexColor } from '@/composables/index/indexColor'
import type { CSSProperties } from 'vue'
import type { ClassState } from '@/types/ClassState'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const { colorsIndex } = storeToRefs(useColorsIndex())

const hour = 12
const setIndex = (i: number): string => {
    const val = i === 0 ? 12 : i
    return val.toString()
}

const indexDefaults = setArray<string[]>(hour, (i) => setIndex(i).split(''))
const indexRefs = ref<string[][]>(indexDefaults.map((index) => [...index]))

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

const {
    colorClassNames: colorClassPatterns,
    bgClassNames: bgClassPatterns,
    borderClassNames: borderClassPatterns
} = setColorClass()

// classの状態管理（インデックス）
const bgClassNames = computed(() => bgClassPatterns[colorsIndex.value] ?? [])
const borderClassNames = computed(() => borderClassPatterns[colorsIndex.value] ?? [])
const { bgClassStates, currentBackgrounds, setBackground } = useIndexBackground(hour, bgClassNames)
const { borderClassStates, setBorder } = useIndexBorder(hour, borderClassNames, currentBackgrounds)

// class切替（インデックス）
const setTextClass = (i: number): ClassState[] | void => {
    const background = bgClassStates.value.at(i)
    const border = borderClassStates.value.at(i)
    if (!background || !border) return
    return [background, border]
}

// classの状態管理（文字単位）
const colorClassNames = computed(() => colorClassPatterns[colorsIndex.value] ?? [])
const { colorClassStates, setColor } = useIndexColor(indexDefaults, colorClassNames)
const { invertClassStates, setInvert } = useIndexInvert(indexDefaults)

// class切替（文字単位）
const setCharClass = (i: number, index: number): ClassState[] | void => {
    const color = colorClassStates.value.at(i)?.at(index)
    const invert = invertClassStates.value.at(i)?.at(index)
    if (!color || !invert) return
    return [color, invert]
}

const setCharacter = (i: number): void => {
    indexRefs.value[i]?.forEach((_, index) => {
        const defaultChar = indexDefaults.at(i)?.at(index)
        const list = garbledCharacters.at(Number(defaultChar))
        const garbledChar = indexRefs.value.at(i)
        if (!defaultChar || !list || !garbledChar) return

        // 文字化け or 元の数字を保持
        const charLength = randomInt({ min: 0, max: list.length + 1 })
        const randomChar = list.at(charLength)
        garbledChar[index] = randomChar || defaultChar

        setColor(i, index)
        setInvert(i, index)
    })
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
            v-for="(_, i) in hour"
            :key="i"
            :style="setTextStyle(i)"
            :class="setTextClass(i)"
            class="index-text"
        >
            <span
                v-for="(char, index) in indexRefs[i]"
                :key="index"
                :class="setCharClass(i, index)"
                class="index-text-char"
            >
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
            &-pink {
                background-color: $pink;
            }
            &-green {
                background-color: $green;
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
            &-pink {
                border-color: $pink;
            }
            &-green {
                border-color: $green;
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
                    &-pink {
                        color: $pink;
                    }
                    &-green {
                        color: $green;
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
