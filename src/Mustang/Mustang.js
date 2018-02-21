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
// * Add effects registry, which timeline can bring in whilst running .parse()
// * Add base effect type that custom effects can extend?
// * Add resources (audio, canvas, etc.?)
// * Add assets (images, audio?) and way to preload them

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
