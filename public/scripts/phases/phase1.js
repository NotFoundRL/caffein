import { $, setStageHTML, shuffle } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { CAIA } from '../systems/caia.js';
import { AudioSystem } from '../systems/audio.js';
import { fakeLag } from '../systems/lag.js';
import { Shake } from '../systems/shake.js';

const answers = [
  'Yes 😭 let me in already',
  'Obviously. Who else has this much patience? 💅',
  'It is me. Source: vibes ✨',
  'No but I support the drama 🫶'
];

function renderChoices(list) {
  const grid = $('#choice-grid');
  grid.innerHTML = '';
  for (const answer of list) {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = answer;
    grid.appendChild(button);
  }
}

export function init(GameState) {
  const controller = new AbortController();
  let attempts = 0;

  CAIA.say('Identity check started 💗 this is basically airport security but cuter.');
  setStageHTML(`
    <section class="stage-card stage-stack">
      <div>
        <p class="mono">Question 1 / definitely fair</p>
        <h2>ARe you sure you are CINA ?</h2>
        <p>Pick one. CAIA is judging the confidence, the posture, and the tiny attitude in your tap ✨</p>
      </div>
      <div id="choice-grid" class="choice-grid"></div>
      <div class="fake-progress" aria-label="Validation progress"><span id="validation-bar"></span></div>
      <p id="validation-message" class="mono"></p>
    </section>
  `);
  renderChoices(answers);

  $('#choice-grid').addEventListener('click', async (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    attempts += 1;
    AudioSystem.playSfx('popup');

    const bar = $('#validation-bar');
    const message = $('#validation-message');
    message.textContent = 'Checking the vibes...';
    bar.style.setProperty('--progress', '100%');

    managedTimeout(async () => {
      AudioSystem.playSfx('error');
      Shake.trigger(1);
      message.textContent = 'Nope 😭 the vibes said "try again bestie".';
      bar.style.setProperty('--progress', '0%');
      renderChoices(shuffle(answers));
      CAIA.say("It's okay, main character verification is stressful 😔 even the button is sweating.");

      if (attempts === 2) {
        await fakeLag(900);
        CAIA.next();
      }

      if (attempts >= 3) {
        GameState.setPhase('phase2');
      }
    }, 900);
  }, { signal: controller.signal });

  return () => controller.abort();
}

export function cleanup() {}
