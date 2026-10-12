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
	@include fit;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	padding: $block $inline;
	padding-top: 0;
	overflow: hidden;
}
</style>
