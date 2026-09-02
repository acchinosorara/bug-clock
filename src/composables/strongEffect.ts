interface StrongEffect {
    isActive: ComputedRef<boolean>
    endEffect: () => void
}

export const useStrongEffect = (name: StrongEffectName): StrongEffect => {
    const { activeEffect } = storeToRefs(useStrongEffectStore())

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
