import type { CSSProperties } from 'vue'

interface Break {
	breakCharacters: string[]
	breakStyle: () => CSSProperties[]
}

export const onetimeBreak = (characters: string[]): Break => {
	const { randomDeci } = random()
	const breakCharacters = [characters.map((char) => `${char}\n`).join('')]
	const breakStyle = (): CSSProperties[] => {
		return [
			{
				whiteSpace: 'pre-wrap',
				lineHeight: randomDeci({ min: 1, max: 2.6 }),
				marginInline: '2em 0.5em'
			}
		]
	}
	return {
		breakCharacters,
		breakStyle
	}
}
