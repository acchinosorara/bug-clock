<script setup lang="ts">
import { useVibrate } from '@/composables/vibrate'
import { useEffectState } from '@/composables/strongEffect/effectState'
import { useLongHands } from '@/composables/strongEffect/longHands'
import type { CSSProperties } from 'vue'

const { now } = storeToRefs(useNowStore())
const vibrateVal = useVibrate()

// strongEffect（froze）
const { isActive, endEffect } = useEffectState('froze')
const { effectDuration } = storeToRefs(useStrongEffectStore())
const { start } = useTimeoutFn(endEffect, effectDuration, { immediate: false })

watch(isActive, (val) => {
	if (!val) return
	start()
})

const minute = computed<number>(() => now.value.getMinutes() * 6)
const setAngle = computed<CSSProperties>(() => {
	const vibrate = isActive.value ? 0 : vibrateVal.value
	return {
		rotate: `${minute.value + vibrate}deg`,
	}
})

const longStyle = useLongHands()
</script>

<template>
	<span class="minute" :style="[setAngle, longStyle]"></span>
</template>

<style lang="scss" scoped>
.minute {
	@include hand($border-extrabold, 0);
	height: calc(50% - $scale-height - $border-semibold);
	background-color: $light;

	@include hand-inner;
}
</style>
