import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';
import { Effects } from './Effects';
import { toggleFullScreen } from './helpers/fullscreen';

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
      toggleFullScreen,
    },
  };
}

export { Mustang };
