<script setup lang="ts">
import { useShuffle } from '@/composables/shuffle'

defineProps<{
	en: string
	ja: string
}>()

const heading = ref<HTMLElement | null>()
const shuffleTexts = ref<(HTMLElement | null)[]>([])
onMounted(() => {
	if (!heading.value) return
	shuffleTexts.value = Array.from(heading.value.children) as HTMLElement[]
	useShuffle(shuffleTexts)
})
</script>

<template>
	<div ref="wrap" class="page-title">
		<h1 :ref="(el) => (heading = el as HTMLElement | null)" class="page-title-h">
			<span>{{ en }}</span>
			<p>{{ ja }}</p>
		</h1>
	</div>
</template>

<style lang="scss" scoped>
.page-title {
	@include flex-between;
	font-size: clamp(2.5rem, 7vw, 3.25rem);
	height: 4.5em;
	margin-top: var(--header-height);
	border-bottom: solid 1px $dark300;

	&-h {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $light;
		line-height: 1;

		span {
			font-weight: bold;
			letter-spacing: 0.07em;
		}

		p {
			font-size: 0.3em;
			margin-top: 1.5em;

			@include bp480 {
				font-size: 0.35em;
			}
		}
	}
}
</style>
