import { useUpdateInterval } from '@/composables/updateInterval'

export const useShuffle = (els: Ref<(HTMLElement | null)[]>): void => {
	const { randomInt } = random()
	const garbleds = ['■', '□', '●', '○', '・', '◎', '▲', '△', '∴', '▼', '▽', '◆', '◇']
	const origin = els.value.map((el) => el?.textContent ?? '')
	const maxLength = Math.max(0, ...origin.map((text) => [...text].length))

	const shuffleCount = 20
	let step = 0

	const render = (): void => {
		els.value.forEach((el, i) => {
			if (!el) return
			el.textContent = [...(origin[i] ?? '')]
				.map((char, j) => {
					const k = step - j
					return k >= 0 && k < shuffleCount
						? garbleds[randomInt({ min: 0, max: garbleds.length })]
						: char
				})
				.join('')
		})
	}

	const { pause, resume } = useIntervalFn(
		() => {
			step++
			render()
			if (step >= maxLength + shuffleCount) pause()
		},
		25,
		{ immediate: false },
	)

	useUpdateInterval({
		delay: 6000,
		countMax: 10,
		tick: (): void => {
			pause()
			step = 0
			render()
			resume()
		},
		immediate: true,
	})
}
