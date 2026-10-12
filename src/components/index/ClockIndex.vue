<script setup lang="ts">
import { useUpdateIntervalArray } from '@/composables/updateIntervalArray'
import { useColorStates } from '@/composables/index/colorStates'
import { useIndexInvert } from '@/composables/index/indexInvert'
import { useEffectState } from '@/composables/strongEffect/effectState'
import type { CSSProperties } from 'vue'
import type { ClassState } from '@/types/ClassState'

const { delay, countMax } = useAnimationValStore()
const { randomInt } = random()
const { isActive, endEffect } = useEffectState('froze')

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

// strongEffect（froze）
const { effectDuration } = storeToRefs(useStrongEffectStore())
const { start } = useTimeoutFn(endEffect, effectDuration, { immediate: false })

watch(isActive, (val) => {
	if (!val) {
		indexRefs.value = indexDefaults.map((index) => [...index])
		return
	}
	const char = isTrigger(2) ? '?' : '!'
	indexRefs.value = indexDefaults.map((index) => index.map(() => char))
	start()
})

const { clockSizeSub } = storeToRefs(useClockSizeStore())
const scaleStore = useScaleHeightStore()
const { scaleHeightDefault } = scaleStore
const { scaleHeight } = storeToRefs(scaleStore)

// style・class切替（インデックス単位）
const setIndexClass = (): ClassState => ({ froze: isActive.value })

const setIndexStyle = (i: number): CSSProperties => {
	return {
		'--i': i,
		'--pos': `
            calc(${clockSizeSub.value / 2}px - 0.5em - ${Math.round(scaleHeight.value ?? scaleHeightDefault / 1.5)}px)
        `,
		// frozeの間は白背景で固定
		backgroundColor: isActive.value ? white : backgrounds.value.at(i),
		borderColor: isActive.value ? undefined : borderColors.value.at(i),
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
