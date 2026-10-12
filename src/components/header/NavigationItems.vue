<script setup lang="ts">
import GitHub from '~icons/my-icons/github'
import Hatenablog from '~icons/my-icons/hatenablog'

const socialAttr = {
	target: '_blank',
	rel: 'noopener noreferrer',
	class: 'list-social-link',
}
</script>

<template>
	<ul class="list">
		<li>
			<RouterLink to="/about" class="list-link">ABOUT</RouterLink>
		</li>
		<li>
			<ul class="list-social">
				<li>
					<a
						href="https://github.com/acchinosorara/bug-clock"
						v-bind="socialAttr"
						aria-label="GitHub"
					>
						<GitHub />
					</a>
				</li>
				<li>
					<a
						href="https://acchinosorara.hatenablog.jp/"
						v-bind="socialAttr"
						aria-label="はてなブログ"
					>
						<Hatenablog />
					</a>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
$ic-size: 24px;

.list {
	display: flex;
	gap: 0.5rem;
	justify-content: flex-end;
	align-items: center;

	&-link {
		@include hover-back-scale;
		color: $light;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		line-height: 1;
		padding: 0.75em;
	}

	&-social {
		display: flex;
		align-items: center;

		&-link {
			@include transition(color);
			@include hover-back-scale;
			width: calc($ic-size * 1.6);
			aspect-ratio: 1 / 1;
			color: $light300;

			@include hover {
				color: $light;
			}

			svg {
				display: flex;
				width: $ic-size;
				height: auto;
			}
		}
	}
}
</style>
