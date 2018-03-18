import { Sequencer } from '../Sequencer';
import { bootstrapSequence } from '../Sequencer/helpers/bootstrap';
import audioFile from './assets/song.mp3';
import styles from '../styles/index.scss';

import * as fx from './effects';

// Player
const sequencer = new Sequencer();

bootstrapSequence(sequencer, 'root', audioFile, {
  canvasClass: styles.leCanvas,
  canvasWidth: 320,
  canvasHeight: 180,
  audioClass: styles.audio,
});

const {
  timeline,
  assets,
  effects,
} = sequencer;

effects.add(fx.FADE_EFFECT_ID, fx.fadeEffect);
effects.add(fx.TEST_EFFECT_ID, fx.testEffect);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

// Timeline
const sequence = {
  version: 1,
  timeline: [
    {
      name: 'fade in',
      effectId: fx.FADE_EFFECT_ID,
      start: 0,
      end: 2,
      layer: 1,
    },
    {
      name: 'spinning thing 1',
      effectId: fx.TEST_EFFECT_ID,
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
      effectId: fx.TEST_EFFECT_ID,
      start: 3,
      end: 25,
      layer: 0,
    },
    {
      name: 'spinning thing 3',
      effectId: fx.TEST_EFFECT_ID,
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
