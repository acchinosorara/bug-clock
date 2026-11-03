export const onetimeError = (): string[] => {
	const { randomInt } = random()

	const errors = [
		'エラーが発生しました',
		'接続に失敗しました',
		'日付に問題があります',
		'無効な日付です',
		'データがありません',
		'アクセス権がありません'
	]
	const i = randomInt({ min: 0, max: errors.length })
	const characters = errors[i] ? [...errors[i]] : ['']
	const garbled: Record<string, string[]> = {
		'エ': ['工', 'ヱ'],
		'ー': ['─', '-', '～', '＿'],
		'が': ['か”', 'か"'],
		'発': ['發', '癸', '溌'],
		'し': ['レ', 'L', '└'],
		'た': ['ﾅ=', '†=', 'ﾅ〟'],
		'続': ['繞'],
		'に': ['lこ', '（こ', '［こ'],
		'失': ['矢'],
		'日': ['曰'],
		'付': ['ｲ寸'],
		'問': ['間', '閂', '閊'],
		'効': ['劾', '交ｶ'],
		'で': ['て”', 'て"'],
		'デ': ['〒”', '〒"'],
		'タ': ['夕', '多', '夂'],
		'り': ['‘ﾉ', '‘)'],
		'せ': ['世', '也'],
		'ア': ['了'],
		'ク': ['ﾜ', '勹'],
		'セ': ['七']
	}

	const errorText = characters.map((char) => {
		const garb = garbled[char]
		if (!garb || isTrigger(2)) return char
		return garb[randomInt({ min: 0, max: garb.length })] ?? char
	})

	return errorText
}
