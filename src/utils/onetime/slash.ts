import { random } from '@/utils/random'
import type { VariantType, Transition } from 'motion-v'
import type { CSSProperties } from 'vue'

interface Slash {
    slashRemoveCharacters: string[]
    isSlashIndex: boolean[]
    slashHeight: () => (CSSProperties | undefined)[]
    slashAnimate: () => (VariantType | undefined)[]
    slashTransition: () => Transition
}

export const onetimeSlash = (characters: string[]): Slash => {
    const slashRemoveCharacters: string[] = []
    const isSlashIndex: boolean[] = []
    const { randomInt, randomDeci } = random()

    for (const char of characters) {
        const isSlash = char === '/'
        slashRemoveCharacters.push(isSlash ? '' : char)
        isSlashIndex.push(isSlash)
    }

    const slashHeight = (): CSSProperties[] => {
        const height = { height: `${randomInt({ min: 20, max: 100 })}vh` }
        const styles = characters.map((_, i) => (isSlashIndex[i] ? height : {}))
        return styles
    }

    // スラッシュの回転
    const slashAnimate = (): VariantType[] => {
        const animates = characters.map((_, i) =>
            isSlashIndex[i]
                ? isTrigger(2)
                    ? { rotate: [0, Number(setPlusMinus() + 360)] }
                    : {}
                : {}
        )
        return animates
    }

    const slashTransition = (): Transition => {
        return {
            duration: randomDeci({ min: 0.1, max: 2 }),
            ease: 'linear',
            repeat: Infinity
        }
    }

    return {
        slashRemoveCharacters,
        isSlashIndex,
        slashHeight,
        slashAnimate,
        slashTransition
    }
}
