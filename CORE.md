# CAFFEIN — Project Documentation
### A Ragebait Web Experience Built for Cina

---

## 1. Project Vision

### Emotional Goal

This project is not a traditional game. It is a personalized emotional artifact disguised as a ragebait experience. The player — Cina, nicknamed "Caffein" — is subjected to increasingly absurd, frustrating, and sarcastic interactions that escalate in chaos. Then, without warning, everything stops. The interface breathes. The music begins. And what follows is something sincere.

The goal is to manufacture an emotional memory. By first overwhelming the player with noise and annoyance, the moment of calm becomes disproportionately powerful. The contrast does the heavy lifting. The joke is the setup. The sincerity is the punchline.

### Humor Style

The humor is dry, slightly mean, self-aware, and never lowbrow. It mocks the player's attempts to proceed while maintaining a veneer of helpfulness. Think less "meme spam" and more "a very polished system that hates you specifically." The sarcasm is delivered in clean UI — which makes it funnier. A fake warning in a beautifully designed modal lands harder than the same text in a Comic Sans popup.

### Cinematic Tone

The experience should feel like it was designed. Every glitch is intentional. Every fake load bar is choreographed. The player should sense — even through the chaos — that someone put real effort into annoying them. That craft is what distinguishes this from a cheap troll page.

### The Psychological Mechanism

Frustration followed by unexpected warmth produces a dopamine rebound. The player's guard is down from all the chaos. The moment the UI softens, so does their emotional state. The final message lands not just intellectually but physically — a small chest-tightening moment. The experience works because it earns the ending through friction.

---

## 2. Theme Direction

### Overall Aesthetic

**Soft Cyber / Glitch Confectionery.**

The interface looks like a high-end productivity app that has been slowly corrupted by something personal. Clean white surfaces with pink neon accents. Monospaced system fonts mixing with soft rounded UI. Everything feels slightly too polished for what it's doing — which is the joke.

### UI Philosophy

The UI pretends to be a system interface. Buttons have proper hover states. Modals have close buttons (that do nothing useful). Progress bars fill with purpose (and then reset). The irony is that more polish = more betrayal when things break intentionally.

### Personality of the Website

The website has an internal narrator — a passive-aggressive AI assistant named **CAIA** (Caffein Assistance Intelligence Agency). CAIA is helpful, technically. She is just never helpful in the way you need right now.

### Fake System/Hacker/Lab Theme

The visual language borrows from:
- Terminal interfaces (monospace readouts, blinking cursors)
- Medical diagnostic UIs (scan lines, fake biometric readouts)
- Corporate SaaS dashboards (cards, modals, progress indicators)

All of these are used to do absolutely nothing useful, and this contrast is the core joke.

### Emotional Transition Style

The chaos does not fade slowly. It cuts. One frame: glitching, pink warnings, shaking UI. The next: silence. A soft white screen. The transition is abrupt by design — the sudden stillness is itself a shock. Then the warmth arrives gradually, like the room temperature rising.

---

## 3. Color Palette

### Core Philosophy

White-dominant surfaces with pink as the emotional color. Pink shifts meaning throughout the experience — initially it signals warnings and errors (ironic inversion of red), and by the ending it becomes warmth and affection.

### Full Palette

| Role | Name | HEX |
|---|---|---|
| Primary | Soft White | `#F9F7F7` |
| Primary Text | Deep Ink | `#1A1A2E` |
| Pink Core | Caffein Pink | `#FF6B9D` |
| Pink Light | Blush | `#FFB3CC` |
| Pink Deep | Magenta Edge | `#D63384` |
| Secondary | Cool Lavender | `#C8B6E2` |
| Accent | Electric Mint | `#5FFFD4` |
| Warning | Neon Peach | `#FF9A76` |
| Danger | Glitch Red | `#FF3366` |
| Background Dark | Void | `#0D0D14` |
| Background Card | Ghost White | `#FFFFFF` |
| Overlay | Ink Fog | `rgba(13,13,20,0.72)` |
| Glow Pink | Aura Pink | `rgba(255,107,157,0.35)` |
| Glow Mint | Aura Mint | `rgba(95,255,212,0.2)` |
| Ending Warm BG | Dawn Cream | `#FFF5EE` |
| Ending Accent | Rose Dust | `#F4A7B9` |
| Ending Text | Warm Charcoal | `#3D2B2B` |

### Gradient Definitions

```
--gradient-chaos: linear-gradient(135deg, #1A1A2E 0%, #0D0D14 60%, #2D0030 100%)
--gradient-pink-burst: linear-gradient(90deg, #FF6B9D, #D63384)
--gradient-ending: linear-gradient(180deg, #FFF5EE 0%, #FFE4EE 100%)
--gradient-glow-card: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,107,157,0.05))
```

---

## 4. Typography System

### Font Stack

| Role | Font | Source |
|---|---|---|
| Display / Headings | **Clash Display** | Fontshare CDN |
| Body / UI | **DM Sans** | Google Fonts |
| Monospace / Terminal | **JetBrains Mono** | Google Fonts |

**Rationale:** Clash Display has editorial energy and personality without being aggressive. DM Sans reads cleanly at small mobile sizes. JetBrains Mono grounds the fake-terminal aesthetic with legitimacy.

### Type Scale (Mobile-First, rem-based)

```
--text-xs:    0.75rem   /* 12px — fine print, fake legal */
--text-sm:    0.875rem  /* 14px — UI labels, button text */
--text-base:  1rem      /* 16px — body copy */
--text-lg:    1.125rem  /* 18px — card headers */
--text-xl:    1.375rem  /* 22px — section titles */
--text-2xl:   1.75rem   /* 28px — page headers */
--text-display: clamp(2.5rem, 8vw, 4.5rem) /* hero / ending reveal */
```

### Mobile Scaling Philosophy

All heading sizes use `clamp()` to scale between a minimum comfortable mobile size and a desktop maximum. No fixed pixel headings above `--text-xl`. Line height on mobile is slightly more generous (`1.6`) to account for thumb-scroll reading behavior.

### Spacing Philosophy

8px base grid. All spacing values are multiples of 8. Padding on interactive elements (buttons, cards) is never below `12px vertical / 20px horizontal` to ensure comfortable touch targets (minimum 44px height).

### Emotional Transition Typography

During the ending scene, the font tracking on the display text loosens (`letter-spacing: 0.08em`) and weight drops from 700 to 400. This creates a visual exhale — the text relaxes. The shift is animated over 800ms with `ease-out`.

---

## 5. Animation System

### Design Philosophy

Every animation has a reason. Nothing moves randomly. Even the "random" glitch effects are choreographed sequences. This intentionality is what separates the experience from feeling cheap.

### Easing Vocabulary

```
--ease-snap:     cubic-bezier(0.34, 1.56, 0.64, 1)   /* button bounce */
--ease-out-soft: cubic-bezier(0.25, 0.46, 0.45, 0.94) /* general reveals */
--ease-chaos:    cubic-bezier(0.68, -0.55, 0.27, 1.55) /* ragebait moves */
--ease-ending:   cubic-bezier(0.16, 1, 0.3, 1)         /* final scene */
```

### Button Movement Behavior

Troll buttons ("OKAY", "I UNDERSTAND", "CONTINUE") move when approached on mobile via `touchstart` proximity detection. The button translates using CSS `transform: translate()` — never `top/left` to avoid layout reflow. Movement radius: `60–120px`. Movement is instant (no transition) to maximize annoyance. After 5 failed attempts, the button briefly freezes in place, lets the user almost click it, then dodges at the last 80ms.

### Screen Shake Logic

Screen shake is implemented as a CSS `@keyframes` animation applied to the `<body>` wrapper. Never applied to individual elements to avoid GPU layer explosion.

```
Intensity levels:
  Level 1 — subtle: ±2px, 200ms, used on fake errors
  Level 2 — medium: ±6px, 350ms, used on fake crashes
  Level 3 — hard:   ±14px, 500ms, used on escalation peaks
```

Shake is triggered via JS class injection: `document.body.classList.add('shake-2')`. Removed via `animationend` listener. Cooldown: 800ms between shakes to prevent seizure-risk stacking.

### Fake Lag System

A `fakeLag(ms)` utility function disables all pointer events on the UI and shows a system overlay reading "Processing... please wait" for a specified duration. The lag feels intentional because the UI remains visible but frozen. Duration ranges from `600ms` (minor) to `3200ms` (dramatic escalation moment). The progress bar during fake lag fills in non-linear intervals — it speeds up then slows at 97%, then jumps to complete.

### Loading Animation Philosophy

Loading screens are full-page overlays with animated scan lines and a fake percentage counter. The counter is deliberately inconsistent:
- Counts normally to 47%
- Stalls for 2 seconds
- Jumps backward to 31%
- Counts to 99%
- Stalls for 4 seconds
- Completes

The scan line effect uses a CSS repeating linear gradient on a pseudo-element, animated with `background-position`. GPU-friendly, zero DOM nodes.

### Popup Behavior

Popups enter from unexpected positions. The first appears from top-center (expected). Subsequent ones appear from bottom-left, from inside another popup, or from off-screen right. Each uses `transform: translate + scale` for entry. Stack limit: 3 popups maximum before a fake "popup manager has crashed" message.

### Emotional Ending Animation Change

When the ending state is activated via JS (`GameState.setPhase('ending')`):

1. All ongoing CSS animations are cleared via class removal and `animation: none` injection
2. A 400ms white fade overlay covers the screen
3. The overlay fades out over 1200ms, revealing the new calm UI
4. From this point, all animations use `--ease-ending` and durations of `800ms–1600ms`
5. Elements float in with opacity transitions and gentle `translateY(12px → 0)` reveals

### Mobile GPU Optimization

- All animations use `transform` and `opacity` exclusively
- `will-change: transform` is applied only to elements actively animating, then removed after `animationend`
- No `box-shadow` animation — glow effects during chaos use `filter: drop-shadow()` on a pseudo-element
- Ending scene animations are staggered with `animation-delay` to prevent simultaneous GPU layer promotions

---

## 6. Audio System

### Sound Design Philosophy

Audio is sparse. Silence is used as a weapon — especially right before the ending. Too many sounds become noise. The right sounds at the right moments become memory.

### Sound Events

| Trigger | Sound | Duration | Notes |
|---|---|---|---|
| Button almost clicked | Short click miss SFX | ~80ms | Plays on the dodge |
| Fake error modal | Low buzz / system error | ~400ms | Slightly too loud |
| Fake lag start | Dial-up-style noise burst | ~600ms | Cut abruptly |
| Progress bar rewind | Sad descending tone | ~300ms | Comically tragic |
| Popup appear | Soft notification ping | ~150ms | Earnestly polite |
| Escalation peak | Distorted system alert | ~700ms | Once only |
| Pre-ending silence | Nothing | 2000ms | Intentional void |
| Ending music | `assets/[song].mp3` | Full track | Autoplay at ending trigger |

### Ending Music Integration

The MP3 in `/assets/` is loaded via the Web Audio API — not an `<audio>` tag — for better mobile autoplay compatibility and fade control.

```
Audio loading strategy:
1. AudioContext is instantiated on first user interaction (game start)
2. The MP3 is fetched and decoded into a buffer immediately after
3. The buffer is held in memory throughout gameplay
4. On ending trigger: buffer is played via AudioBufferSourceNode
5. Gain node controls volume: starts at 0, ramps to 0.85 over 2000ms
```

This approach sidesteps autoplay restrictions because the AudioContext was created within a user gesture. The buffer is ready to play instantly, with no network latency at the emotional moment.

### Audio Fallback Logic

If the Web Audio API is unavailable (rare on modern mobile), the system falls back to an `<audio>` element with `autoplay muted` followed by a JS-triggered `.play()` call and gradual volume ramp via `setInterval`. A flag `audioFallback: true` is set in GameState for diagnostic logging.

### Fade Systems

All audio transitions use exponential ramp via `gainNode.gain.exponentialRampToValueAtTime()` — linear ramps sound mechanical. Ending music fade-in: 2000ms. If player somehow closes the experience during the ending, music fades out over 800ms via `beforeunload` listener.

---

## 7. Gameplay Design

### Overview

The game is presented as a simple quiz or interaction — "Answer a few questions about Cina." This is the premise bait. Every attempt to proceed is subverted. The experience has **6 phases**.

---

### Phase 0 — Boot Sequence (0–8 seconds)

The player opens the page. A fake OS boot animation plays. Loading bars. System checks. Fake text logs scroll:

```
> Initializing CAIA v2.4.1...
> Loading patience module... [FAILED]
> Loading caffeine levels... [CRITICAL]
> WARNING: User detected. Proceeding anyway.
> System ready. Probably.
```

After boot, a welcome screen appears with a START button. The button is perfectly normal. Pressing it works. This is the last thing that will work normally for a while.

---

### Phase 1 — False Normalcy (8–30 seconds)

A clean UI presents the first interaction: "How well do you know Cina? Let's find out." A multiple choice question appears. All four answers are variations of "very well" reworded. After selecting any answer, a fake loading bar fills to 100%. Then: "Sorry, your answer was not recognized. Please try again." The answers rearrange.

**Mechanics introduced:**
- Answer shuffling on selection
- Fake validation failures
- First CAIA quip appears: *"Having trouble? That's okay. Not everyone is built for this."*

---

### Phase 2 — Mild Escalation (30s–90s)

A new challenge: "Press the CONFIRM button to continue." The CONFIRM button moves on `touchstart`. First dodge is slow (recoverable). Second dodge is fast. Third dodge exits the screen entirely, then a new button appears from the opposite corner.

A fake achievement notification fires: 🏆 *"Persistence Trophy — You tried 4 times. That's... something."*

A fake warning modal appears: *"Your session will expire in 3 minutes."* The countdown timer in the modal counts down normally until 2:47, then jumps to 2:44, then resets to 3:00.

---

### Phase 3 — Genuine Frustration Zone (90s–180s)

This is the escalation peak. Multiple mechanics stack.

**Active mechanics:**
- Screen periodically shakes (Level 2) with no warning
- A "CAPTCHA" appears: *"Click all images containing caffeine."* The images are abstract colored blobs. No correct answer exists. After 3 attempts: *"CAPTCHA expired. Please complete a new one."* (same CAPTCHA, relabeled)
- A progress bar appears at the top: "Journey to Completion: 74%". It does not move upward from this point.
- CAIA delivers: *"You're doing amazing, bestie. Truly. This is going great for you."*

A fake phone call notification overlay appears at the top: **📞 Incoming call: Mom**. It cannot be dismissed for 8 seconds.

---

### Phase 4 — Fake Resolution (180s–220s)

A calm screen appears. Clean typography: *"Congratulations. You've completed the experience."* Soft confetti animation plays. A large button reads: **"CLAIM YOUR REWARD →"**

The button works. A new page loads. It reads:

*"Just kidding lol"*

The screen glitches hard (Level 3 shake, full glitch overlay). CAIA's voice: a distorted audio burst. Then silence.

This moment is the peak chaos event.

---

### Phase 5 — Decompression (220s–240s)

A single line of text appears on a black screen. No animation. No sound:

*"Okay. For real now."*

It stays for 3 seconds. Then a soft white fade begins.

---

### Phase 6 — The Ending (240s+)

See Section 8 for full detail.

---

### Pacing Strategy

The escalation follows a tension curve borrowed from film editing: build → release (fake resolution) → bigger build → hard cut to silence → emotional resolution. The fake resolution in Phase 4 resets the player's expectations just before the final emotional beat, making the landing softer and more unexpected.

---

## 8. Emotional Ending Design

### The Trigger

Ending is activated when `GameState.setPhase('ending')` is called. This immediately:
1. Cancels all queued troll timers (`clearTimeout` on all stored timer IDs)
2. Removes all chaos CSS classes from `document.body`
3. Disables all troll interaction handlers
4. Begins the visual transition

### Visual Transition Sequence

```
T+0ms    — White overlay fades in (opacity 0→1 over 400ms)
T+400ms  — All chaos UI elements opacity 0 instantly
T+600ms  — Background color transitions to --gradient-ending
T+800ms  — White overlay begins fade out (1200ms)
T+1200ms — Music begins (2000ms fade-in from silence)
T+2000ms — First ending element fades in
```

### Ending UI Architecture

The ending screen is a separate HTML section (`#ending-scene`) that exists in the DOM from the start but is hidden (`display: none`, `visibility: hidden`). On ending trigger, it switches to `display: flex` and begins its entrance sequence. This avoids any DOM injection latency at the emotional moment.

### The PFP Reveal

Her profile picture (`/assets/pfp.[ext]`) is displayed as a centered circular image, initially blurred (`filter: blur(20px)`) and small (`transform: scale(0.6)`). Over 1800ms with `--ease-ending`, the blur reduces to zero and the scale reaches 1.0. The effect feels like coming into focus — like the chaos clearing to reveal something real.

The image has a soft pink ring glow: `box-shadow: 0 0 40px rgba(255,107,157,0.4)`.

### Text Reveal Sequence

Text elements reveal one at a time, each with a `400ms` delay between them.

```
Line 1: "Hey, Caffein." — small, DM Sans, warm-charcoal, fades in
Line 2: (1200ms pause)
Line 3: "You give so much energy..." — Clash Display, large, slow fade
Line 4: (2000ms pause)
Line 5: "Thank you for existing." — small, italic, DM Sans
```

The main line — *"You give so much energy..."* — is the anchor. It appears in `--text-display` size with `letter-spacing: 0.06em`, color `#D63384`, and takes 1200ms to fully materialize via opacity transition. The trailing ellipsis `...` creates an unfinished quality — like someone who had more to say but didn't need to.

### Music Timing Alignment

The MP3 in `/assets/` should be a soft, instrumental or vocal song that the creator knows has personal meaning to Cina. It begins at `T+1200ms` — just as the white overlay starts to clear. The player hears it before they see the ending screen, which primes the emotional state before the visual content arrives.

The song plays at `gain: 0.85` — present but not overwhelming. The visuals have room to breathe alongside it.

### Pacing Philosophy

The ending takes approximately 12–18 seconds from trigger to full display. This is intentionally slow. After the speed and noise of the preceding 4 minutes, slowness itself becomes emotional. There is nothing to click, nothing to do. The player is just asked to receive.

### Why It Works Psychologically

1. **Contrast effect**: After sustained cognitive irritation, warmth feels amplified.
2. **Personal address**: The game knows her name. It uses her nickname. The "you" is real.
3. **Earned stillness**: The calm wasn't given — it followed chaos. It feels deserved.
4. **The ellipsis**: *"You give so much energy..."* doesn't finish its thought. It suggests more than it says. That space is where the emotion lives.
5. **The photo**: Seeing a real face after abstract UI is a grounding jolt. It says: this was always about a person.

---

## 9. Folder Structure

```
caffein-game/
│
├── index.js                   # Express app entry point
├── package.json
├── .env                       # Environment variables (PORT, NODE_ENV)
├── .env.example
├── .gitignore
│
├── assets/                    # Raw asset source (not served directly)
│   ├── song.mp3               # Ending emotional music
│   └── pfp.jpg                # Cina's profile picture
│
├── public/                    # Statically served by Express
│   ├── index.html             # Single HTML shell
│   ├── favicon.ico
│   │
│   ├── styles/
│   │   ├── reset.css          # Minimal CSS reset
│   │   ├── variables.css      # All CSS custom properties
│   │   ├── base.css           # Typography, spacing, base elements
│   │   ├── layout.css         # Structural layout
│   │   ├── components.css     # Buttons, modals, cards, popups
│   │   ├── animations.css     # All @keyframes definitions
│   │   ├── effects.css        # Glitch, glow, scan lines, overlays
│   │   └── ending.css         # Ending scene exclusive styles
│   │
│   ├── scripts/
│   │   ├── main.js            # Entry point, initializes all modules
│   │   ├── state.js           # GameState singleton
│   │   ├── phases/
│   │   │   ├── phase0.js      # Boot sequence
│   │   │   ├── phase1.js      # False normalcy
│   │   │   ├── phase2.js      # Mild escalation
│   │   │   ├── phase3.js      # Frustration peak
│   │   │   ├── phase4.js      # Fake resolution
│   │   │   ├── phase5.js      # Decompression
│   │   │   └── phase6.js      # Emotional ending
│   │   ├── systems/
│   │   │   ├── audio.js       # Web Audio API manager
│   │   │   ├── animation.js   # Animation orchestrator
│   │   │   ├── dodge.js       # Moving button logic
│   │   │   ├── shake.js       # Screen shake controller
│   │   │   ├── popup.js       # Popup/modal manager
│   │   │   ├── lag.js         # Fake lag system
│   │   │   └── caia.js        # CAIA dialogue system
│   │   └── utils/
│   │       ├── dom.js         # Safe DOM helpers
│   │       ├── timer.js       # Managed setTimeout/setInterval
│   │       └── device.js      # Mobile detection, touch utils
│   │
│   └── assets/                # Copied from /assets at build or startup
│       ├── song.mp3
│       └── pfp.jpg
│
├── routes/
│   └── static.js              # Optional route config if needed beyond Express static
│
├── config/
│   └── app.config.js          # App-level constants (phases, timing, etc.)
│
└── utils/
    └── startup.js             # Server startup helpers, env validation
```

### Folder Responsibilities

- **`/assets`** — Source assets. Not web-accessible. Copied to `/public/assets` at startup. Separation prevents accidental exposure of other server files.
- **`/public`** — Everything web-accessible. Express serves this directory as static.
- **`/public/styles`** — Modular CSS. No single mega-file. Loaded in order via `<link>` tags. `variables.css` loads first.
- **`/public/scripts/phases`** — Each phase is self-contained. Phase files export an `init()` and `cleanup()` method. GameState orchestrates the transitions.
- **`/public/scripts/systems`** — Shared interactive systems. Stateless where possible, accepting config objects.
- **`/config`** — Centralizes timing values, phase sequences, and tunable constants so behavior can be adjusted without hunting through logic files.

---

## 10. Root `index.js` Architecture

### Startup Flow

```
1. Load environment variables (dotenv)
2. Validate required env vars via utils/startup.js
3. Copy /assets → /public/assets if not already present
4. Initialize Express app
5. Apply security middleware
6. Apply request logging middleware (dev only)
7. Mount static file serving
8. Mount routes
9. Apply 404 handler
10. Apply global error handler
11. Start listening on PORT
12. Log startup confirmation
```

### Middleware Stack (in order)

```javascript
app.use(helmet())                          // Security headers
app.use(compression())                     // Gzip responses
app.use(express.json({ limit: '10kb' }))   // JSON body parsing, size-limited
app.use(morgan('dev'))                     // Request logging (NODE_ENV=dev only)
app.use(express.static('public', {
  maxAge: '1d',                            // Cache static assets
  etag: true
}))
```

### Routing Structure

This is primarily a single-page experience. The only routes needed:

```
GET  /          → serves public/index.html
GET  /health    → returns { status: 'ok', uptime } (monitoring)
```

All game logic is client-side. No game state is persisted server-side.

### Security Basics

- `helmet()` sets secure HTTP headers (XSS protection, no-sniff, frameguard)
- Body parser size limit prevents large payload attacks
- No user input is stored or executed server-side
- `express.static` serves files with cache headers but no directory listing

### Fail-Safe Startup

```javascript
// utils/startup.js
function validateEnv() {
  const required = ['PORT', 'NODE_ENV'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`Missing env vars: ${missing.join(', ')}`);
    process.exit(1);
  }
}
```

Server binds to `127.0.0.1` in production (behind a reverse proxy) and `0.0.0.0` in development. Uncaught exception and unhandled rejection handlers log and exit cleanly.

### Environment Philosophy

`.env` holds only `PORT` and `NODE_ENV`. No secrets. No API keys. The game has no external dependencies. `.env.example` documents all variables for reproducibility.

---

## 11. Mobile Optimization Engineering

### Touch Interaction Systems

- All interactive elements have explicit `touch-action: manipulation` to eliminate 300ms tap delay
- Dodge button detection uses `touchstart` with `e.changedTouches[0]` coordinates, not mouse events
- Touch targets are minimum `44x44px` per Apple HIG guidelines
- `touchmove` is used for the fake "drag-to-confirm" mechanic with `e.preventDefault()` called within a non-passive listener (registered via `addEventListener('touchmove', fn, { passive: false })`)

### Viewport Handling

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,
  maximum-scale=1.0, user-scalable=no">
```

`maximum-scale=1.0` prevents accidental zoom during troll interactions. The ending scene re-enables zoom to avoid accessibility issues after chaos ends (injected via `<meta>` tag replacement at `phase6.js` init).

### Safe-Area Handling

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

Popups and fixed-position elements respect `safe-area-inset-*` so nothing critical is hidden behind iPhone notches or Android gesture navigation bars.

### Preventing Layout Reflow

- Dodge movements use `transform: translate()` exclusively
- `position: fixed` is used for popups and overlays
- No JS-driven `width`, `height`, `top`, or `left` changes — only transforms
- Shake animation applied to `#app-wrapper` div, not `body`, to avoid scroll interference

### Mobile FPS Preservation

- Glitch and scan-line effects use CSS-only animations on pseudo-elements
- `requestAnimationFrame` used for all JS-driven animation loops
- No `setInterval` for visual updates
- `will-change` applied only during active animations, removed immediately after
- During Phase 3 (peak chaos), effects are capped — no more than 3 simultaneous animated layers to respect lower-end device GPU limits

### Battery Optimization

- All animation loops stop when `document.visibilityState === 'hidden'` (Page Visibility API)
- Loops resume on `visibilitychange` event if game is not in ending state
- Audio context suspended when tab is backgrounded

### Adaptive Effect Scaling

`device.js` checks hardware concurrency and device memory hints:
```javascript
const isLowEnd = navigator.hardwareConcurrency <= 2
  || (navigator.deviceMemory && navigator.deviceMemory < 2);
if (isLowEnd) GameState.setFlag('reducedEffects', true);
```

When `reducedEffects` is true: scan lines disabled, screen shake intensity halved, maximum simultaneous popups reduced to 1, glitch overlay opacity halved.

### Orientation Handling

A soft lock overlay appears in landscape mode during the chaos phases: *"Please rotate your device. (The chaos works better vertically.)"* — which is on-brand. The overlay is purely CSS via `@media (orientation: landscape)`. In the ending scene, landscape is allowed and the layout adapts to a centered, narrow column.

---

## 12. Fail-Safe & Stability Engineering

### Anti-Softlock System

Every game phase registers a `phaseTimeout` — a maximum duration before `GameState.forceAdvance()` is called. Even if all interaction handlers fail, the game continues. Phase timeouts:

```
Phase 0: 12s
Phase 1: 45s
Phase 2: 90s
Phase 3: 120s
Phase 4: 30s
Phase 5: 8s
Phase 6: no timeout (terminal state)
```

### Managed Timer Registry

All `setTimeout` and `setInterval` calls go through `timer.js`, which stores every ID:

```javascript
const timerRegistry = new Set();
function managedTimeout(fn, ms) {
  const id = setTimeout(() => { timerRegistry.delete(id); fn(); }, ms);
  timerRegistry.add(id);
  return id;
}
function clearAllTimers() {
  timerRegistry.forEach(clearTimeout);
  timerRegistry.clear();
}
```

`clearAllTimers()` is called on ending trigger and on any emergency reset. This guarantees no troll timer fires during the emotional ending.

### Animation Breakage Prevention

After any phase transition, `animation.js` calls a `hardReset()`:
```
1. Remove all animation class lists from tracked elements
2. Force a reflow (read offsetHeight)
3. Re-apply target classes
```
This prevents stuck animations from a class being added before a previous `animationend` fires.

### Popup Stack Management

`popup.js` maintains a stack array. Maximum depth: 3. If a 4th popup is triggered while 3 are active, a special "popup_overflow" event fires instead, which shows the single "popup manager has crashed" UI — a designed safe failure mode that's also funny.

### Asset Fallback Systems

On startup, the server verifies `/public/assets/song.mp3` and `/public/assets/pfp.jpg` exist. If either is missing, a flag is set in the served HTML via a template variable. Client-side, missing asset flags degrade gracefully:
- **Missing PFP**: Ending shows a soft pink circle with initials "CI" instead
- **Missing music**: Ending plays a CSS-animated silence visualization (gentle pulse) and CAIA says *"The music was supposed to play here. Very emotional. Trust me."*

### Resize Recovery

`window.addEventListener('resize')` triggers a debounced (200ms) `layout.recalculate()` which:
1. Re-evaluates all dodge button boundaries (so they don't dodge to off-screen positions based on old viewport)
2. Resets any fixed-position popup coordinates
3. Checks if the shake wrapper height changed and corrects the body overflow state

### Emergency Reset

A hidden gesture (5-tap on the top-left corner within 2 seconds) triggers `GameState.emergencyReset()` — which immediately calls `clearAllTimers()`, removes all chaos classes, and reloads the page. This exists for edge cases where the player is genuinely stuck, not by design.

---

## 13. UX Psychology

### Why Ragebait Works

Frustration is engagement. A player who is annoyed is completely present. They are not passively watching — they are actively trying, reacting, and emotionally invested. This investment is exactly what makes the ending land. You cannot have an emotional payoff with a disengaged audience.

The key is controlling the type of frustration. The annoyance in this experience is always:
- **Clearly intentional** — The player knows they're being trolled. There is no genuine confusion about whether the site is broken.
- **Softened by humor** — Every obstacle is paired with a joke. The frustration has a release valve.
- **Never punishing** — Progress cannot actually be reversed. The illusion of setback is maintained, but the player always moves forward.

### How Frustration Is Balanced With Humor

The humor is the acknowledgment that the game knows exactly what it's doing and doesn't care. CAIA's commentary is key — she validates the player's frustration while doing nothing to resolve it. This creates a conspiratorial feeling: even the AI thinks this is funny. The player becomes an audience member of their own suffering, which converts frustration into amusement.

### Emotional Contrast Psychology

The brain encodes emotional transitions more strongly than steady states. A shift from high-stimulation frustration to quiet warmth creates a strong emotional signature. The ending is remembered not just because it's sweet, but because of what came before it. The chaos is the amplifier.

### Why Polished UI Makes Jokes Funnier

Humor often operates through violated expectations. A moving button on a rough, cheaply-made page is just a broken button. A moving button on a sophisticated, beautifully designed interface is absurdist comedy. The production quality signals that someone cares deeply — and then uses that credibility to do something ridiculous.

### Reward Timing

The experience uses a **variable ratio reinforcement** pattern for the fake achievements — the same psychological mechanism as social media likes. Achievements fire at unexpected intervals: sometimes after a single failed attempt, sometimes after many. This makes them feel random and keeps the player uncertain about when the next one comes, sustaining engagement.

### Emotional Memory Retention

Experiences with strong emotional bookends (frustrating entry + warm exit) are disproportionately well-remembered. The "peak-end rule" in behavioral psychology states that people judge experiences primarily by their peak intensity and their final moments. This game is designed entirely around that rule: the peak is Phase 4's fake resolution glitch, the end is the emotional reveal.

---

## 14. Performance Strategy

### Minimizing DOM Usage

The entire game runs inside a single HTML shell. All UI changes are CSS class toggling on existing DOM nodes. New elements are created only for popups (max 3 in DOM at once) and are removed on close. No framework virtual DOM, no re-render cycles.

### Animation Batching

All animation triggers are batched within `requestAnimationFrame` when multiple changes need to happen simultaneously. This prevents partial-frame rendering artifacts (where one element animates and another doesn't for a single frame).

### GPU-Safe Transforms

Every animated property is either `transform` or `opacity`. Both are composited by the GPU without triggering layout or paint. This is strictly enforced — any `width`, `height`, `margin`, or `padding` animation is rejected at design time.

### Avoiding Layout Thrashing

`dom.js` wraps all read/write DOM operations. Reads (getBoundingClientRect, offsetHeight) are batched before writes. No interleaving of reads and writes within a single frame.

### Lazy Loading

The PFP image has `loading="lazy"` but is also preloaded via `<link rel="preload">` during Phase 3 (when the player is engaged in CAPTCHA frustration). By the time the ending triggers, the image is guaranteed in cache.

The MP3 is fetched and decoded during Phase 2 via the Web Audio API. Decoding is asynchronous and non-blocking. By Phase 6, the AudioBuffer is ready.

### Memory Management

- Popup DOM nodes are explicitly removed (not just hidden) after dismissal
- Event listeners are registered with `AbortController` signals per phase — on phase cleanup, the controller is aborted, removing all listeners in one call
- Audio buffers from sound effects are reused (one buffer per SFX, replayed via new source nodes)

---

## 15. Visual Effects System

### Glow System

Glows are implemented as `filter: drop-shadow()` on wrapper elements or `box-shadow` on static elements. Animated glows use CSS custom property transitions:

```css
--glow-intensity: 0;
filter: drop-shadow(0 0 calc(var(--glow-intensity) * 1px) var(--glow-color));
transition: --glow-intensity 300ms ease;
```

### Fake Warning Overlays

Warning overlays use `position: fixed`, `z-index: 9000`, with a backdrop blur (`backdrop-filter: blur(4px) brightness(0.7)`). The border is `2px solid #FF3366` with a `box-shadow: 0 0 20px rgba(255,51,102,0.5)` glow. Content uses `JetBrains Mono` with `color: #FF6B9D` for the header and white body text.

### Scan Line Effect

```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.08) 2px,
    rgba(0,0,0,0.08) 4px
  );
  pointer-events: none;
  animation: scan-move 8s linear infinite;
}
@keyframes scan-move {
  from { background-position: 0 0; }
  to   { background-position: 0 100px; }
}
```

### Glitch Text Effect

Glitch text uses a CSS `@keyframes` that rapidly shifts `clip-path` on `::before` and `::after` pseudo-elements with slight `translateX` offsets and different `color` values (pink, mint). Frequency: 0.3s bursts with random `animation-delay` values set via inline CSS custom properties.

### Ending Scene Lighting

In the ending scene, the background transitions to `--gradient-ending`. The PFP has a radial gradient behind it: `radial-gradient(circle at 50% 50%, rgba(244,167,185,0.3) 0%, transparent 70%)`. All harsh shadows are removed. `filter: drop-shadow(0 0 30px rgba(255,107,157,0.25))` replaces them.

---

## 16. Dialogue & Writing Tone

### CAIA's Personality

CAIA is a passive-aggressive assistant who is technically always trying to help. She does not insult the player directly — she simply provides commentary that makes the situation worse. Her tone is that of someone who has infinite patience and is choosing, specifically, to use it against you.

### Chaos Phase Line Examples

```
"Your progress has been saved. Unfortunately, the save file is also confused."

"The button is just shy. Give it time."

"Congratulations on your 7th attempt. CAIA has prepared a certificate. It's very small."

"System update required: Coping With This."

"Your caffeine levels are insufficient for this task. (Ironic, given your name.)"

"CAPTCHA verification failed. The images were of coffee. We're not sorry."

"Estimated time remaining: Yes."

"Your session is perfectly fine. This message is just here for ambiance."

"Loading your patience... [■■■■■■■□□□] 78%... stalled."

"Don't worry. This is all going according to plan. (CAIA's plan.)"

"You have been awarded the 'Persistent' badge. It is not a compliment."
```

### Fake Warning Message Style

Warnings use ALL CAPS headers, excessive technical language, and an urgent tone that describes nothing urgent:

```
⚠ SYSTEM NOTICE #4471-B
Temporal desynchronization detected in User Patience Module.
Recommend: immediate recalibration via breath.
Status: UNRESOLVED (by design)
[ ACKNOWLEDGE ] [ ACKNOWLEDGE AGAIN ]
```

### Ending Tone

The ending abandons sarcasm entirely. CAIA goes quiet. The writing becomes direct, warm, and slightly imperfect — not polished copy, but something that feels like it was written by a person:

```
"Hey, Caffein."

"You give so much energy..."

"Thank you for existing."
```

No exclamation marks. No emoji. No flourish. The simplicity is the statement.

---

## 17. Future Expansion Ideas

### Replayability Systems

- On second playthrough, CAIA references the first: *"Oh. You're back. Interesting choice."*
- Troll mechanics rotate from a larger pool so the experience feels different
- Phase timings slightly randomized on each run (±15%)

### Hidden Endings

- If the player dodges the CONFIRM button exactly 13 times, a secret path unlocks: CAIA breaks character for one message: *"Okay that was actually impressive."*
- If the player finds and taps the CAIA logo 5 times during Phase 1, a second ending variant reveals a different image and a different final message

### Chaos Mode

An opt-in mode (hidden button in the boot screen) that doubles all shake intensity, triples dodge speed, adds extra CAPTCHA layers, and inserts a fake phone restart sequence.

### Score System (Joke Implementation)

A completely fake score counter visible throughout the game. It counts upward but the scoring logic is deliberately inconsistent — it awards points for doing nothing and subtracts points for succeeding. Final score screen shows: *"Your score of 4,471 means absolutely nothing. Well done."*

### Personalization System

If the project is adapted for another person, a `config/persona.js` file stores the name, nickname, PFP path, and song path. All CAIA references to "Caffein" pull from this config. The ending message is also templated here. One file change redeploys the entire experience for a different recipient.

### Secret Interaction — The CAIA Override

During Phase 3, if the player types "I GIVE UP" (all caps) into any focused input, CAIA responds: *"Good. That's the first correct thing you've done."* — and immediately advances to Phase 5. This is not documented anywhere in the experience. It exists for those who find it.

### Leaderboard (Joke)

A server-side leaderboard that ranks players by time taken to reach the ending. The top entry is always *"[REDACTED] — 0:00"* with a score of ∞. Second place is always whoever played most recently. Submitting a name to the leaderboard triggers one final CAIA message: *"Your legacy is secure. Sort of."*

---

*Documentation version: 1.0.0 — Built for Cina, with care disguised as chaos.*