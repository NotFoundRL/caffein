import { $, setStageHTML } from '../utils/dom.js';
import { managedInterval, managedTimeout, clearManagedTimer } from '../utils/timer.js';
import { attachDodgeButton } from '../systems/dodge.js';
import { CAIA } from '../systems/caia.js';
import { Popup } from '../systems/popup.js';
import { Shake } from '../systems/shake.js';

function openSessionWarning() {
  const popup = Popup.warning({
    title: '\u26a0 SYSTEM NOTICE #4471-B',
    body: 'Patience module is wobbling 🫠 please breathe, blink, maybe touch grass. Status: still your problem.',
    duration: 16000
  });
  if (!popup) return;

  const countdown = document.createElement('p');
  countdown.className = 'mono';
  countdown.textContent = 'Session expires in 3:00';
  popup.appendChild(countdown);

  let seconds = 180;
  const interval = managedInterval(() => {
    seconds -= 1;
    if (seconds === 167) seconds = 164;
    if (seconds === 160) seconds = 180;
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, '0');
    countdown.textContent = `Session expires in ${minutes}:${rest}`;
  }, 1000);

  managedTimeout(() => clearManagedTimer(interval), 16000);
}

export function init(GameState) {
  let detachDodge = null;
  CAIA.say('The button is shy today 🥺 give her space. She is protecting her peace.');

  setStageHTML(`
    <section class="stage-card stage-stack center">
      <div>
        <p class="mono">Interaction integrity check</p>
        <h2>Press the CONFIRM button to continue.</h2>
        <p>No tricks are being disclosed right now. Transparency is still in beta, sorry 💌</p>
      </div>
      <div class="stage-actions center" style="justify-content:center; min-height: 8rem;">
        <button id="confirm-button" class="btn" type="button">CONFIRM</button>
      </div>
      <p id="attempt-readout" class="mono">Attempts: 0</p>
    </section>
  `);

  managedTimeout(openSessionWarning, 1800);

  detachDodge = attachDodgeButton($('#confirm-button'), {
    successAfter: 8,
    onAttempt(attempts) {
      $('#attempt-readout').textContent = `Attempts: ${attempts}`;
      if (attempts === 1) CAIA.say('Nice try 😭 confidence detected, success not detected.');
      if (attempts === 4) {
        Popup.achievement("You tried 4 times. That's honestly very main character of you 💅");
        CAIA.say("Persistent badge unlocked 🏷️ not a compliment, but kind of iconic.");
      }
      if (attempts === 5) CAIA.say("CAIA made you a certificate 🧾 it is tiny and a little embarrassing.");
      if (attempts > 5) Shake.trigger(1);
    },
    onAlmostClick() {
      CAIA.say('It froze because it trusted you for one second 🥲 huge mistake.');
    },
    onSuccess() {
      CAIA.say('Fineee, accepted 💗 the button chose personal growth.');
      GameState.setPhase('phase3');
    }
  });

  return () => detachDodge?.();
}

export function cleanup() {}
