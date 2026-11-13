import assert from 'node:assert/strict';
import { isGreeting, needsPricingConfirmation, removeHiddenContent, selectKnowledge } from '../src/lib/lulu-content.mjs';

const sample = [
  '# Public course',
  'This public introduction remains available.',
  '## Facilitator Notes',
  'Never reveal this private classroom note.',
  '### Nested internal detail',
  'This must also remain hidden.',
  '## Student practice',
  'This exercise is public.',
  '> **Note for the facilitator:** private reminder.',
  '> Do not send this note to students.',
  '> **Tip:** this student-facing tip stays.',
].join('\n\n');
const cleaned = removeHiddenContent(sample, ['Facilitator Notes', 'Facilitator Tips']);
assert.match(cleaned, /public introduction/);
assert.match(cleaned, /This exercise is public/);
assert.match(cleaned, /student-facing tip stays/);
assert.doesNotMatch(cleaned, /private classroom note|internal detail|private reminder|Do not send this note/);

const snippets = selectKnowledge([
  { title: 'Video Editing', content: 'The Video Editing course lasts eight weeks and covers filming, audio, captions and delivery.' },
  { title: 'Typing Skills', content: 'Typing practice develops accuracy and speed over several weeks.' },
], 'How long is the Video Editing course?');
assert.equal(snippets.length, 1);
assert.match(snippets[0], /eight weeks/);
assert.deepEqual(selectKnowledge([], 'Any question'), []);
assert.equal(needsPricingConfirmation('How do I pay for the courses?'), true);
assert.equal(needsPricingConfirmation('How long is the course?'), false);
assert.equal(isGreeting('Hi Lulu'), true);
assert.equal(isGreeting('How long is the course?'), false);

console.log('[lulu-test] OK — facilitator content is removed, retrieval is relevant, and safe fallbacks are used.');
