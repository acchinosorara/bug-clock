<script setup lang="ts">
import { useUpdateInterval } from '@/composables/updateInterval'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import type { CSSProperties } from 'vue'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { bgClassNames } = setCommonClass()

const classIndex = ref<number>(0)
const polygonIndex = ref<number>(0)
const rotate = ref<number>(0)

const polygons = [
    '0 0, 50% 50%, 0 50%',
    '0 0, 50% 0, 50% 50%, 0 50%',
    '0 0, 100% 0, 100% 50%, 0 50%',
    '0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%',
    '0 0, 100% 100%, 100% 0, 0 100%',
    '0 25%, 100% 75%, 100% 25%, 0 75%',
    '0 40%, 100% 60%, 100% 40%, 0 60%',
    '0 0, 50% 50%, 100% 25%, 100% 75%, 50% 50%, 0 100%',
    '0 0, 50% 50%, 100% 40%, 100% 60%, 50% 50%, 0 100%'
]

useUpdateInterval({
    delay,
    countMax,
    tick: () => {
        classIndex.value = randomInt({ min: 0, max: bgClassNames.length })
        polygonIndex.value = randomInt({ min: 0, max: polygons.length })
        rotate.value = randomInt({ min: 0, max: 360 })
    }
})

const setClass = (): string => {
    const className = bgClassNames[colorsIndex.value]?.[classIndex.value] ?? ''
    return className
}

const setStyle = (): CSSProperties => {
    return {
        'clip-path': `polygon(${polygons[polygonIndex.value]})`,
        rotate: `${rotate.value}deg`
    }
}
</script>

<template>
    <div class="circle-back" :class="setClass()" :style="setStyle()"></div>
</template>

<style lang="scss" scoped>
.circle-back {
    @include center;
    @include circle;
    width: calc(100% + $border-semibold);
    opacity: 0.05;
    z-index: -1;

    &.bg {
        @include bg-colors;
    }
}
</style>
