// Core
import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';
import { Assets } from './Assets';
import { Effects } from './Effects';

// Helpers
import { toggleFullScreen } from './helpers/fullscreen';
import { dom } from './helpers/dom';
import { audioElement } from './helpers/audio';
import { canvasElement } from './helpers/canvas';

// -----

// Things to do:
// * Add base effect type that custom effects can extend?
// * Add a way to preload assets
// * Figure out best way to get asset `needs` to each effect instead of all
// * Sort out the helpers
// * Think about IDs and the best way to use them
// * Fragment shaders?
// * Investigate Store challenges and listeners and such
// * Modifier curves that change the timeline pass-through values?

function Mustang() {
  createStore();

  const player = new Player();
  const timeline = new Timeline();
  const assets = new Assets();
  const effects = new Effects();

  return {
    player,
    timeline,
    assets,
    effects,
    helpers: {
      dom,
      toggleFullScreen,
      audioElement,
      canvasElement,
    },
  };
}

export { Mustang };
