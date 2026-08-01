const colors = colorPattern()
type Color = (typeof colors)[number]
interface Classes {
    colorClassNames: `color-${Color[number]}`[][]
    bgClassNames: `bg-${Color[number]}`[][]
    borderClassNames: `border-${Color[number]}`[][]
    invertClassNames: string[]
}

export type BorderClassNames = Classes['borderClassNames'][number]

export const setCommonClass = (): Classes => {
    const classNames = <T extends string>(prop: T): `${T}-${Color[number]}`[][] => {
        return colors.map((pattern) =>
            pattern.map((color) => `${prop}-${color}` as `${T}-${Color[number]}`)
        )
    }

    const colorClassNames = classNames('color')
    const bgClassNames = classNames('bg')
    const borderClassNames = classNames('border')
    const invertClassNames = [`invert-x`, `invert-y`, `invert-xy`]

    return {
        colorClassNames,
        bgClassNames,
        borderClassNames,
        invertClassNames
    }
}
