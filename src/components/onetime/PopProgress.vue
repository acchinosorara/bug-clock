<script setup lang="ts">
import type { CSSProperties } from 'vue'

const { limit } = useOnetimePopStore()
const countMax = limit / 1000
const countVal = ref<number>(countMax)
let interval: number

onMounted(() => {
	interval = setInterval(() => {
		countVal.value--
	}, 1000)
})

onUnmounted(() => {
	clearInterval(interval)
})

const colorsIndexStore = useColorsStore()
const { colorsIndex, colorIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore

const setStyle = (): CSSProperties => {
	return {
		'--color': colorsPattern[colorsIndex.value]?.[colorIndex.value],
	}
}
</script>

<template>
	<progress :value="countVal" :max="countMax" :style="setStyle()" class="progress"></progress>
</template>

<style lang="scss" scoped>
$progress-height: 4px;

.progress {
	position: absolute;
	width: calc(100% - $progress-height * 4);
	height: $progress-height;
	background-color: $dark400;
	border-radius: $progress-height;
	overflow: hidden;
	bottom: calc($progress-height * 2);
	left: 50%;
	translate: -50% 0;

	&::-webkit-progress-bar {
		background-color: $dark400;
	}

	&::-webkit-progress-value {
		background-color: var(--color);
	}

	&::-moz-progress-bar {
		background-color: var(--color);
	}
}
</style>
