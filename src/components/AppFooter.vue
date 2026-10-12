<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed<boolean>(() => route.path === '/')
const setClass = (): string => (isHome.value ? '' : 'child')

const { initStyle } = useViewStore()
</script>

<template>
	<footer :style="initStyle()" :class="setClass()" class="footer">
		<div class="footer-column mono">
			<small class="ver">ver.0:1:0</small>
			<small>&copy;2026 acchinosorara</small>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	position: absolute;
	padding-left: $inline;
	bottom: $block;

	&.child {
		@include child-page-size;
		position: relative;
		padding: 6rem $inline $block;
		bottom: initial;
	}

	&-column {
		display: flex;
		gap: 1em;
		align-items: center;
		color: $light400;
		font-size: 0.75rem;

		.ver {
			position: relative;
			padding-right: 1em;

			&::after {
				content: '';
				position: absolute;
				width: 1px;
				height: 0.9em;
				background-color: $light400;
				top: 50%;
				right: 0;
				translate: 0 -50%;
			}
		}
	}
}
</style>
