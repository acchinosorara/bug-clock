<script setup lang="ts">
import Logo from '~icons/my-icons/logo'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import { useUpdateInterval } from '@/composables/updateInterval'
import type { CSSProperties } from 'vue'

const { clockKey } = storeToRefs(useClockKeyStore())
const { colorsIndex, colorIndex } = storeToRefs(useColorsIndexStore())
const { setColorsIndex } = useColorsIndexStore()
const { colorClassNames } = setCommonClass()

const reload = () => {
    clockKey.value++
    setColorsIndex()
}

const setLogoClass = computed<string>(() => {
    return colorClassNames[colorsIndex.value]?.[colorIndex.value] ?? ''
})

const isHover = ref<boolean>(false)
const setHover = (bool: boolean): void => {
    isHover.value = bool
}

const { delay, countMax } = useAnimationValStore()
const { randomDeci } = random()

const setAlpha = (): number[] => setArray(12, () => randomDeci({ min: 0, max: 1 }))
const alpha = ref<number[]>(setAlpha())

useUpdateInterval({
    delay,
    countMax,
    tick: () => {
        if (!isHover.value) return
        alpha.value = setAlpha()
    }
})

const setLogoStyle = computed<CSSProperties | null>(() => {
    if (!isHover.value) return null

    const stripeVal = alpha.value.map(
        (val, i) => `rgba(0, 0, 0, ${i % 2 === 0 ? 1 : val}) ${i}px ${i + 1}px`
    )
    const maskImage = `repeating-linear-gradient(to top, ${stripeVal.join(',')})`

    return { maskImage, WebkitMaskImage: maskImage }
})
</script>

<template>
    <button @click="reload()" class="reload" aria-label="再読み込みする">
        <h1 @mouseenter="setHover(true)" @mouseleave="setHover(false)" :style="setLogoStyle">
            <Logo :class="setLogoClass" />
        </h1>
    </button>
</template>

<style lang="scss" scoped>
.reload {
    display: flex;
    height: calc(100% / 3);

    h1 {
        display: flex;
        align-items: stretch;
    }

    svg {
        width: auto;
        height: 100%;

        &.color {
            @include text-colors;
        }

        :deep(path) {
            fill: $light;
        }
    }
}
</style>
