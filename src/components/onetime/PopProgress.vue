<script setup lang="ts">
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'

const { randomInt } = random()
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
const bgLength = bgClassNames.length
const index = randomInt({ min: 0, max: bgLength })
const setProgressColor = () => {
    return bgClassNames[colorsIndex.value]![index]
}
</script>

<template>
    <progress
        :value="countVal"
        :max="countMax"
        :class="setProgressColor()"
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
