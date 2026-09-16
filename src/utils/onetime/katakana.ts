export const onetimeKatakana = (characters: string[]): string[] => {
	const { randomInt } = random()
	const katakana = [
		['ｾﾞﾛ', 'ゼロ'],
		['ｲﾁ', 'イチ'],
		['ﾆｨ', 'ニィ'],
		['ｻﾝ', 'サン'],
		['ﾖﾝ', 'ヨン'],
		['ｺﾞ', 'ゴ'],
		['ﾛｸ', 'ロク'],
		['ﾅﾅ', 'ナナ'],
		['ﾊﾁ', 'ハチ'],
		['ｷｭｳ', 'キュウ'],
	]

	// 全て半角 | 全て全角 | ランダム
	const widthPattern = randomInt({ min: 0, max: 5 })
	const katakanaCharacters = characters.map((char) => {
		if (char === '/') return ''

		const i = Number(char)
		if (katakana[i]) {
			const length = katakana[i].length
			const isRandom = widthPattern >= length
			const j = isRandom ? randomInt({ min: 0, max: length }) : widthPattern
			return katakana[i][j]!
		} else {
			return ''
		}
	})
	return katakanaCharacters
}
