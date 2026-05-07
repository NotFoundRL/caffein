let lastShake = 0;

export const Shake = {
  trigger(level = 1) {
    const now = Date.now();
    if (now - lastShake < 800) return;
    lastShake = now;

    const wrapper = document.querySelector('#app-wrapper');
    if (!wrapper) return;

    const adjusted = document.body.classList.contains('reduced-effects')
      ? Math.max(1, level - 1)
      : level;
    const className = `shake-${adjusted}`;

    wrapper.classList.remove('shake-1', 'shake-2', 'shake-3');
    void wrapper.offsetHeight;
    wrapper.classList.add(className);
    wrapper.addEventListener('animationend', () => {
      wrapper.classList.remove(className);
    }, { once: true });
  }
};
