import { $, setStageHTML } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { CAIA } from '../systems/caia.js';
import { AudioSystem } from '../systems/audio.js';

export function init(GameState) {
  const controller = new AbortController();
  CAIA.say('Initializing Caffein Assistance Intelligence Agency...');

  setStageHTML(`
    <section class="stage-card dark stage-stack">
      <div>
        <p class="mono">CAFFEIN OS / diagnostic boot</p>
        <h1 class="glitch-text" data-text="CAFFEIN">CAFFEIN</h1>
      </div>
      <div id="boot-log" class="terminal-log" aria-live="polite"></div>
      <div class="fake-progress" aria-label="Boot progress"><span id="boot-bar"></span></div>
      <div id="boot-actions" class="stage-actions" hidden>
        <button id="start-game" class="btn" type="button">START</button>
      </div>
    </section>
  `);

  const logs = [
    '> Initializing CAIA v2.4.1...',
    '> Loading patience module... [FAILED]',
    '> Loading caffeine levels... [CRITICAL]',
    '> WARNING: User detected. Proceeding anyway.',
    '> System ready. Probably.'
  ];
  const log = $('#boot-log');
  const bar = $('#boot-bar');

  logs.forEach((line, index) => {
    managedTimeout(() => {
      const row = document.createElement('p');
      row.className = 'terminal-line';
      row.textContent = line;
      log.appendChild(row);
      bar.style.setProperty('--progress', `${Math.min(100, (index + 1) * 21)}%`);
    }, 650 + index * 820);
  });

  managedTimeout(() => {
    $('#boot-actions').hidden = false;
    CAIA.say('System ready. Probably.');
  }, 5900);

  $('#start-game').addEventListener('click', () => {
    AudioSystem.init({ assetFlags: window.CAFFEIN_ASSETS || {} });
    GameState.setPhase('phase1');
  }, { signal: controller.signal });

  return () => controller.abort();
}

export function cleanup() {}
