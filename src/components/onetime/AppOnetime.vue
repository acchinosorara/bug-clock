<script setup lang="ts">
import ToggleButton from './ToggleButton.vue'
import PopDisplay from './PopDisplay.vue'
const { initStyle } = useViewStore()
</script>

<template>
    <div class="make" :style="initStyle()">
        <ToggleButton />
        <PopDisplay />
    </div>
</template>

<style lang="scss" scoped>
.make {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding: $block $inline;
    padding-top: 0;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>
