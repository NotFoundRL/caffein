import { makeElement, safeRemove } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { AudioSystem } from './audio.js';

const stack = [];
const positions = [
  { top: '6rem', left: '50%', transform: 'translateX(-50%)', sx: '0', sy: '-24px' },
  { bottom: '7rem', left: '1rem', sx: '-28px', sy: '18px' },
  { top: '42%', right: '-0.5rem', sx: '34px', sy: '0' }
];

function maxDepth() {
  return document.body.classList.contains('reduced-effects') ? 1 : 3;
}

function overflow() {
  const root = document.querySelector('#popup-root');
  root.innerHTML = '';
  stack.length = 0;
  const popup = buildPopup({
    title: 'POPUP MANAGER HAS CRASHED',
    body: 'A designed failure has occurred. Please admire the restraint.'
  });
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  root.appendChild(popup);
  stack.push(popup);
}

function buildPopup({ title, body, warning = false }) {
  const popup = makeElement('section', `popup${warning ? ' warning-modal' : ''}`);
  popup.setAttribute('role', warning ? 'alertdialog' : 'status');
  const heading = makeElement('h3', '', title);
  const text = makeElement('p', '', body);
  popup.append(heading, text);
  return popup;
}

export const Popup = {
  show({ title, body, duration = 5200, warning = false } = {}) {
    if (stack.length >= maxDepth()) {
      overflow();
      return null;
    }

    const root = document.querySelector('#popup-root');
    const popup = buildPopup({ title, body, warning });
    const position = positions[stack.length % positions.length];
    Object.assign(popup.style, position);
    popup.style.setProperty('--popup-start-x', position.sx || '0');
    popup.style.setProperty('--popup-start-y', position.sy || '-16px');
    root.appendChild(popup);
    stack.push(popup);
    AudioSystem.playSfx(warning ? 'error' : 'popup');

    if (duration) {
      managedTimeout(() => this.dismiss(popup), duration);
    }
    return popup;
  },
  warning({ title, body, duration = 7000 }) {
    return this.show({ title, body, duration, warning: true });
  },
  achievement(body) {
    return this.show({
      title: '\ud83c\udfc6 Persistence Trophy',
      body,
      duration: 4600
    });
  },
  dismiss(popup) {
    const index = stack.indexOf(popup);
    if (index >= 0) stack.splice(index, 1);
    safeRemove(popup);
  },
  clear() {
    stack.splice(0).forEach(safeRemove);
  }
};
