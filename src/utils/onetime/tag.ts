export const onetimeTag = (characters: string[]): string[] => {
    const { randomInt } = random()

    // 架空のHTMLタグを生成
    const tags = [
        'date',
        'now',
        'ymd',
        'timer',
        'num',
        'char',
        'computed',
        'calc',
        'h0',
        'h7',
        'h24',
        'preview',
        'success',
        'copy',
        'comment',
        'sample',
        'hoge',
        'test',
        '<>'
    ]
    const index = randomInt({ min: 0, max: tags.length })
    const tagCharacters = [`<${tags[index]}>`, ...characters, `</${tags[index]}>`]

    return tagCharacters
}
