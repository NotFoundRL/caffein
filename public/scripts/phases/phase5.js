import { setStageHTML } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { CAIA } from '../systems/caia.js';
import { AnimationSystem } from '../systems/animation.js';

export function init(GameState) {
  document.body.classList.add('phase-blackout');
  CAIA.quiet();
  setStageHTML(`
    <section class="blackout">
      <p>Okay. For real now.</p>
    </section>
  `);

  managedTimeout(() => {
    AnimationSystem.whiteFadeIn();
  }, 3000);

  managedTimeout(() => {
    GameState.setPhase('ending');
  }, 3800);

  return () => {
    document.body.classList.remove('phase-blackout');
  };
}

export function cleanup() {}
