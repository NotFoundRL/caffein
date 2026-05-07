import { $ } from '../utils/dom.js';

const lines = [
  'Saved your progress 💾 the save file is confused but trying its best.',
  'The button is shy today 🥺 give it a second.',
  'CAIA made you a certificate 🧾 it is very small and very unserious.',
  'System update required: Coping With This™ 🫠',
  'Caffeine levels are giving "not enough" which is rude, honestly.',
  'Hobby check failed. You unlocked two new interests while reading this 💅',
  'Estimated time remaining: yes 💗 hope that helps.',
  'Nothing is wrong. This message is here for decoration.',
  'Loading your patience... [\u25a0\u25a0\u25a0\u25a0\u25a0\u25a0\u25a0\u25a1\u25a1\u25a1] 78%... stalled.',
  "Don't worry. This is going to plan. Not a good plan, but a plan.",
  "You got the 'Persistent' badge 🏷️ wear it quietly.",
  'Aura scan result: pink, loud, slightly dangerous ✨',
  'This is not broken. It is just in its flop era.',
  'Delusion levels detected. Honestly? kind of useful.',
  'The button said no because boundaries matter 🫶',
  'Your patience is buffering. The Wi-Fi is emotional.',
  'Not a bug. Just commitment issues in JavaScript.',
  'That attempt ate. The system refused to digest it.',
  'Current status: cute confusion with a tiny warning label 💗'
];

let index = 0;

export const CAIA = {
  lines,
  say(message) {
    const panel = $('#caia-panel');
    const text = $('#caia-text');
    if (!panel || !text) return;
    panel.classList.remove('is-quiet');
    text.textContent = message;
  },
  next() {
    const message = lines[index % lines.length];
    index += 1;
    this.say(message);
  },
  quiet() {
    const panel = $('#caia-panel');
    if (panel) panel.classList.add('is-quiet');
  }
};
