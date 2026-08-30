<script setup lang="ts">
const { initStyle } = useViewStore()
</script>

<template>
    <footer :style="initStyle()" class="footer">
        <small class="copyright mono">&copy;2026 acchinosorara</small>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    position: absolute;
    padding-left: $inline;
    bottom: $block;
}

.copyright {
    color: $light400;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
}
</style>
