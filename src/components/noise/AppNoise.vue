<script setup lang="ts">
import NoiseLarge from './NoiseLarge.vue'
import NoiseSmall from './NoiseSmall.vue'
</script>

<template>
    <div class="noise">
        <NoiseLarge />
        <NoiseSmall />
    </div>
</template>

<style lang="scss" scoped>
.noise {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>
