<script setup lang="ts">
import { motion, useMotionValue, animate, steps } from 'motion-v'
import { useEffectState } from '@/composables/strongEffect/effectState'

const { randomDeci } = random()
const { isActive } = useEffectState('froze')

const rotate = useMotionValue(0)
const animation = (): void => {
	const from = rotate.get()
	const val = isActive.value ? from - 360 : from + 360
	animate(rotate, [from, val], {
		duration: isActive.value ? randomDeci({ min: 0.4, max: 1.6 }) : 10,
		ease: isActive.value ? 'linear' : steps(60),
		repeat: Infinity,
	})
}
animation()

watch(isActive, () => {
	animation()
})
</script>

<template>
	<motion.span :style="{ rotate }" class="second"></motion.span>
</template>

<style lang="scss" scoped>
$hand-out: 0.8rem;

.second {
	@include hand($border-regular, $hand-out);
	height: calc(50% + $hand-out - $scale-height - $border-semibold);
	background-color: $light;
}
</style>
