import { clearManagedTimer, managedInterval, managedTimeout } from '../utils/timer.js';

let context = null;
let masterGain = null;
let endingBuffer = null;
let endingSource = null;
let fallbackAudio = null;
let loadingPromise = null;
let missingSong = false;

function getContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!context) {
    context = new AudioContextClass();
    masterGain = context.createGain();
    masterGain.gain.value = 0.65;
    masterGain.connect(context.destination);
  }
  return context;
}

function tone({ frequency = 220, duration = 0.12, type = 'sine', gain = 0.08, slideTo = null }) {
  const ctx = getContext();
  if (!ctx || !masterGain) return;

  const oscillator = ctx.createOscillator();
  const localGain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  if (slideTo) oscillator.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + duration);
  localGain.gain.setValueAtTime(Math.max(gain, 0.001), ctx.currentTime);
  localGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  oscillator.connect(localGain);
  localGain.connect(masterGain);
  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);
}

export const AudioSystem = {
  init({ assetFlags = {} } = {}) {
    missingSong = Boolean(assetFlags.missingSong);
    const ctx = getContext();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    if (!missingSong) this.loadEndingMusic();
  },
  loadEndingMusic() {
    if (missingSong || endingBuffer || loadingPromise) return loadingPromise;
    const ctx = getContext();
    if (!ctx) {
      window.GameState?.setFlag('audioFallback', true);
      return null;
    }

    loadingPromise = fetch('/assets/song.mp3')
      .then((response) => {
        if (!response.ok) throw new Error('song missing');
        return response.arrayBuffer();
      })
      .then((buffer) => ctx.decodeAudioData(buffer))
      .then((decoded) => {
        endingBuffer = decoded;
        return decoded;
      })
      .catch(() => {
        missingSong = true;
        window.GameState?.setFlag('missingSong', true);
      });
    return loadingPromise;
  },
  playSfx(name) {
    if (missingSong && !context) getContext();
    if (context?.state === 'suspended') context.resume();

    const map = {
      miss: () => tone({ frequency: 460, duration: 0.08, type: 'square', gain: 0.055, slideTo: 680 }),
      error: () => tone({ frequency: 86, duration: 0.4, type: 'sawtooth', gain: 0.12, slideTo: 62 }),
      lag: () => {
        tone({ frequency: 420, duration: 0.16, type: 'square', gain: 0.045, slideTo: 110 });
        managedTimeout(() => tone({ frequency: 760, duration: 0.12, type: 'sawtooth', gain: 0.035 }), 90);
      },
      rewind: () => tone({ frequency: 360, duration: 0.3, type: 'triangle', gain: 0.075, slideTo: 170 }),
      popup: () => tone({ frequency: 820, duration: 0.15, type: 'sine', gain: 0.055 }),
      alert: () => {
        tone({ frequency: 120, duration: 0.7, type: 'sawtooth', gain: 0.16, slideTo: 48 });
        managedTimeout(() => tone({ frequency: 55, duration: 0.42, type: 'square', gain: 0.08 }), 90);
      }
    };
    map[name]?.();
  },
  playEndingMusic() {
    if (missingSong) return false;
    const ctx = getContext();
    if (!ctx) return this.playFallbackAudio();

    if (!endingBuffer) {
      this.loadEndingMusic();
      return false;
    }

    if (ctx.state === 'suspended') ctx.resume();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.85, ctx.currentTime + 2);

    endingSource = ctx.createBufferSource();
    endingSource.buffer = endingBuffer;
    endingSource.connect(gain);
    gain.connect(ctx.destination);
    endingSource.start();

    window.addEventListener('beforeunload', () => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      } catch (error) {
        // The context can already be closed during navigation.
      }
    }, { once: true });
    return true;
  },
  playFallbackAudio() {
    fallbackAudio = new Audio('/assets/song.mp3');
    fallbackAudio.autoplay = true;
    fallbackAudio.muted = false;
    fallbackAudio.volume = 0;
    fallbackAudio.play().then(() => {
      let volume = 0.001;
      const ramp = managedInterval(() => {
        volume = Math.min(0.85, volume * 1.22 + 0.01);
        fallbackAudio.volume = volume;
        if (volume >= 0.85) clearManagedTimer(ramp);
      }, 80);
    }).catch(() => {
      missingSong = true;
      window.GameState?.setFlag('audioFallback', true);
    });
    return true;
  },
  suspend() {
    if (context?.state === 'running') context.suspend();
  },
  resume() {
    if (context?.state === 'suspended') context.resume();
  },
  hasMusic() {
    return !missingSong;
  }
};
