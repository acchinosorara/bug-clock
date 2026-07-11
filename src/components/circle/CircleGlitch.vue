<script setup lang="ts">
import { useGlitch } from '@/composables/glitch'
import type { CSSProperties } from 'vue'

const glitchIndex = 4
const { glitchX, glitchY, glitchColor } = useGlitch(glitchIndex)

const setClass = (i: number) => glitchColor.value[i]
const setTranslate = (val?: string): string => `calc(-50% ${val ?? ''})`
const setStyle = (i: number): CSSProperties => {
    return {
        translate: `
            ${setTranslate(glitchX.value[i])}
            ${setTranslate(glitchY.value[i])}
        `
    }
}
</script>

<template>
    <div
        v-for="(glitch, i) in glitchIndex"
        :key="glitch"
        class="circle"
        :class="setClass(i)"
        :style="setStyle(i)"
    ></div>
</template>

<style lang="scss" scoped>
.circle {
    @include circle;
    position: absolute;
    width: calc(100% + $border-extrabold * 1.5);
    border: solid $border-light transparent;
    top: 50%;
    left: 50%;
    z-index: -1;

    &.border {
        &-orange {
            border-color: $orange;
        }
        &-blue {
            border-color: $blue;
        }
        &-white {
            border-color: $gray;
        }
        &-pink {
            border-color: $pink;
        }
        &-green {
            border-color: $green;
        }
    }
}
</style>
