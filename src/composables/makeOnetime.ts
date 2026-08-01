import { useOnetimePatternStore } from '@/stores/onetime/onetimePattern'
import { useOnetimePopStore } from '@/stores/onetime/onetimePop'

interface OnetimePattern {
    currentPattern: Ref<string | null>
    characters: Ref<string[]>
    origin: string
}

export const useMakeOnetime = (): OnetimePattern => {
    const onetimePatternStore = useOnetimePatternStore()
    const { pattern, patternLength } = onetimePatternStore
    const { currentPattern } = storeToRefs(onetimePatternStore)
    const { randomInt } = random()
    const { now } = storeToRefs(useNowStore())
    const { isPopover } = storeToRefs(useOnetimePopStore())

    const day = useDateFormat(now, 'YYYY/MM/DD')
    const dayCharacters = ref<string[]>([...day.value])

    watch(isPopover, (val) => {
        const index = randomInt({ min: 0, max: patternLength + 1 })
        if (!val) dayCharacters.value = [...day.value]
        currentPattern.value = pattern[index] ?? null
    })

    return {
        currentPattern: currentPattern,
        characters: dayCharacters,
        origin: day.value
    }
}
