<script setup lang="ts">
import { useVibrate } from '@/composables/vibrate'
import { useEffectState } from '@/composables/strongEffect/effectState'
import { useLongHands } from '@/composables/strongEffect/longHands'
import type { CSSProperties } from 'vue'

const { now } = storeToRefs(useNowStore())
const vibrateVal = useVibrate()

// strongEffect（フリーズ）
const { isActive, endEffect } = useEffectState('froze')
const frozeDelay = 6000
const { start } = useTimeoutFn(endEffect, frozeDelay, { immediate: false })

watch(isActive, (val) => {
	if (!val) return
	start()
})

const hour = computed<number>(() => now.value.getHours() % 12)
const angle = computed<CSSProperties>(() => {
	const vibrate = isActive.value ? 0 : vibrateVal.value
	return {
		rotate: `${hour.value * 30 + vibrate}deg`,
	}
})

const longStyle = useLongHands()
</script>

<template>
	<span class="hour" :style="[angle, longStyle]"></span>
</template>

<style lang="scss" scoped>
.hour {
	@include hand($border-extrabold, 0);
	height: 25%;
	background-color: $light;

	@include hand-inner;
}
</style>
