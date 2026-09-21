export const onetimeTag = (characters: string[]): string[] => {
	const { randomInt } = random()

	// 架空のHTMLタグを生成
	const tags = [
		'date',
		'now',
		'timer',
		'number',
		'program',
		'preview',
		'sample',
		'test',
		'...',
		'<>',
	]
	const index = randomInt({ min: 0, max: tags.length })
	const tagCharacters = [`<${tags[index]}>`, ...characters, `</${tags[index]}>`]

	return tagCharacters
}
