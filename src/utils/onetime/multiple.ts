import type { CSSProperties } from 'vue'

interface Multiple {
    multipleCharacters: string[]
    multipleMargin: () => CSSProperties[] | void
}

export const onetimeMultiple = (characters: string[]): Multiple => {
    const { width } = useWindowSize()
    const { charSize } = storeToRefs(useOnetimePopStore())
    const minCharactersLength = Math.round(width.value / 3 / charSize.value!)
    const maxCharactersLength = Math.ceil(width.value / charSize.value!)

    const { randomInt, randomDeci } = random()
    const length = characters.length
    const targetLength = randomInt({ min: 0, max: length })

    const multiple = (): string[] => {
        const num = randomInt({ min: minCharactersLength, max: maxCharactersLength })
        const arr = Array.from({ length: num }, () => characters[targetLength]!)
        return arr
    }

    const multipliedCharacters = multiple()
    const multipleCharacters = [
        ...characters.slice(0, targetLength),
        ...multipliedCharacters,
        ...characters.slice(targetLength)
    ]

    // 複製範囲の文字間を狭める
    const multipleMargin = (): CSSProperties[] | void => {
        if (isTrigger(2)) return
        const styles = multipleCharacters.map((_, i) =>
            i >= targetLength && i <= targetLength + multipliedCharacters.length + 1
                ? { 'margin-left': `-${randomDeci({ min: 0.1, max: 0.6 })}em` }
                : {}
        )
        return styles
    }

    return {
        multipleCharacters,
        multipleMargin
    }
}
