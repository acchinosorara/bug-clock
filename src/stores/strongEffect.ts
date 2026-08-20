export const strongEffects = ['longHands', 'cloneHands', 'cloneIndex', 'noiseLarge'] as const
export type StrongEffectName = (typeof strongEffects)[number]

export const useStrongEffectStore = defineStore('strongEffect', () => {
    // エフェクト発火は1つのみ
    const activeEffect = ref<StrongEffectName | null>(null)

    return {
        strongEffects,
        activeEffect
    }
})
