<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppClock from '@/components/AppClock.vue'
import AppOnetime from '@/components/onetime/AppOnetime.vue'
import { useClockKeyStore } from './stores/clockKey'

const { clockKey } = storeToRefs(useClockKeyStore())
</script>

<template>
    <AppHeader />
    <article :key="clockKey" class="container">
        <AppClock />
    </article>
    <AppOnetime />
</template>

<style lang="scss" scoped>
.container {
    @include flex-center;
    min-height: 100svh;
    padding: var(--header-height) $side;
    overflow: hidden;
}
</style>
