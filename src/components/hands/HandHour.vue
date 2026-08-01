<script setup lang="ts">
import { useVibrate } from '@/composables/vibrate'
import type { CSSProperties } from 'vue'

const { now } = storeToRefs(useNowStore())
const vibrateVal = useVibrate()

const hour = computed<number>(() => now.value.getHours() % 12)
const angle = computed<CSSProperties>(() => {
    return {
        rotate: `${hour.value * 30 + vibrateVal.value}deg`
    }
})
</script>

<template>
    <span class="hour" :style="angle"></span>
</template>

<style lang="scss" scoped>
.hour {
    @include hand($border-extrabold, 0);
    height: 25%;
    background-color: $light;

    @include hand-inner;
}
</style>
