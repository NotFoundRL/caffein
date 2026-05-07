import { GameState } from './state.js';
import * as phase0 from './phases/phase0.js';
import * as phase1 from './phases/phase1.js';
import * as phase2 from './phases/phase2.js';
import * as phase3 from './phases/phase3.js';
import * as phase4 from './phases/phase4.js';
import * as phase5 from './phases/phase5.js';
import * as phase6 from './phases/phase6.js';
import { detectLowEnd, setupEmergencyReset, setupResizeRecovery, setupVisibility } from './utils/device.js';
import { AudioSystem } from './systems/audio.js';

window.GameState = GameState;

GameState.setFlag('missingPfp', Boolean(window.CAFFEIN_ASSETS?.missingPfp));
GameState.setFlag('missingSong', Boolean(window.CAFFEIN_ASSETS?.missingSong));
GameState.setFlag('reducedEffects', detectLowEnd());

GameState.registerPhase('phase0', phase0);
GameState.registerPhase('phase1', phase1);
GameState.registerPhase('phase2', phase2);
GameState.registerPhase('phase3', phase3);
GameState.registerPhase('phase4', phase4);
GameState.registerPhase('phase5', phase5);
GameState.registerPhase('ending', phase6);

setupEmergencyReset(GameState);
setupResizeRecovery();
setupVisibility(AudioSystem, GameState);

GameState.start();
