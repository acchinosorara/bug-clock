<script setup lang="ts">
import CopyIcon from '~icons/my-icons/copy'
import CheckIcon from '~icons/my-icons/check'
import { useMakeOnetime } from '@/composables/makeOnetime'
import type { CSSProperties } from 'vue'

const colorsIndexStore = useColorsStore()
const { colorsIndex, colorIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore

const { origin } = useMakeOnetime()
const { copy } = useClipboard({ legacy: true })
const { isCopied } = storeToRefs(useOnetimePopStore())

const { start } = useTimeoutFn(
	() => {
		isCopied.value = false
	},
	3000,
	{ immediate: false },
)

const copied = (): void => {
	copy(origin)
	isCopied.value = true
	start()
}

const setClass = computed<string>(() => {
	return isCopied.value ? 'copied' : ''
})

const setStyle = (): CSSProperties => {
	return {
		backgroundColor: isCopied.value
			? colorsPattern[colorsIndex.value]?.[colorIndex.value]
			: undefined,
	}
}
</script>

<template>
	<span v-if="isCopied" class="message">Copied the date.</span>
	<button @click="copied()" :class="setClass" :style="setStyle()" class="copy">
		<CheckIcon v-if="isCopied" />
		<CopyIcon v-else />
	</button>
</template>

<style lang="scss" scoped>
.copy {
	@include transition(background-color);
	position: absolute;
	width: 1.25em;
	aspect-ratio: 1 / 1;
	border-radius: 4px;
	color: $light300;
	top: 50%;
	right: 0;
	translate: 0 -50%;

	@include hover {
		color: $light200;
		background-color: $dark300;
	}

	&.copied {
		color: $light;
	}

	svg {
		@include center;
		@include transition;
		width: 0.75em;
		height: auto;
	}
}

.message {
	color: $light;
	font-size: 0.75em;
}
</style>
