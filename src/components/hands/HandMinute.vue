<script setup lang="ts">
import { useVibrate } from '@/composables/vibrate'
import type { CSSProperties } from 'vue'
const vibrateVal = useVibrate()

const now = useNow()
const minute = computed<number>(() => now.value.getMinutes() * 6)
const setAngle = computed<CSSProperties>(() => {
    return {
        rotate: `${minute.value + vibrateVal.value}deg`
    }
})
</script>

<template>
    <span class="minute" :style="setAngle"></span>
</template>

<style lang="scss" scoped>
.minute {
    @include hand($border-extrabold, 0);
    height: calc(50% - $scale-height - $border-semibold);
    background-color: $light;

    @include hand-inner;
}
</style>