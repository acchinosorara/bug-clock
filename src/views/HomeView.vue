<script setup lang="ts">
import InitModal from '@/components/InitModal.vue'
import AppCircle from '@/components/circle/AppCircle.vue'
import ClockScale from '@/components/scale/ClockScale.vue'
import AppHands from '@/components/hands/AppHands.vue'
import ClockIndex from '@/components/index/ClockIndex.vue'
import CloneIndex from '@/components/index/CloneIndex.vue'
import AppNoise from '@/components/noise/AppNoise.vue'
import AppOnetime from '@/components/onetime/AppOnetime.vue'

const viewStore = useViewStore()
const { initStyle } = viewStore
const { clockKey } = storeToRefs(viewStore)

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
    <InitModal />
    <article :key="clockKey" :style="initStyle()" class="clock">
        <div class="clock-parts" :style="{ maxWidth: `${clockSize}px` }">
            <AppCircle />
            <div ref="clock" class="clock-inner">
                <ClockScale />
                <ClockIndex />
                <AppHands />
                <CloneIndex />
            </div>
        </div>
        <AppNoise />
    </article>
    <AppOnetime />
</template>

<style lang="scss" scoped>
.clock {
    @include wrap;
    @include flex-center;

    &-parts {
        @include flex-center;
        @include circle;
        position: relative;
        width: 100%;
        border: solid $border-semibold $light;
    }

    &-inner {
        @include circle;
        position: relative;
        width: calc(100% - $border-bold);
        border: solid $border-light $light;
    }
}
</style>
