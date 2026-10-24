interface StrongEffect {
	isActive: ComputedRef<boolean>
	endEffect: () => void
}

export const useEffectState = (name: StrongEffectName | StrongEffectName[]): StrongEffect => {
	const { activeEffect } = storeToRefs(useStrongEffectStore())
	const names = typeof name === 'string' ? [name] : name

	const isActive = computed<boolean>(
		() => activeEffect.value !== null && names.includes(activeEffect.value),
	)

	// エフェクト発火中の場合のみ解除
	const endEffect = (): void => {
		if (isActive.value) activeEffect.value = null
	}

	return {
		isActive,
		endEffect,
	}
}
