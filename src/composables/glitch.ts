import { useUpdateInterval } from '@/composables/updateInterval'

type GlitchColor = string
interface GlitchOptions {
	glitchX: Ref<string[]>
	glitchY: Ref<string[]>
	glitchColor: Ref<GlitchColor[]>
}

export const useGlitch = (index: number): GlitchOptions => {
	const { delay, countMax } = useAnimationValStore()
	const { randomInt } = random()
	const colorsIndexStore = useColorsStore()
	const { colorsIndex } = storeToRefs(colorsIndexStore)
	const { colorsPattern } = colorsIndexStore

	const unit = 'px'
	const x = ref<string[]>(setArray<string>(index, `0${unit}`))
	const y = ref<string[]>(setArray<string>(index, `0${unit}`))
	const color = ref<GlitchColor[]>(setArray<GlitchColor>(index, ''))

	const setPos = (): string => {
		const sign = setPlusMinus()
		const pixel = 5
		const num = randomInt({ min: 0, max: pixel })
		return `${sign} ${num}${unit}`
	}

	const setColor = (): GlitchColor => {
		const pattern = colorsPattern[colorsIndex.value] ?? []
		const colorIndex = randomInt({ min: 0, max: pattern.length + 3 })
		return pattern[colorIndex] ?? ''
	}

	useUpdateInterval({
		delay,
		countMax,
		tick: () => {
			for (let i = 0; i < index; i++) {
				if (!isTrigger(3)) {
					x.value[i] = setPos()
					y.value[i] = setPos()
					color.value[i] = setColor()
				}
			}
		},
	})

	return {
		glitchX: x,
		glitchY: y,
		glitchColor: color,
	}
}
