// Core
import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';
import { Effects } from './Effects';

// Helpers
import { toggleFullScreen } from './helpers/fullscreen';
import { dom } from './helpers/dom';
import { audioElement } from './helpers/audio';
import { canvasElement } from './helpers/canvas';

// -----

function Mustang() {
  const store = createStore();
  const player = new Player();
  const timeline = new Timeline();
  const effects = new Effects();

  return {
    store,
    player,
    timeline,
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
