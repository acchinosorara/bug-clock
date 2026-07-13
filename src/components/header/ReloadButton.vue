<script setup lang="ts">
import { useClockKeyStore } from '@/stores/clockKey'
import ReloadIcon from '~icons/my-icons/reload'

const { clockKey } = storeToRefs(useClockKeyStore())
const { colorsIndex } = storeToRefs(useColorsIndexStore())
const { randomInt } = random()
const colorsLength = colorPattern().length

const reload = () => {
    clockKey.value++
    colorsIndex.value = randomInt({ min: 0, max: colorsLength })
}
</script>

<template>
    <button @click="reload()" class="reload" aria-label="再読み込み">
        <ReloadIcon />
    </button>
</template>

<style lang="scss" scoped>
.reload {
    @include flex-center;
    @include circle;
    width: 64px;
    background-color: $dark200;
    color: $light;

    @include hover {
        background-color: $dark300;
    }

    svg {
        width: 50%;
        height: auto;
        animation: count 30s steps(30) infinite;

        @keyframes count {
            to {
                rotate: 360deg;
            }
        }
    }
}
</style>
