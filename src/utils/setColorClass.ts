const colors = colorPattern()
type Color = (typeof colors)[number]
interface ColorClass {
    colorClassNames: `color-${Color[number]}`[][]
    bgClassNames: `bg-${Color[number]}`[][]
    borderClassNames: `border-${Color[number]}`[][]
}

export type BorderClassNames = ColorClass['borderClassNames'][number]

export const setColorClass = (): ColorClass => {
    const classNames = <T extends string>(prop: T): `${T}-${Color[number]}`[][] => {
        return colors.map((pattern) =>
            pattern.map((color) => `${prop}-${color}` as `${T}-${Color[number]}`)
        )
    }

    const colorClassNames = classNames('color')
    const bgClassNames = classNames('bg')
    const borderClassNames = classNames('border')

    return {
        colorClassNames,
        bgClassNames,
        borderClassNames
    }
}
