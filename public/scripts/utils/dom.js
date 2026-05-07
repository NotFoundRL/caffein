export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function setStageHTML(html) {
  const stage = $('#game-stage');
  stage.innerHTML = html;
  return stage;
}

export function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function setPhaseLabel(label) {
  const phaseLabel = $('#phase-label');
  if (phaseLabel) phaseLabel.textContent = label;
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function safeRemove(element) {
  if (element && element.parentNode) element.parentNode.removeChild(element);
}

export function createAbortController() {
  return new AbortController();
}
