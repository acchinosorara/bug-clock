<script setup lang="ts">
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'
import { useOnetimeColorsIndexStore } from '@/stores/onetime/onetimeColorsIndex'

const { limit } = useOnetimePopStore()
const countMax = limit / 1000
const countVal = ref<number>(countMax)
let interval: number

onMounted(() => {
    interval = setInterval(() => {
        countVal.value--
    }, 1000)
})

onUnmounted(() => {
    clearInterval(interval)
})

const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { bgClassNames } = setCommonClass()
const { index } = storeToRefs(useOnetimeColorsIndexStore())
const setProgressColorClass = (): string => {
    return bgClassNames[colorsIndex.value]?.[index.value] ?? ''
}
</script>

<template>
    <progress
        :value="countVal"
        :max="countMax"
        :class="setProgressColorClass()"
        class="progress"
    ></progress>
</template>

<style lang="scss" scoped>
$progress-height: 4px;

.progress {
    position: absolute;
    width: calc(100% - $progress-height * 4);
    height: $progress-height;
    background-color: $dark300;
    border-radius: $progress-height;
    overflow: hidden;
    bottom: calc($progress-height * 2);
    left: 50%;
    translate: -50% 0;

    &::-webkit-progress-bar {
        background-color: $dark300;
    }

    &.bg {
        @include bg-colors-pref(-webkit-progress-value);
        @include bg-colors-pref(-moz-progress-bar);
    }
}
</style>
