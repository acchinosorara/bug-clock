<script setup lang="ts">
import { useClockSizeStore } from '@/stores/clockSize'
import { useScaleHeightStore } from '@/stores/scaleHeight'
import { useUpdateIntervalArray } from '@/composables/updateIntervalArray'
import type { CSSProperties } from 'vue'

const { delay, countMax } = useAnimationValStore()
const { randomDeci } = random()
const { clockSizeSub } = storeToRefs(useClockSizeStore())

const seconds = 60
const fiveSecond = 'five-second'
const setFiveSecond = (scd: number): string | void => {
    if (scd % 5 === 0) return fiveSecond
    return
}

const scaleRefs = useTemplateRef('scale')
const { scaleHeight } = storeToRefs(useScaleHeightStore())
onMounted(() => {
    if (!scaleRefs.value) return
    for (const scale of scaleRefs.value) {
        if (scale.classList.contains(fiveSecond)) {
            scaleHeight.value = scale.offsetHeight
            return
        }
    }
})

// 波形アニメーション
const stretches = ref<number[]>(
    setArray<number>(seconds, 1)
)
useUpdateIntervalArray({
    delay,
    countMax,
    length: seconds,
    tick: (i) => {
        const isLong = isTrigger(180)
        const minCoef = isLong ? 10 : 0.5
        const maxCoef = isLong ? 20 : 2
        stretches.value[i] = randomDeci({min: minCoef, max: maxCoef})
    }
})

// styleを出力
const setStyle = (scd: number): CSSProperties => {
    return {
        '--i': scd,
        '--pos': `${clockSizeSub.value / 2}px`,
        '--stretch': stretches.value[scd]
    }
}
</script>

<template>
    <div class="clock-scale">
        <span
            v-for="(_, scd) in seconds" :key="scd" ref="scale"
            :style="setStyle(scd)"
            :class="setFiveSecond(scd)" class="clock-scale-one"
        >
        </span>
    </div>
</template>

<style lang="scss" scoped>
.clock-scale {
    @include center;
    @include circle;
    width: 100%;
    overflow: hidden;
    rotate: -90deg;

    &-one {
        @include circular(60);
        width: $border-light;
        height: calc($scale-height * var(--stretch));
        background-color: $light;
        rotate: calc(90deg + var(--angle));
        transform-origin: center;

        &.five-second {
            width: $border-regular;
            height: calc($scale-height * 2 * var(--stretch));
        }
    }
}
</style>
