import { useUpdateInterval } from '@/composables/updateInterval'
import { useEffectState } from '@/composables/strongEffect/effectState'
import type { CSSProperties } from 'vue'

export const useMaskStripe = (): Ref<CSSProperties> => {
	const { randomInt, randomDeci } = random()
	const { clockSizeSub } = storeToRefs(useClockSizeStore())
	const { delay, countMax } = useAnimationValStore()
	const { isActive } = useEffectState('froze')

	const maskStyle = ref<CSSProperties>({})

	watch(isActive, (val) => {
		if (!val) maskStyle.value = {}
	})

	const setMaskImage = (): string => {
		const size = randomInt({ min: 2, max: 25 })
		const stripe = Array.from(
			{ length: clockSizeSub.value / 2 },
			(_, i) =>
				`rgba(0, 0, 0, ${randomDeci({ min: 0.5, max: 1.1 })}) ${i * size}px ${(i + 1) * size}px`,
		)
		const val = stripe.join(',')
		return `repeating-linear-gradient(to bottom, ${val})`
	}

	useUpdateInterval({
		delay: delay,
		countMax: countMax,
		tick: () => {
			if (!isActive.value) return
			const mask = isTrigger(2) ? 'none' : setMaskImage()
			maskStyle.value = {
				maskImage: mask,
				WebkitMaskImage: mask,
			}
		},
	})

	return maskStyle
}
