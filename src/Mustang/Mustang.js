// Core
import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';
import { Assets } from './Assets';

// Helpers
import { getDom } from './helpers/dom';
import { toggleFullScreen } from './helpers/fullscreen';
import { audioElement } from './helpers/audio';
import { canvasElement } from './helpers/canvas';

export const ASSETS = 'assets';
export const EFFECTS = 'effects';

// -----

// Notes / Todo:
// * Add base effect type that custom effects can extend?
// * Add a way to preload assets
// * Sort out the helpers
// * Fragment shaders?
// * Investigate Store challenges and listeners and such (Proxy?)
// * Modifier curves that change the timeline pass-through values?
// * Some way to request current audio slice for effects to use as vis input?
// * Force update of Store key notifier?
// * on- event hooks for Effects (onResize)

function Mustang() {
  createStore();

  const player = new Player();
  const timeline = new Timeline();
  const assets = new Assets(ASSETS);
  const effects = new Assets(EFFECTS);

  return {
    player,
    timeline,
    assets,
    effects,
  };
}

const helpers = {
  getDom,
  toggleFullScreen,
  audioElement,
  canvasElement,
};

export { Mustang, helpers };
