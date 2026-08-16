<script setup lang="ts">
import { useVibrate } from '@/composables/vibrate'
import { useLongHands } from '@/composables/longHands'
import type { CSSProperties } from 'vue'

const { now } = storeToRefs(useNowStore())
const vibrateVal = useVibrate()

const minute = computed<number>(() => now.value.getMinutes() * 6)
const setAngle = computed<CSSProperties>(() => {
    return {
        rotate: `${minute.value + vibrateVal.value}deg`
    }
})

const longStyle = useLongHands()
</script>

<template>
    <span class="minute" :style="[setAngle, longStyle]"></span>
</template>

<style lang="scss" scoped>
.minute {
    @include hand($border-extrabold, 0);
    height: calc(50% - $scale-height - $border-semibold);
    background-color: $light;

    @include hand-inner;
}
</style>
