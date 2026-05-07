import { clearAllTimers, managedTimeout } from './utils/timer.js';
import { setPhaseLabel } from './utils/dom.js';
import { AnimationSystem } from './systems/animation.js';
import { Popup } from './systems/popup.js';

const phaseOrder = ['phase0', 'phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'ending'];
const phaseLabels = {
  phase0: 'BOOT',
  phase1: 'PHASE 1',
  phase2: 'PHASE 2',
  phase3: 'PHASE 3',
  phase4: 'PHASE 4',
  phase5: 'PHASE 5',
  ending: 'ENDING'
};
const phaseTimeouts = {
  phase0: 12000,
  phase1: 45000,
  phase2: 90000,
  phase3: 120000,
  phase4: 30000,
  phase5: 8000
};

export const GameState = {
  phase: null,
  flags: {},
  phaseModules: new Map(),
  cleanupCurrent: null,
  locked: false,

  registerPhase(name, module) {
    this.phaseModules.set(name, module);
  },

  start() {
    this.setPhase('phase0');
  },

  setFlag(key, value) {
    this.flags[key] = value;
    if (key === 'reducedEffects' && value) document.body.classList.add('reduced-effects');
  },

  getFlag(key) {
    return this.flags[key];
  },

  setPhase(nextPhase) {
    if (this.locked && nextPhase !== 'ending') return;

    if (nextPhase === 'ending') {
      this.locked = true;
      clearAllTimers();
      Popup.clear();
      AnimationSystem.clearChaos();
      document.body.classList.add('phase-ending');
    } else {
      clearAllTimers();
      Popup.clear();
      document.body.classList.remove('phase-ending', 'phase-blackout', 'phase-chaos');
    }

    if (this.cleanupCurrent) {
      this.cleanupCurrent();
      this.cleanupCurrent = null;
    }

    AnimationSystem.hardReset();
    this.phase = nextPhase;
    window.GameState = this;
    setPhaseLabel(phaseLabels[nextPhase] || nextPhase.toUpperCase());

    const module = this.phaseModules.get(nextPhase);
    if (!module) throw new Error(`Phase not registered: ${nextPhase}`);

    const cleanup = module.init?.(this);
    if (typeof cleanup === 'function') this.cleanupCurrent = cleanup;

    if (phaseTimeouts[nextPhase]) {
      managedTimeout(() => this.forceAdvance(), phaseTimeouts[nextPhase]);
    }
  },

  forceAdvance() {
    const current = phaseOrder.indexOf(this.phase);
    const next = phaseOrder[current + 1];
    if (next) this.setPhase(next);
  },

  emergencyReset() {
    clearAllTimers();
    Popup.clear();
    AnimationSystem.clearChaos();
    document.body.classList.remove('phase-ending', 'phase-blackout', 'phase-chaos');
    window.location.reload();
  }
};
