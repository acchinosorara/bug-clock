<script setup lang="ts">
import { motion } from 'motion-v'
import AsteriskIcon from '~icons/my-icons/asterisk'
import type { VariantType, Transition } from 'motion-v'
import type { CSSProperties } from 'vue'

const onetimePopStore = useOnetimePopStore()
const { limit } = onetimePopStore
const { isPopover, timeout } = storeToRefs(onetimePopStore)
const { makeButton } = storeToRefs(useMakeButtonStore())

const colorsIndexStore = useColorsStore()
const { colorsIndex, colorIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern, setColorIndex } = colorsIndexStore

const asterKey = ref<number>(0)
const spinAnimate: VariantType = {
	rotate: [0, 0, 180, 180, 360, 360],
	scale: [1, 1.25, 1.25, 1.25, 1.25, 1],
}
const spinTransition: Transition = {
	duration: 2.5,
	delay: 4,
	times: [0, 0.1, 0.3, 0.7, 0.9, 1],
	repeat: Infinity,
	repeatDelay: 4,
}
const iconAnimate = computed<VariantType>(() => (isPopover.value ? {} : spinAnimate))

const popToggle = (): void => {
	clearTimeout(timeout.value)

	if (isPopover.value) {
		isPopover.value = false
		return
	}

	asterKey.value++
	isPopover.value = true
	timeout.value = setTimeout(() => {
		isPopover.value = false
	}, limit)
}

const setStyle = (): CSSProperties => {
	if (!isPopover.value) return {}
	const color = colorsPattern[colorsIndex.value]?.[colorIndex.value]
	return {
		color,
		borderColor: color,
	}
}

watch(isPopover, (val) => {
	if (val) setColorIndex()
})
</script>

<template>
	<button
		:ref="(el) => (makeButton = el as HTMLButtonElement | null)"
		class="make-btn"
		:style="setStyle()"
		@click="popToggle()"
	>
		<motion.span
			:key="asterKey"
			:animate="iconAnimate"
			:transition="spinTransition"
			class="make-btn-ic"
		>
			<AsteriskIcon />
		</motion.span>
	</button>
</template>

<style lang="scss" scoped>
.make-btn {
	@include circle;
	@include transition;
	position: relative;
	width: $make-button-size;
	background-color: $dark200;
	border: solid 1px $dark400;
	color: $light;
	z-index: 20;

	&-ic {
		@include center;
		@include flex-center;
		width: calc(100% / 3);

		svg {
			width: 100%;
			height: auto;
		}
	}
}
</style>
