<script setup lang="ts">
import Reload from './header/ReloadButton.vue'
</script>

<template>
    <header class="header">
        <Reload />
    </header>
</template>

<style lang="scss" scoped>
.header {
    @include flex-between;
    position: fixed;
    width: 100%;
    height: var(--header-height);
    padding: 0 $border-extrabold;
    top: 0;
    left: 0;
    z-index: 9999;
}
</style>
