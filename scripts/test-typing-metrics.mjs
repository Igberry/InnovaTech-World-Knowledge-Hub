import assert from 'node:assert/strict';
import { measureTyping } from '../src/lib/typing-metrics.mjs';

assert.deepEqual(measureTyping('hello', 'hello', 60), {
  correctCharacters: 5,
  totalTypedCharacters: 5,
  wpm: 1,
  accuracy: 100,
});

assert.deepEqual(measureTyping('abcde', 'abXdeZ', 60), {
  correctCharacters: 4,
  totalTypedCharacters: 6,
  wpm: 1,
  accuracy: 66.7,
});

assert.deepEqual(measureTyping('abc', '', 0), {
  correctCharacters: 0,
  totalTypedCharacters: 0,
  wpm: 0,
  accuracy: 0,
});

assert.throws(() => measureTyping('abc', 'abc', -1), RangeError);
console.log('Typing metrics tests passed.');
