<script setup lang="ts">
import AppClock from '@/components/AppClock.vue'
</script>

<template>
    <article class="container">
        <AppClock />
    </article>
</template>

<style lang="scss" scoped>
.container {
    @include flex-center;
    min-height: 100svh;
    padding: $border-extrabold;
    overflow: hidden;
}
</style>