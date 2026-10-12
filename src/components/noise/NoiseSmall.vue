<script setup lang="ts">
import { useEffectState } from '@/composables/strongEffect/effectState'
import { useUpdateInterval } from '@/composables/updateInterval'
import type { CSSProperties } from 'vue'

const colorsIndexStore = useColorsStore()
const { colorsIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore
const { clockSizeSub } = storeToRefs(useClockSizeStore())
const { delay, countMax } = useAnimationValStore()
const { randomInt, randomDeci } = random()

// strongEffect（noiseProliferate）
const { isActive, endEffect } = useEffectState('noiseProliferate')
const { effectDuration } = storeToRefs(useStrongEffectStore())
const { start } = useTimeoutFn(endEffect, effectDuration, { immediate: false })

watch(isActive, (val) => {
	if (!val) return
	start()
})

const noiseMin = computed<number>(() => (isActive.value ? 90 : 6))
const noiseMax = computed<number>(() => (isActive.value ? 800 : 40))
const noiseIndex = ref<number>(0)

// ノイズ総数分の乱数を生成
const setVal = (minVal: number, maxVal: number): number[] => {
	return setArray(noiseIndex.value, () => randomInt({ min: minVal, max: maxVal }))
}

// ノイズ総数分のcolorsPatternインデックス番号
const colorIndex = ref<number[]>([])

// ノイズ総数分のCSS値
const widthMax = clockSizeSub.value / 10
const width = ref<number[]>([])
const height = ref<number[]>([])
const opacity = ref<number[]>([])
const translateMax = clockSizeSub.value / 1.75
const translateX = ref<string[]>([])
const translateY = ref<string[]>([])

useUpdateInterval({
	delay,
	countMax,
	tick: () => {
		noiseIndex.value = isTrigger(isActive.value ? 3 : 4)
			? randomInt({ min: noiseMin.value, max: noiseMax.value })
			: 0

		if (noiseIndex.value > 0) {
			// 横長にする
			width.value = setVal(4, widthMax)
			height.value = width.value.map((w) => randomInt({ min: 1, max: w / 3 }))

			const pattern = colorsPattern[colorsIndex.value] ?? []
			colorIndex.value = setVal(0, pattern.length + 1)

			opacity.value = setArray(noiseIndex.value, () => randomDeci({ min: 0.6, max: 1 }))

			translateX.value = setArray(
				noiseIndex.value,
				() => `${setPlusMinus()} ${randomInt({ min: 0, max: translateMax })}`,
			)

			translateY.value = setArray(
				noiseIndex.value,
				() => `${setPlusMinus()} ${randomInt({ min: 0, max: translateMax })}`,
			)
		}
	},
})

const setStyle = (i: number): CSSProperties => {
	return {
		width: `${width.value[i]}px`,
		height: `${height.value[i]}px`,
		backgroundColor: colorsPattern[colorsIndex.value]?.[colorIndex.value[i] ?? 0] ?? '#f0f0f0',
		opacity: `${opacity.value[i]}`,
		translate: `calc(-50% ${translateX.value[i]}px) calc(-50% ${translateY.value[i]}px)`,
	}
}
</script>

<template>
	<span v-for="(_, i) in noiseIndex" :key="i" :style="setStyle(i)" class="noise"> </span>
</template>

<style lang="scss" scoped>
.noise {
	position: absolute;
	mix-blend-mode: difference;
	top: 50%;
	left: 50%;
}
</style>
