export const onetimeRome = (characters: string[]): string[] => {
	const rome = ['O', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
	const romeCharacters = characters.map((char) => {
		return char === '/' ? '/' : (rome[Number(char)] ?? '')
	})
	return romeCharacters
}
