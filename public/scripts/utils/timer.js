const timerRegistry = new Map();

export function managedTimeout(fn, ms) {
  const id = window.setTimeout(() => {
    timerRegistry.delete(id);
    fn();
  }, ms);
  timerRegistry.set(id, 'timeout');
  return id;
}

export function managedInterval(fn, ms) {
  const id = window.setInterval(fn, ms);
  timerRegistry.set(id, 'interval');
  return id;
}

export function clearManagedTimer(id) {
  const type = timerRegistry.get(id);
  if (!type) return;
  if (type === 'interval') window.clearInterval(id);
  else window.clearTimeout(id);
  timerRegistry.delete(id);
}

export function clearAllTimers() {
  for (const [id, type] of timerRegistry.entries()) {
    if (type === 'interval') window.clearInterval(id);
    else window.clearTimeout(id);
  }
  timerRegistry.clear();
}
