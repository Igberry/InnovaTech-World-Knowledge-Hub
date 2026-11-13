/**
 * @param {string} target
 * @param {string} typed
 * @param {number} elapsedSeconds
 */
export function measureTyping(target, typed, elapsedSeconds) {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds < 0) {
    throw new RangeError('Elapsed time must be a non-negative number of seconds.');
  }

  const targetCharacters = Array.from(target);
  const typedCharacters = Array.from(typed);
  let correctCharacters = 0;

  for (let index = 0; index < Math.min(targetCharacters.length, typedCharacters.length); index += 1) {
    if (targetCharacters[index] === typedCharacters[index]) correctCharacters += 1;
  }

  const wpm = elapsedSeconds === 0
    ? 0
    : Math.round((correctCharacters / 5) / (elapsedSeconds / 60));
  const accuracy = typedCharacters.length === 0
    ? 0
    : Math.round((correctCharacters / typedCharacters.length) * 1000) / 10;

  return {
    correctCharacters,
    totalTypedCharacters: typedCharacters.length,
    wpm,
    accuracy,
  };
}
