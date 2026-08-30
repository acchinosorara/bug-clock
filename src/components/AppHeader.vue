<script setup lang="ts">
import Logo from './header/AppLogo.vue'
import Navigation from './header/NavigationItems.vue'
const { initStyle } = useViewStore()
</script>

<template>
    <header class="header" :style="initStyle()">
        <Logo />
        <Navigation />
    </header>
</template>

<style lang="scss" scoped>
.header {
    @include flex-between;
    position: fixed;
    width: 100%;
    height: var(--header-height);
    padding: 0 $inline;
    top: 0;
    left: 0;
    z-index: 9999;
}
</style>
