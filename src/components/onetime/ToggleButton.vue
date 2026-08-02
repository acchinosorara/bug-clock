<script setup lang="ts">
import AsteriskIcon from '~icons/my-icons/asterisk'
import { useOnetimeColorsIndexStore } from '@/stores/onetime/onetimeColorsIndex'
import { useMakeButtonStore } from '@/stores/onetime/makeButton'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'

const onetimePopStore = useOnetimePopStore()
const { limit } = onetimePopStore
const { isPopover, timeout } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

// SVGの色
const { colorClassNames } = setCommonClass()
const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { index } = storeToRefs(useOnetimeColorsIndexStore())
const { randomInt } = random()
const colorClass = ref<string>('')

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

const setColorClass = (): void => {
    const length = colorPattern().length
    index.value = randomInt({ min: 0, max: length })
    colorClass.value = colorClassNames[colorsIndex.value]?.[index.value] ?? ''
}

watch(isPopover, (val) => {
    if (val) {
        setColorClass()
    } else {
        colorClass.value = ''
    }
})
</script>

<template>
    <button
        :ref="(el) => (makeButton = el as HTMLButtonElement | null)"
        class="make-btn"
        :class="colorClass"
        @click="popToggle()"
    >
        <AsteriskIcon />
    </button>
</template>

<style lang="scss" scoped>
.make-btn {
    @include flex-center;
    @include circle;
    width: $make-button-size;
    background-color: $dark200;
    border: solid 1px $dark300;
    margin-left: auto;
    color: $light;

    &.color {
        @include text-colors;
    }

    svg {
        width: calc(100% / 3);
    }
}
</style>
