<script setup lang="ts">
import ToggleButton from './ToggleButton.vue'
import PopDisplay from './PopDisplay.vue'
</script>

<template>
    <div class="make">
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
    padding: $border-extrabold;
    padding-top: 0;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>
