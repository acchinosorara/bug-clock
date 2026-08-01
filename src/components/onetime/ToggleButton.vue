<script setup lang="ts">
import AsteriskIcon from '~icons/my-icons/asterisk'
import { useMakeButtonStore } from '@/stores/onetime/makeButton'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'

const onetimePopStore = useOnetimePopStore()
const { limit } = onetimePopStore
const { isPopover, timeout } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

const popoverOpen = (): void => {
    clearTimeout(timeout.value)
    if (isPopover.value) return
    isPopover.value = true
    timeout.value = setTimeout(() => {
        isPopover.value = false
    }, limit)
}
</script>

<template>
    <button
        :ref="(el) => (makeButton = el as HTMLButtonElement | null)"
        class="make-btn"
        @click="isPopover ? (isPopover = false) : popoverOpen()"
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

    svg {
        width: calc(100% / 3);
    }
}
</style>
