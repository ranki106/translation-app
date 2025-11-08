export function tokenize(text) {
    // Simple whitespace tokenizer
    let splitText = text.match(/[^.?!。！？\n]+[.?!。！？]?/g) || []
    console.log('Tokenized Text:', splitText)
    return splitText
        .map(t => t.trim())
        .filter(t => t.length > 0)
}
