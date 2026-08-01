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
    position: absolute;
    width: 100%;
    padding: $border-extrabold;
    top: 0;
    left: 0;
}
</style>
