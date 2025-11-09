export function tokenize(text) {
    // Simple whitespace tokenizer
    let splitText = text.match(/[^\p{Sentence_Terminal}\n]+[\p{Sentence_Terminal}]?/gu) || []
    return splitText
        .map(t => t.trim())
        .filter(t => t.length > 0)
}
