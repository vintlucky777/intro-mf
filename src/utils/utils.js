// Word formatting function. Spells `1 word`, but `2 words`.
export function pluralize(word, count) {
  return word ? `${word}${count === 1 || count === -1 ? '' : 's'}` : null;
}
