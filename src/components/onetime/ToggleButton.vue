<script setup lang="ts">
import { motion } from 'motion-v'
import AsteriskIcon from '~icons/my-icons/asterisk'
import type { VariantType, Transition } from 'motion-v'

const onetimePopStore = useOnetimePopStore()
const { limit } = onetimePopStore
const { isPopover, timeout } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

// アイコン
const { colorClassNames, borderClassNames } = setCommonClass()
const { colorsIndex, colorIndex } = storeToRefs(useColorsIndexStore())
const { setColorIndex } = useColorsIndexStore()
const colorClasses = ref<string[]>([])

const spinAnimate: VariantType = {
    rotate: [0, 0, 180, 180, 360, 360],
    scale: [1, 1.25, 1.25, 1.25, 1.25, 1]
}
const spinTransition: Transition = {
    duration: 3,
    delay: 4,
    times: [0, 0.1, 0.3, 0.75, 0.9, 1],
    repeat: Infinity,
    repeatDelay: 4
}
const iconAnimate = computed<VariantType>(() => (isPopover.value ? {} : spinAnimate))

const popToggle = (): void => {
    clearTimeout(timeout.value)

    if (isPopover.value) {
        isPopover.value = false
        return
    }

    isPopover.value = true
    timeout.value = setTimeout(() => {
        isPopover.value = false
    }, limit)
}

const setClass = (): void => {
    setColorIndex()
    colorClasses.value = [
        colorClassNames[colorsIndex.value]?.[colorIndex.value] ?? '',
        borderClassNames[colorsIndex.value]?.[colorIndex.value] ?? ''
    ]
}

watch(isPopover, (val) => {
    if (val) {
        setClass()
    } else {
        colorClasses.value = []
    }
})
</script>

<template>
    <button
        :ref="(el) => (makeButton = el as HTMLButtonElement | null)"
        class="make-btn"
        :class="colorClasses"
        @click="popToggle()"
    >
        <motion.span :animate="iconAnimate" :transition="spinTransition" class="make-btn-ic">
            <AsteriskIcon />
        </motion.span>
    </button>
</template>

<style lang="scss" scoped>
.make-btn {
    @include circle;
    position: relative;
    width: $make-button-size;
    background-color: $dark200;
    border: solid 1px $dark400;
    color: $light;
    transition: all $duration;
    z-index: 20;

    &.color {
        @include text-colors;
    }

    &.border {
        @include border-colors;
    }

    &-ic {
        @include center;
        @include flex-center;
        width: calc(100% / 3);

        svg {
            width: 100%;
            height: auto;
        }
    }
}
</style>
