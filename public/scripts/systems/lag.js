import { managedTimeout } from '../utils/timer.js';
import { AudioSystem } from './audio.js';

export function fakeLag(ms = 1200) {
  const overlay = document.querySelector('#lag-overlay');
  const bar = document.querySelector('#lag-bar');
  const percent = document.querySelector('#lag-percent');
  if (!overlay || !bar || !percent) return Promise.resolve();

  document.body.classList.add('ui-frozen');
  overlay.hidden = false;
  bar.style.setProperty('--progress', '0%');
  percent.textContent = '0%';
  AudioSystem.playSfx('lag');

  const steps = [
    [0.16, 17],
    [0.32, 47],
    [0.56, 31],
    [0.74, 78],
    [0.9, 97],
    [1, 100]
  ];

  return new Promise((resolve) => {
    for (const [ratio, value] of steps) {
      managedTimeout(() => {
        bar.style.setProperty('--progress', `${value}%`);
        percent.textContent = `${value}%`;
      }, Math.floor(ms * ratio));
    }

    managedTimeout(() => {
      overlay.hidden = true;
      document.body.classList.remove('ui-frozen');
      resolve();
    }, ms);
  });
}
