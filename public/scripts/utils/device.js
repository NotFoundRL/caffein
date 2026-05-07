import { managedTimeout } from './timer.js';

export function detectLowEnd() {
  return navigator.hardwareConcurrency <= 2
    || (navigator.deviceMemory && navigator.deviceMemory < 2);
}

export function setViewportZoom(enabled) {
  const meta = document.querySelector('#viewport-meta');
  if (!meta) return;
  meta.setAttribute(
    'content',
    enabled
      ? 'width=device-width, initial-scale=1.0'
      : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  );
}

export function setupEmergencyReset(GameState) {
  const taps = [];
  document.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    if (!touch || touch.clientX > 64 || touch.clientY > 64) return;

    const now = Date.now();
    taps.push(now);
    while (taps.length && now - taps[0] > 2000) taps.shift();
    if (taps.length >= 5) GameState.emergencyReset();
  }, { passive: true });
}

export function setupVisibility(AudioSystem, GameState) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      AudioSystem.suspend();
      document.body.classList.add('tab-hidden');
      return;
    }

    if (GameState.phase !== 'ending') {
      AudioSystem.resume();
      document.body.classList.remove('tab-hidden');
    }
  });
}

export function setupResizeRecovery() {
  let pending = null;
  window.addEventListener('resize', () => {
    if (pending) window.clearTimeout(pending);
    pending = managedTimeout(() => {
      window.dispatchEvent(new CustomEvent('caffein:layout-recalculate'));
    }, 200);
  });
}
