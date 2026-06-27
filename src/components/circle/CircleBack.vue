<script setup lang="ts">
import type { CSSProperties } from 'vue'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const { bgClassNames } = setColorClass()

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

const count = ref<number>(0)
let interval: number

const animation = (): void => {
    interval = setInterval(() => {
        count.value++
        if (count.value >= countMax) reset()
        classIndex.value = randomInt({min: 0, max: bgClassNames.length})
        polygonIndex.value = randomInt({min: 0, max: polygons.length})
        rotate.value = randomInt({min: 0, max: 360})
    }, delay)
}
onMounted(animation)

const reset = (): void => {
    clearInterval(interval)
    count.value = 0
    animation()
}

const setClass = (): string => bgClassNames[classIndex.value] ?? ''
const setStyle = (): CSSProperties => {
    return {
        'clip-path': `polygon(${polygons[polygonIndex.value]})`,
        'rotate': `${rotate.value}deg`
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
        &-orange {
            background-color: $orange;
        }
        &-blue {
            background-color: $blue;
        }
        &-white {
            background-color: $gray;
        }
    }
}
</style>