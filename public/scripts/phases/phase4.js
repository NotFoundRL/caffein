import { $, setStageHTML } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { CAIA } from '../systems/caia.js';
import { Shake } from '../systems/shake.js';
import { AudioSystem } from '../systems/audio.js';

function addConfetti() {
  const field = document.createElement('div');
  field.className = 'confetti-field';
  for (let i = 0; i < 28; i += 1) {
    const bit = document.createElement('span');
    bit.className = 'confetti-bit';
    bit.style.setProperty('--x', `${Math.floor(Math.random() * 100)}%`);
    bit.style.setProperty('--fall', `${1400 + Math.floor(Math.random() * 1400)}ms`);
    bit.style.background = i % 2 ? '#FF6B9D' : '#5FFFD4';
    field.appendChild(bit);
  }
  $('#game-stage').appendChild(field);
}

export function init(GameState) {
  const controller = new AbortController();
  CAIA.say('Okay wait... you actually made it? 😭 that is kind of iconic.');
  setStageHTML(`
    <section class="stage-card stage-stack center">
      <div>
        <p class="mono">reward moment / totally real</p>
        <h2>You did it. Somehow 💗</h2>
        <p>Here is some tiny confetti because apparently persistence works now.</p>
      </div>
      <div class="stage-actions" style="justify-content:center;">
        <button id="claim-reward" class="btn" type="button">CLAIM YOUR REWARD \u2192</button>
      </div>
    </section>
  `);
  addConfetti();

  $('#claim-reward').addEventListener('click', () => {
    CAIA.say('Everything is fine 💗 ignore the tiny feeling that it is absolutely not fine.');
    setStageHTML(`
      <section class="stage-card dark stage-stack center">
        <h1 class="glitch-text" data-text="Just kidding lol">Just kidding lol</h1>
      </section>
    `);

    const overlay = document.createElement('div');
    overlay.className = 'glitch-overlay';
    document.body.appendChild(overlay);
    Shake.trigger(3);
    AudioSystem.playSfx('alert');

    managedTimeout(() => {
      GameState.setPhase('phase5');
    }, 2500);
  }, { signal: controller.signal });

  return () => controller.abort();
}

export function cleanup() {}
