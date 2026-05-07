import { safeRemove } from '../utils/dom.js';

export const AnimationSystem = {
  hardReset() {
    const wrapper = document.querySelector('#app-wrapper');
    if (!wrapper) return;
    wrapper.classList.remove('shake-1', 'shake-2', 'shake-3');
    void wrapper.offsetHeight;
  },
  clearChaos() {
    document.body.classList.remove('phase-chaos', 'phase-blackout');
    const wrapper = document.querySelector('#app-wrapper');
    wrapper?.classList.remove('shake-1', 'shake-2', 'shake-3');
    document.querySelectorAll('.glitch-overlay, .phone-call').forEach(safeRemove);
  },
  whiteFadeIn() {
    const overlay = document.querySelector('#white-transition');
    overlay.classList.remove('fade-out');
    void overlay.offsetHeight;
    overlay.classList.add('fade-in');
  },
  whiteFadeOut() {
    const overlay = document.querySelector('#white-transition');
    overlay.classList.remove('fade-in');
    void overlay.offsetHeight;
    overlay.classList.add('fade-out');
  }
};
