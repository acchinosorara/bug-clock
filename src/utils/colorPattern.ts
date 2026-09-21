export const colorPattern = (): string[][] => {
	const white = 'white'
	const colors = [
		// 補色
		['comp-orange', 'comp-blue', white],
		['comp-pink', 'comp-green', white],

		// 近似色
		['sim-red', 'sim-yellow', white],
		['sim-yellow', 'sim-green', white],
	]
	return colors
}
