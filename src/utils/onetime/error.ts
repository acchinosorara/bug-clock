export const onetimeError = (): string[] => {
    const { randomInt } = random()

    // 架空のエラー文を生成
    const symbols = ['!', '?', '$', '&', '=', '#', '^']
    const i = randomInt({ min: 0, max: symbols.length })
    const errorText = [`${symbols[i]?.repeat(randomInt({ min: 2, max: 5 }))}ERROR`]

    return errorText
}
