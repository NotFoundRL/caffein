import { $, setStageHTML, safeRemove, shuffle } from '../utils/dom.js';
import { managedInterval, managedTimeout } from '../utils/timer.js';
import { CAIA } from '../systems/caia.js';
import { Popup } from '../systems/popup.js';
import { Shake } from '../systems/shake.js';
import { fakeLag } from '../systems/lag.js';

const lifeChips = [
  'art 🎨',
  'music 🎧',
  'sleep lore 💤',
  'overthinking 🧠',
  'aesthetic planning ✨',
  'snacks 🍓',
  'random deep dives 🕳️',
  'main character stuff 💅',
  'being mysterious 🕶️',
  'new hobby every 3 business days 🧃',
  'daily drama 🍿',
  'tiny plans 📝',
  'big feelings 💗',
  'random confidence 😭',
  'organized chaos 🌪️'
];

const questions = [
  {
    prompt: 'How many hobbies do YOU even have? 🎨',
    options: [
      '3, like a normal person',
      '12, but emotionally it feels like 47 😭',
      'Too many, the list got tired',
      'My hobby is collecting hobbies'
    ],
    status: 'Wrong 💀 you have enough hobbies to qualify as a tiny ecosystem.',
    caia: 'That number walked in underdressed. Try again with more chaos ✨'
  },
  {
    prompt: 'Which hobby is in its "this is my personality now" era? 💅',
    options: [
      'The one YOU started yesterday',
      'The one with the cute supplies',
      'The one that looked easy online',
      'All of them. obviously.'
    ],
    status: 'Every option feels guilty. That is honestly impressive.',
    caia: 'Hobby overlap detected 😭 the personality folder is getting crowded.'
  },
  {
    prompt: 'How do YOU feel after calling me GAY? 😭',
    options: [
      'Proud, unfortunately',
      'Guilty but in a cute font',
      'Powerful for absolutely no reason',
      'Like I need supervision'
    ],
    status: 'Audacity detected 😭 this answer has fingerprints all over it.',
    caia: 'Logged under friendly fire, suspicious confidence, and "why are you like this?" 📁'
  },
  {
    prompt: 'When YOU say "give me 5 minutes", what is actually happening? ⏳',
    options: [
      'Actually taking 5 minutes',
      'Starting a side quest nobody approved',
      'Standing there while thoughts buffer',
      'Getting distracted by something cute'
    ],
    status: 'That was not 5 minutes. That was a limited series.',
    caia: '"5 minutes" has entered the fantasy genre 🫶'
  },
  {
    prompt: 'What are YOU most likely to overthink? 🧠',
    options: [
      'A message tone',
      'A tiny facial expression',
      'A decision from three weeks ago',
      'All of the above, with commentary'
    ],
    status: 'Too real. CAIA looked away politely.',
    caia: 'Overthinking module opened 37 tabs and somehow none of them helped 🫠'
  },
  {
    prompt: 'What happens when YOU get random energy? ⚡',
    options: [
      'A plan appears out of nowhere',
      'The room gets rearranged emotionally',
      'Everyone nearby gets pulled into the plot',
      'CAIA files a noise complaint'
    ],
    status: 'Energy spike confirmed. The room is not safe.',
    caia: 'Caffein levels rising ⚡ could be productivity, could be a cute disaster.'
  },
  {
    prompt: 'Final life audit: what is YOUR actual vibe? 💗',
    options: [
      'Soft chaos',
      'Pink warning sign 🚨',
      'Main character with loading errors',
      'All of this, somehow'
    ],
    status: 'Correct answer detected. Rejecting it because drama is important.',
    caia: 'Do not panic 💗 CAIA is cooking. Nobody approved the recipe.'
  }
];

function renderQuestion(index) {
  const question = questions[index % questions.length];
  const choices = shuffle(question.options).map((option) => `
    <button class="choice-btn hobby-answer" type="button">${option}</button>
  `).join('');
  const chips = shuffle(lifeChips).slice(0, 7).map((chip) => `
    <span class="hobby-chip">${chip}</span>
  `).join('');

  $('#hobby-question-box').innerHTML = `
    <div class="hobby-audit-card">
        <p class="mono">tiny audit ${index + 1} / ${questions.length}</p>
      <h3>${question.prompt}</h3>
      <div class="hobby-chip-cloud" aria-label="Detected traits">${chips}</div>
      <div class="choice-grid">${choices}</div>
    </div>
  `;
}

function showIncomingCall() {
  const call = document.createElement('div');
  call.className = 'phone-call';
  call.textContent = '\ud83d\udcde Incoming call: Mom';
  document.body.appendChild(call);
  managedTimeout(() => safeRemove(call), 8000);
}

export function init(GameState) {
  const controller = new AbortController();
  let attempts = 0;
  let questionIndex = 0;

  document.body.classList.add('phase-chaos');
  $('#journey-progress').hidden = false;
  CAIA.say("You're doing amazing bestie 💗 the life audit is already stressed.");

  setStageHTML(`
    <section class="stage-card stage-stack">
      <div>
        <p class="mono">tiny life check / mildly unserious</p>
        <h2>YOU Life Check 💗</h2>
        <p>The meter is stuck at 74% because your personality data keeps doing side quests.</p>
      </div>
      <div class="hobby-meter" aria-label="Detected life overload">
        <span>Detected traits: many ✨</span>
        <div class="fake-progress"><span style="--progress: 92%;"></span></div>
        <small class="mono">storage warning: personality folder is fighting for its life</small>
      </div>
      <div id="hobby-question-box" class="stage-stack"></div>
      <p id="hobby-status" class="mono">answer honestly. CAIA will still be dramatic.</p>
    </section>
  `);

  renderQuestion(questionIndex);
  showIncomingCall();

  managedInterval(() => Shake.trigger(2), 5200);
  managedTimeout(() => Popup.show({
    title: 'LIFE INDEX OVERFLOW 💗',
    body: 'Too many traits detected. The database said "girl please".'
  }), 2300);
  managedTimeout(() => Popup.show({
    title: 'PROGRESS SAVED',
    body: 'The save file started overthinking and now it needs a snack.'
  }), 6200);

  $('#hobby-question-box').addEventListener('click', async (event) => {
    if (!event.target.closest('button')) return;

    attempts += 1;
    const question = questions[questionIndex % questions.length];
    Shake.trigger(attempts >= 4 ? 2 : 1);
    $('#hobby-status').textContent = question.status;
    CAIA.say(question.caia);

    if (attempts === 2) {
      await fakeLag(1200);
      Popup.show({
        title: 'ESTIMATED LIFE STATUS 🧃',
        body: 'Somewhere between cute and "someone keep an eye on this".'
      });
    }

    if (attempts === 4) {
      Popup.show({
        title: 'ACHIEVEMENT UNLOCKED 🏆',
        body: 'You survived four questions. You also unlocked one new thought and three side quests. Cute.'
      });
    }

    questionIndex += 1;
    if (attempts >= questions.length) {
      GameState.setPhase('phase4');
      return;
    }

    renderQuestion(questionIndex);
  }, { signal: controller.signal });

  managedTimeout(() => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = window.CAFFEIN_ASSETS?.pfpPath || '/assets/pfp.png';
    document.head.appendChild(preload);
  }, 5000);

  return () => {
    controller.abort();
    $('#journey-progress').hidden = true;
    document.body.classList.remove('phase-chaos');
  };
}

export function cleanup() {}
