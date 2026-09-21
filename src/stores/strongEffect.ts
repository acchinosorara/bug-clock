import { useUpdateInterval } from '@/composables/updateInterval'

export const strongEffects = [
	'froze',
	'longHands',
	'cloneHands',
	'cloneIndex',
	'noiseProliferate',
	'noiseLarge',
] as const
export type StrongEffectName = (typeof strongEffects)[number]

export const useStrongEffectStore = defineStore('strongEffect', () => {
	const { randomInt } = random()

	// 稼働時間
	const timeMin = 5
	const timeMax = 13
	const effectTime = ref<number>(timeMin)
	const effectDuration = computed<number>(() => effectTime.value * 1000)

	// エフェクトを1つだけ選択し発火
	const activeEffect = ref<StrongEffectName | null>(null)
	useUpdateInterval({
		delay: 7000,
		countMax: 10,
		immediate: true,
		tick: () => {
			if (activeEffect.value !== null || isTrigger(2)) return

			effectTime.value = randomInt({ min: timeMin, max: timeMax })
			const i = randomInt({ min: 0, max: strongEffects.length })
			activeEffect.value = strongEffects[i] ?? null
		},
	})

	return {
		strongEffects,
		activeEffect,
		effectTime,
		effectDuration,
	}
})
