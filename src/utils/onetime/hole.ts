import type { CSSProperties } from 'vue'

export const onetimeHole = (characters: string[]): CSSProperties[] => {
	const { randomInt } = random()
	const polygons = [
		'none',
		'0 0, 50% 0, 50% 100%, 0 100%',
		'50% 0, 100% 0, 100% 100%, 50% 100%',
		'0 0, 100% 0, 100% 50%, 0 50%',
		'0 50%, 100% 50%, 100% 100%, 0 100%',
		'25% 0, 75% 0, 75% 100%, 25% 100%',
		'0 25%, 100% 25%, 100% 75%, 0 75%',
		'0 0, 100% 0, 100% 50%, 50% 50%, 50% 100%, 0 100%',
		'0 0, 100% 0, 100% 100%, 50% 100%, 50% 50%, 0 50%',
		'50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%',
		'0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%'
	]

	const holeStyles = (): CSSProperties[] => {
		const styles = characters.map(() => {
			const i = randomInt({ min: 0, max: polygons.length })
			return {
				clipPath: `polygon(${polygons[i]})`
			}
		})
		return styles
	}

	return holeStyles()
}
