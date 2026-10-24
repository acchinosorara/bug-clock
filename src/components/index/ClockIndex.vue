<script setup lang="ts">
import { useUpdateInterval } from '@/composables/updateInterval'
import { useUpdateIntervalArray } from '@/composables/updateIntervalArray'
import { useColorStates } from '@/composables/index/colorStates'
import { useIndexInvert } from '@/composables/index/indexInvert'
import { useEffectState } from '@/composables/strongEffect/effectState'
import type { CSSProperties } from 'vue'
import type { ClassState } from '@/types/ClassState'

const { delay, countMax } = useAnimationValStore()
const { randomInt, randomDeci } = random()

const { isActive, endEffect } = useEffectState(['froze', 'overIndex'])

const hour = 12
const setIndex = (i: number): string => {
	const val = i === 0 ? 12 : i
	return val.toString()
}

const indexDefaults = setArray<string[]>(hour, (i) => setIndex(i).split(''))
const indexRefs = ref<string[][]>(indexDefaults.map((index) => [...index]))

const garbledCharacters = [
	['Q', '@', '□'],
	['i', '/', '!'],
	['Z', '?', '≥'],
	['E', '}', '÷'],
	['A', '+', '↑'],
	['S', '≤', '§'],
	['b', 'G', '('],
	['F', '>', '┐'],
	['B', '&', ':'],
	['P', 'q', ','],
]

// 状態管理
const { white, backgrounds, borderColors, textColors, setBackground, setBorder, setColor } =
	useColorStates(indexDefaults)

const { invertClassStates, setInvert } = useIndexInvert(indexDefaults)

// style・class切替（文字単位）
const setCharClass = (i: number, index: number): ClassState[] | void => {
	if (isActive.value) return []

	const invert = invertClassStates.value.at(i)?.at(index)
	if (!invert) return
	return [invert]
}

const setCharStyle = (i: number, index: number): CSSProperties => ({
	color: isActive.value ? undefined : textColors.value.at(i)?.at(index),
})

// アニメーション
const setCharacter = (i: number): void => {
	indexRefs.value[i]?.forEach((_, j) => {
		const defaultChar = indexDefaults.at(i)?.at(j)
		const list = garbledCharacters.at(Number(defaultChar))
		const garbledChar = indexRefs.value.at(i)
		if (!defaultChar || !list || !garbledChar) return

		// 文字化け or 元の数字を保持
		const charLength = randomInt({ min: 0, max: list.length + 1 })
		const randomChar = list.at(charLength)
		garbledChar[j] = randomChar || defaultChar

		setColor(i, j)
		setInvert(i, j)
	})
}

useUpdateIntervalArray({
	delay,
	countMax,
	length: hour,
	tick: (i) => {
		if (!isActive.value) {
			setCharacter(i)
			setBackground(i)
			setBorder(i)
		}
	},
})

// strongEffect
const { isActive: isFroze } = useEffectState('froze')
const { isActive: isOverIndex } = useEffectState('overIndex')
const { effectDuration } = storeToRefs(useStrongEffectStore())
const { start } = useTimeoutFn(endEffect, effectDuration, { immediate: false })

const fontDivisors = ref<number[]>(setArray<number>(hour, 1))
const fontOffsets = ref<number[]>(setArray<number>(hour, 0))

useUpdateInterval({
	delay,
	countMax,
	tick: () => {
		if (!isOverIndex.value) return
		if (!isTrigger(3)) {
			fontOffsets.value = setArray<number>(hour, 0)
			return
		}
		fontOffsets.value = setArray<number>(hour, () => randomInt({ min: -24, max: 25 }))
	},
})

watch(isActive, (val) => {
	fontOffsets.value = setArray<number>(hour, 0)
	if (!val) {
		indexRefs.value = indexDefaults.map((index) => [...index])
		return
	}

	switch (true) {
		case isFroze.value:
			const char = isTrigger(2) ? '?' : '!'
			indexRefs.value = indexDefaults.map((index) => index.map(() => char))
			break
		case isOverIndex.value:
			indexRefs.value = indexDefaults
			fontDivisors.value = setArray<number>(hour, () => randomDeci({ min: 1, max: 3 }))
			break
	}
	start()
})

const { clockSizeSub } = storeToRefs(useClockSizeStore())
const scaleStore = useScaleHeightStore()
const { scaleHeightDefault } = scaleStore
const { scaleHeight } = storeToRefs(scaleStore)

// style・class切替（インデックス単位）
const setIndexClass = (): ClassState => ({ froze: isFroze.value })

const setBackgroundColor = (i: number): string | undefined => {
	if (isFroze.value) return white
	if (isActive.value) return
	return backgrounds.value.at(i)
}

const setPos = (): string => {
	if (isOverIndex.value) return `${clockSizeSub.value / 1.5}px`
	return `calc(${clockSizeSub.value / 2}px - 0.5em - ${Math.round(scaleHeight.value ?? scaleHeightDefault / 1.5)}px)`
}

const setFontSize = (i: number): string | undefined => {
	if (!isOverIndex.value) return
	const base = clockSizeSub.value / (fontDivisors.value.at(i) ?? 2)
	return `${base + (fontOffsets.value.at(i) ?? 0)}px`
}

const setIndexStyle = (i: number): CSSProperties => {
	return {
		'--i': i,
		'--pos': setPos(),
		backgroundColor: setBackgroundColor(i),
		borderColor: isActive.value ? undefined : borderColors.value.at(i),
		fontSize: setFontSize(i),
	}
}
</script>

<template>
	<div class="index">
		<div
			v-for="(_, i) in hour"
			:key="i"
			:style="setIndexStyle(i)"
			:class="setIndexClass()"
			class="index-text mono"
		>
			<span
				v-for="(char, j) in indexRefs[i]"
				:key="j"
				:style="setCharStyle(i, j)"
				:class="setCharClass(i, j)"
				class="index-text-char"
			>
				{{ char }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.index {
	@include center;
	width: 100%;
	height: 100%;
	rotate: -90deg;

	&-text {
		@include circular(12);
		display: flex;
		color: $light;
		font-size: $index-size;
		font-weight: bold;
		line-height: 1;
		border: solid $border-light transparent;
		rotate: 90deg;
		transform-origin: center;

		&.froze {
			color: $dark100;
		}

		&-char {
			@include invert;
		}
	}
}
</style>
