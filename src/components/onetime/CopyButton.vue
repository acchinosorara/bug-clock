<script setup lang="ts">
import CopyIcon from '~icons/my-icons/copy'
import CheckIcon from '~icons/my-icons/check'
import { useMakeOnetime } from '@/composables/makeOnetime'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'
import { setCommonClass } from '@/utils/commonClass/setCommonClass'

const { bgClassNames } = setCommonClass()
const { colorsIndex, colorIndex } = storeToRefs(useColorsIndexStore())

const { origin } = useMakeOnetime()
const { copy } = useClipboard({ legacy: true })
const { isCopied } = storeToRefs(useOnetimePopStore())

const { start } = useTimeoutFn(
    () => {
        isCopied.value = false
    },
    3000,
    { immediate: false }
)

const copied = (): void => {
    copy(origin)
    isCopied.value = true
    start()
}

const setClass = computed<string[]>(() => {
    return [
        isCopied.value ? 'copied' : '',
        bgClassNames[colorsIndex.value]?.[colorIndex.value] ?? ''
    ]
})
</script>

<template>
    <span v-if="isCopied" class="message">Copied the date.</span>
    <button @click="copied()" :class="setClass" class="copy">
        <CheckIcon v-if="isCopied" />
        <CopyIcon v-else />
    </button>
</template>

<style lang="scss" scoped>
.copy {
    position: absolute;
    width: 1.25em;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    color: $light300;
    top: 50%;
    right: 0;
    translate: 0 -50%;
    transition: background-color $duration;

    @include hover {
        color: $light200;
        background-color: $dark300;
    }

    &.copied {
        color: $light;

        &.bg {
            @include bg-colors;
        }
    }

    svg {
        @include center;
        width: 0.75em;
        height: auto;
        transition: all $duration;
    }
}

.message {
    color: $light;
    font-size: 0.75em;
}
</style>
