<script setup lang="ts">
import Logo from '~icons/my-icons/logo'
import { useRoute } from 'vue-router'
import type { CSSProperties } from 'vue'

const route = useRoute()
const isHome = computed<boolean>(() => route.path === '/')

const { activeEffect } = storeToRefs(useStrongEffectStore())
const { clockKey } = storeToRefs(useViewStore())
const { setColorsIndex } = useColorsStore()

const reload = (): void => {
	if (!isHome.value) return
	activeEffect.value = null
	clockKey.value++
	setColorsIndex()
}

const colorsIndexStore = useColorsStore()
const { colorsIndex, colorIndex } = storeToRefs(colorsIndexStore)
const { colorsPattern } = colorsIndexStore

const setStyle = (): CSSProperties => {
	return {
		'--color': colorsPattern[colorsIndex.value]?.[colorIndex.value],
	}
}
</script>

<template>
	<RouterLink
		:to="{ name: 'home' }"
		@click="reload()"
		:aria-label="isHome ? '再読み込み' : 'ホームへ戻る'"
		class="logo"
	>
		<h1 class="logo-h">
			<span :style="setStyle()" class="logo-h-ic">
				<Logo />
			</span>
			<p>バグった時計</p>
		</h1>
	</RouterLink>
</template>

<style lang="scss" scoped>
.logo {
	&-h {
		@include flex-center;
		gap: 0.5em;
		position: relative;
		color: $light;
		font-size: 0.9rem;
		font-weight: bold;
		letter-spacing: 0.08em;

		&-ic {
			position: relative;
			color: var(--color);

			&::before {
				@include center;
				@include circle;
				content: '';
				height: 100%;
				background-color: var(--color);
				opacity: 0;
				transform-origin: center;
				z-index: -1;
				animation: radiation 3.5s ease-out infinite;

				@keyframes radiation {
					0% {
						opacity: 0;
						scale: 0;
					}
					12.5% {
						opacity: 0.7;
						scale: 1;
					}
					25% {
						opacity: 0;
						scale: 2;
					}
					100% {
						opacity: 0;
						scale: 2;
					}
				}
			}

			svg {
				display: flex;
				width: auto;
				height: calc(var(--header-height) / 3);
			}
		}
	}
}
</style>
