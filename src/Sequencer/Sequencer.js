// Core
import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';
import { Assets } from './Assets';

// Helpers
import { getElementById } from './helpers/dom';
import { toggleFullScreen } from './helpers/fullscreen';
import { audioElement } from './helpers/audio';
import { canvasElement } from './helpers/canvas';

export const EFFECTS = 'effects/EFFECTS';

// -----

// TODO / Notes:
// * Add base effect type that custom effects can extend?
// * Add a way to preload assets
// * Fragment shaders?
// * Investigate Store challenges and listeners (Proxy?)
// * Modifier curves that change the timeline pass-through values?
// * Force update of Store key notifier?

function Sequencer() {
  createStore();

  const player = new Player();
  const timeline = new Timeline();
  const assets = new Assets();
  const effects = new Assets();

  return {
    player,
    timeline,
    assets,
    effects,
  };
}

const helpers = {
  getElementById,
  toggleFullScreen,
  audioElement,
  canvasElement,
};

export { Sequencer, helpers };
