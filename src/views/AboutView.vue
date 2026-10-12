<script setup lang="ts">
import Title from '@/components/view/ViewTitle.vue'
import type { CSSProperties } from 'vue'

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
	<section class="sec">
		<Title en="ABOUT" ja="このサイトについて" />
		<div class="sec-info">
			<p>
				当サイト「バグった時計」は、その名のとおりバグった時計を観賞するだけの誰得サイトです。<br />
				一種のエンターテイメントとして、バグ風の演出をお楽しみください。
			</p>
		</div>
		<div class="sec-cont">
			<h2 class="sec-cont-title">留意事項</h2>
			<ol class="sec-cont-ol">
				<li>
					<div>
						<p>
							開発上の配慮はしておりますが、やや刺激の強いサイトとなっています。<br />
							そのため、以下のいずれかに該当する場合は、閲覧を控えるか、ちょこっと覗く程度の閲覧をおすすめします。
						</p>
						<ul :style="setStyle()" class="sec-cont-ul">
							<li class="item">
								<p>バグった画面・挙動に抵抗のある方</p>
							</li>
							<li class="item">
								<p>体調の優れない方</p>
							</li>
							<li class="item">
								<p>視覚刺激に敏感な方</p>
							</li>
							<li class="item">
								<p>視覚刺激により、心身に不調をきたした経験などがある方</p>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<p>
						長時間の閲覧により、目やお使いのデバイス（スマートフォン・パソコンなど）に負荷がかかる場合があります。閲覧の際は、適度な休憩をおすすめします。<br />
						また閲覧中、体調に異変を感じた場合は、閲覧を中断していただくようお願いいたします。
					</p>
				</li>
				<li>
					<p>
						仕様上、動作が重くなることがあります。その際は、ページの再読み込み（リロード）などで改善される場合がありますので、閲覧を続ける場合はお試しください。
					</p>
				</li>
				<li>
					<p>
						当サイトのご利用に関しては、自己責任でお願いいたします。<br />
						当サイトのご利用によって生じた損害等につきましては責任を負いかねますので、ご了承ください。
					</p>
				</li>
			</ol>
		</div>
		<div class="sec-cont">
			<h2 class="sec-cont-title">その他</h2>
			<p>
				当サイトは、機能追加・改善など、適宜アップデートしていく予定です。内容は予告なく変更される場合がありますので、ご了承ください。
			</p>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.sec {
	@include child-page-size;
	@include wrap;
	color: $light300;

	&-info {
		padding-block: 3em 1.5em;
	}

	&-cont {
		font-size: 1rem;

		&:not(:last-of-type) {
			padding-block: 3em;
			border-bottom: solid 1px $dark300;
		}

		& + &:last-of-type {
			padding-top: 3em;
		}

		&-title {
			position: relative;
			color: $light200;
			font-size: 1.5em;
			font-weight: bold;
			margin-bottom: 1em;
		}

		&-ol {
			counter-reset: index;

			> li {
				position: relative;
				display: flex;
				align-items: flex-start;
				padding-left: 1.75em;

				&:not(:last-child) {
					margin-bottom: 1.75em;
				}

				&::before {
					@include mono;
					counter-increment: index;
					content: counter(index) '.';
					position: absolute;
					top: 0.1em;
					left: 0;
				}
			}
		}

		&-ul {
			border: solid 1px $dark300;
			margin-block: 1em 0.5em;
			padding: 1em 1.5em;

			.item {
				position: relative;
				padding-left: 1em;
				color: $light300;

				&:not(:last-child) {
					margin-bottom: 0.75em;
				}

				&::before {
					content: '';
					position: absolute;
					width: 0.3em;
					aspect-ratio: 1 / 1;
					background-color: var(--color);
					top: 0.9em;
					left: 0;
					translate: 0 -50%;
				}
			}
		}
	}
}
</style>
