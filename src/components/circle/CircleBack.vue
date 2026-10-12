<script setup lang="ts">
import { useUpdateInterval } from '@/composables/updateInterval'
import type { CSSProperties } from 'vue'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const colorsIndexStore = useColorsStore()
const { colorsIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore

const colorIndex = ref<number>(0)
const polygonIndex = ref<number>(0)
const rotate = ref<number>(0)

const polygons = [
	'0 0, 50% 50%, 0 50%',
	'0 0, 50% 0, 50% 50%, 0 50%',
	'0 0, 100% 0, 100% 50%, 0 50%',
	'0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%',
	'0 0, 100% 100%, 100% 0, 0 100%',
	'0 25%, 100% 75%, 100% 25%, 0 75%',
	'0 40%, 100% 60%, 100% 40%, 0 60%',
	'0 0, 50% 50%, 100% 25%, 100% 75%, 50% 50%, 0 100%',
	'0 0, 50% 50%, 100% 40%, 100% 60%, 50% 50%, 0 100%',
]

useUpdateInterval({
	delay,
	countMax,
	tick: () => {
		const pattern = colorsPattern[colorsIndex.value] ?? []
		colorIndex.value = randomInt({ min: 0, max: pattern.length + 2 })
		polygonIndex.value = randomInt({ min: 0, max: polygons.length })
		rotate.value = randomInt({ min: 0, max: 360 })
	},
})

const setStyle = (): CSSProperties => {
	return {
		'clip-path': `polygon(${polygons[polygonIndex.value]})`,
		rotate: `${rotate.value}deg`,
		backgroundColor: colorsPattern[colorsIndex.value]?.[colorIndex.value],
	}
}
</script>

<template>
	<div class="circle-back" :style="setStyle()"></div>
</template>

<style lang="scss" scoped>
.circle-back {
	@include center;
	@include circle;
	width: calc(100% + $border-semibold);
	opacity: 0.025;
	z-index: -1;
}
</style>
