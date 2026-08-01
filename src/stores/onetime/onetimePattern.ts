export const useOnetimePatternStore = defineStore('onetimePattern', () => {
    const pattern = ['reverse', 'spacing']
    const patternLength = pattern.length
    const currentPattern = ref<string | null>(null)

    return {
        pattern,
        patternLength,
        currentPattern
    }
})
