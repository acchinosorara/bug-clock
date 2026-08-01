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
    width: 100%;
    padding: $border-extrabold;
    padding-top: 0;
    bottom: 0;
    left: 0;
}
</style>
