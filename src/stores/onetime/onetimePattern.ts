export const useOnetimePatternStore = defineStore('onetimePattern', () => {
    const pattern = ['reverse', 'spacing', 'slash', 'tag', 'error']
    const patternLength = pattern.length
    const currentPattern = ref<string | null>(null)
    const isEffectIndex = ref<boolean[]>([])

    return {
        pattern,
        patternLength,
        currentPattern,
        isEffectIndex
    }
})
