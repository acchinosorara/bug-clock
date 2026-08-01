<script setup lang="ts">
import AppCircle from './circle/AppCircle.vue'
import ClockScale from './scale/ClockScale.vue'
import AppHands from './hands/AppHands.vue'
import ClockIndex from './index/ClockIndex.vue'
import CloneIndex from './index/CloneIndex.vue'
import NoiseSmall from './effect/NoiseSmall.vue'

const clock = useTemplateRef('clock')
const clockSizeStore = useClockSizeStore()
const { clockSize } = clockSizeStore
const { clockSizeSub } = storeToRefs(clockSizeStore)

useResizeObserver(clock, (entries) => {
    const width = entries[0]?.contentRect.width
    if (width) clockSizeSub.value = Math.round(width)
})
</script>

<template>
    <div class="clock" :style="{ maxWidth: `${clockSize}px` }">
        <AppCircle />
        <div ref="clock" class="clock-inner">
            <ClockScale />
            <ClockIndex />
            <AppHands />
            <CloneIndex />
        </div>
    </div>
    <NoiseSmall />
</template>

<style lang="scss" scoped>
.clock {
    @include flex-center;
    @include circle;
    position: relative;
    width: 100%;
    border: solid $border-semibold $light;

    &-inner {
        @include circle;
        position: relative;
        width: calc(100% - $border-bold);
        border: solid $border-light $light;
    }
}
</style>
