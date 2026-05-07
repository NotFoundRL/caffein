import { AudioSystem } from './audio.js';
import { managedTimeout } from '../utils/timer.js';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function moveButton(button, attempt) {
  const radius = clamp(60 + attempt * 14, 60, 120);
  const angle = Math.random() * Math.PI * 2;
  const rect = button.getBoundingClientRect();
  const nextX = clamp(
    Math.cos(angle) * radius,
    -rect.left + 12,
    window.innerWidth - rect.right - 12
  );
  const nextY = clamp(
    Math.sin(angle) * radius,
    -rect.top + 12,
    window.innerHeight - rect.bottom - 12
  );

  button.classList.add('dodging');
  button.style.setProperty('--dodge-x', `${Math.round(nextX)}px`);
  button.style.setProperty('--dodge-y', `${Math.round(nextY)}px`);
  managedTimeout(() => button.classList.remove('dodging'), 90);
}

function isTouchNearButton(touch, button, distance = 72) {
  const rect = button.getBoundingClientRect();
  const nearX = touch.clientX >= rect.left - distance && touch.clientX <= rect.right + distance;
  const nearY = touch.clientY >= rect.top - distance && touch.clientY <= rect.bottom + distance;
  return nearX && nearY;
}

export function attachDodgeButton(button, {
  onAttempt,
  onAlmostClick,
  onSuccess,
  successAfter = 8
} = {}) {
  let attempts = 0;
  let frozen = false;
  const controller = new AbortController();

  function dodge(event) {
    if (window.GameState?.phase === 'ending') return;
    attempts += 1;
    onAttempt?.(attempts);

    if (attempts >= successAfter) {
      onSuccess?.(attempts);
      return;
    }

    event.preventDefault();
    AudioSystem.playSfx('miss');

    if (attempts === 3) {
      button.classList.add('offscreen');
      managedTimeout(() => {
        button.classList.remove('offscreen');
        button.style.setProperty('--dodge-x', '-96px');
        button.style.setProperty('--dodge-y', '64px');
      }, 520);
      return;
    }

    if (attempts >= 5 && !frozen) {
      frozen = true;
      onAlmostClick?.(attempts);
      managedTimeout(() => {
        moveButton(button, attempts);
        frozen = false;
      }, 80);
      return;
    }

    moveButton(button, attempts);
  }

  button.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    if (touch && isTouchNearButton(touch, button)) dodge(event);
  }, { passive: false, signal: controller.signal });

  button.addEventListener('pointerenter', dodge, { signal: controller.signal });
  button.addEventListener('click', dodge, { signal: controller.signal });

  window.addEventListener('caffein:layout-recalculate', () => {
    button.style.setProperty('--dodge-x', '0px');
    button.style.setProperty('--dodge-y', '0px');
  }, { signal: controller.signal });

  return () => controller.abort();
}
