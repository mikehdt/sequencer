import { Mustang } from '../Mustang';
import audioFile from './assets/song.mp3';
import styles from '../styles/audio.scss';

import * as fx from './effects';
import { FADE_EFFECT_ID } from './effects/fadeEffect';
import { TEST_EFFECT_ID } from './effects/testEffect';

const DOM_ID = 'root';
const CANVAS = 'canvas';
const AUDIO = 'audio';

// Player
const mustang = new Mustang();

const {
  player,
  timeline,
  helpers,
  assets,
  effects,
} = mustang;

assets.add(CANVAS, helpers.canvasElement());
assets.add(AUDIO, helpers.audioElement(audioFile, styles.audio));

player.setAudio(assets.getData(AUDIO));

effects.add(FADE_EFFECT_ID, fx.fadeEffect);
effects.add(TEST_EFFECT_ID, fx.testEffect);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

// DOM
const dom = helpers.dom(DOM_ID);
dom.appendChild(assets.getData(CANVAS));
dom.appendChild(assets.getData(AUDIO));

document.getElementById('fullscreen').addEventListener('click', () => helpers.toggleFullScreen(true));

// Timeline
const sequence = {
  version: 1,
  timeline: [
    {
      effectId: FADE_EFFECT_ID,
      start: 0,
      end: 2,
      layer: 1,
    },
    {
      effectId: TEST_EFFECT_ID,
      start: 0,
      end: 3,
      layer: 0,
      startParams: {
        speed: -0.5,
        color: '#b497e5',
      },
    },
    {
      effectId: TEST_EFFECT_ID,
      start: 3,
      end: 25,
      layer: 0,
    },
    {
      effectId: TEST_EFFECT_ID,
      start: 25,
      end: 96.652001,
      layer: 0,
      startParams: {
        color: '#c48431',
        speed: 6,
      },
    },
  ],
};

timeline.parseData(sequence, assets, effects);
