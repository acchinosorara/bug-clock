import { useUpdateInterval } from '@/composables/updateInterval'
import type { StrongEffectName } from '@/stores/strongEffect'

interface StrongEffect {
    isActive: ComputedRef<boolean>
    endEffect: () => void
}

let hasTrigger = false

export const useStrongEffect = (name: StrongEffectName): StrongEffect => {
    const { randomInt } = random()
    const strongEffectStore = useStrongEffectStore()
    const { strongEffects } = strongEffectStore
    const { activeEffect } = storeToRefs(strongEffectStore)

    if (!hasTrigger) {
        hasTrigger = true

        useUpdateInterval({
            delay: 6000,
            countMax: 10,
            tick: () => {
                if (activeEffect.value !== null || isTrigger(2)) return

                const index = randomInt({ min: 0, max: strongEffects.length })
                activeEffect.value = strongEffects[index] ?? null
            }
        })
    }

    const isActive = computed<boolean>(() => activeEffect.value === name)

    // エフェクト発火中の場合のみ解除
    const endEffect = (): void => {
        if (isActive.value) activeEffect.value = null
    }

    return {
        isActive,
        endEffect
    }
}
