import { useUpdateInterval } from '@/composables/updateInterval'

export const strongEffects = ['longHands', 'cloneHands', 'cloneIndex', 'noiseLarge'] as const
export type StrongEffectName = (typeof strongEffects)[number]

export const useStrongEffectStore = defineStore('strongEffect', () => {
    const { randomInt } = random()

    // エフェクトを1つ選び発火
    const activeEffect = ref<StrongEffectName | null>(null)
    useUpdateInterval({
        delay: 6000,
        countMax: 10,
        immediate: true,
        tick: () => {
            if (activeEffect.value !== null || isTrigger(2)) return

            const index = randomInt({ min: 0, max: strongEffects.length })
            activeEffect.value = strongEffects[index] ?? null
        }
    })

    return {
        strongEffects,
        activeEffect
    }
})
