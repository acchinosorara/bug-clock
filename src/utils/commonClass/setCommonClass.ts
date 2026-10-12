interface Classes {
	invertClassNames: string[]
}

export const setCommonClass = (): Classes => {
	const invertClassNames = [`invert-x`, `invert-y`, `invert-xy`]

	return {
		invertClassNames,
	}
}
