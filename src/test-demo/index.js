import { Mustang, helpers } from '../Mustang';
import audioFile from './assets/song.mp3';
import styles from '../styles/index.scss';

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
  assets,
  effects,
} = mustang;

const dom = helpers.getElementById(DOM_ID);

assets.add(CANVAS, helpers.canvasElement({ className: styles.leCanvas }));
assets.add(AUDIO, helpers.audioElement(audioFile, styles.audio));

player.setAudio(assets.getData(AUDIO));

effects.add(FADE_EFFECT_ID, fx.fadeEffect);
effects.add(TEST_EFFECT_ID, fx.testEffect);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

// DOM
dom.appendChild(assets.getData(CANVAS));
dom.appendChild(assets.getData(AUDIO));

document.getElementById('fullscreen').addEventListener('click', () => helpers.toggleFullScreen(true));

// Timeline
const sequence = {
  version: 1,
  timeline: [
    {
      name: 'fade in',
      effectId: FADE_EFFECT_ID,
      start: 0,
      end: 2,
      layer: 1,
    },
    {
      name: 'spinning thing 1',
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
      name: 'spinning thing 2',
      effectId: TEST_EFFECT_ID,
      start: 3,
      end: 25,
      layer: 0,
    },
    {
      name: 'spinning thing 3',
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
