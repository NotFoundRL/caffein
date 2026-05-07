import { $ } from '../utils/dom.js';
import { managedTimeout } from '../utils/timer.js';
import { setViewportZoom } from '../utils/device.js';
import { CAIA } from '../systems/caia.js';
import { AudioSystem } from '../systems/audio.js';
import { AnimationSystem } from '../systems/animation.js';

export function init(GameState) {
  const scene = $('#ending-scene');
  const fallbackNote = $('#ending-fallback-note');
  const visualizer = $('#silence-visualizer');
  const missingPfp = window.CAFFEIN_ASSETS?.missingPfp || GameState.getFlag('missingPfp');
  const missingSong = window.CAFFEIN_ASSETS?.missingSong || GameState.getFlag('missingSong');

  setViewportZoom(true);
  CAIA.quiet();
  AnimationSystem.whiteFadeIn();

  if (missingPfp) scene.classList.add('missing-pfp');
  if (missingSong) {
    fallbackNote.hidden = false;
    visualizer.hidden = false;
  }

  managedTimeout(() => {
    const wrapper = $('#app-wrapper');
    if (wrapper) wrapper.style.opacity = '0';
  }, 400);

  managedTimeout(() => {
    scene.hidden = false;
    scene.setAttribute('aria-hidden', 'false');
    scene.classList.add('is-visible');
  }, 600);

  managedTimeout(() => {
    AnimationSystem.whiteFadeOut();
  }, 800);

  managedTimeout(() => {
    const played = AudioSystem.playEndingMusic();
    if (!played || missingSong) {
      GameState.setFlag('missingSong', true);
      fallbackNote.hidden = false;
      visualizer.hidden = false;
    }
  }, 1200);

  managedTimeout(() => {
    scene.classList.add('revealing');
  }, 2000);

  return () => {};
}

export function cleanup() {}
