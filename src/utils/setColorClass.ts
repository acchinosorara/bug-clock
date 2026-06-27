const colors = ['orange', 'blue', 'white'] as const
type Color = typeof colors[number]
type ColorClass = {
    colorClassNames: `color-${Color}`[]
    bgClassNames: `bg-${Color}`[]
    borderClassNames: `border-${Color}`[]
}

export type BorderClassNames = ColorClass['borderClassNames'][number]

export const setColorClass = (): ColorClass => {
    const classNames = <T extends string>(prop: T): `${T}-${Color}`[] => {
        return colors.map(color => `${prop}-${color}` as `${T}-${Color}`)
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