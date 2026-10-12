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
	@include fit;
	overflow: hidden;
}
</style>
