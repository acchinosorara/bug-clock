<script setup lang="ts">
import AppCircle from '@/components/circle/AppCircle.vue'
import ClockScale from '@/components/scale/ClockScale.vue'
import AppHands from '@/components/hands/AppHands.vue'
import ClockIndex from '@/components/index/ClockIndex.vue'
import CloneIndex from '@/components/index/CloneIndex.vue'
import { useClockSizeStore } from '@/stores/clockSize'

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
    <div class="clock" :style="{maxWidth: `${clockSize}px`}">
        <AppCircle />
        <div ref="clock" class="clock-inner">
            <ClockScale />
            <ClockIndex />
            <AppHands />
            <CloneIndex />
        </div>
    </div>
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