<script setup lang="ts">
import { motion } from 'motion-v'
import type { VariantType, Transition } from 'motion-v'
import type { CSSProperties } from 'vue'

const { isCopied } = storeToRefs(useOnetimePopStore())

const colorsIndexStore = useColorsStore()
const { colorsIndex, colorIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore

const isMobile = useMediaQuery('(max-width: 480px)')
const { charSize } = storeToRefs(useOnetimePopStore())
const size = computed<number>(() => Math.round(charSize.value ?? 0) * 1.5)
const viewBox = `0 0 ${size.value} ${size.value}`
const strokeWidth = computed<number>(() => (isMobile.value ? 2 : 4))
const r = computed<number>(() => size.value / 2 - strokeWidth.value / 1.5)
const d = computed<number>(() => r.value * 2)
const dashArray = computed<number>(() => Math.round(d.value * Math.PI - d.value / 3))

const setStyle = (): CSSProperties => {
	return {
		stroke: colorsPattern[colorsIndex.value]?.[colorIndex.value],
		strokeWidth: strokeWidth.value,
		strokeDasharray: dashArray.value
	}
}

const animate: VariantType = {
	rotate: [0, 360],
	strokeDashoffset: [0, dashArray.value * -2]
}

const transition: Transition = {
	repeat: Infinity,
	rotate: {
		inherit: true,
		duration: 1.5,
		ease: 'linear'
	},
	strokeDashoffset: {
		inherit: true,
		duration: 2,
		ease: 'easeIn'
	}
}
</script>

<template>
	<motion.svg
		v-show="!isCopied"
		:animate="animate"
		:transition="transition"
		:viewBox="viewBox"
		:width="size"
		:height="size"
		:style="setStyle()"
		class="loading"
	>
		<circle :cx="size / 2" :cy="size / 2" :r="r" />
	</motion.svg>
</template>

<style lang="scss" scoped>
.loading {
	fill: none;
	margin-inline: 2em 0.5em;
}
</style>
