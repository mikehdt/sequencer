import { Mustang } from '../Mustang';
import audioFile from './assets/song.mp3';
import styles from '../styles/audio.scss';

import { testEffect } from './effects/testEffect';

// Player
const mustang = new Mustang();

const {
  player,
  timeline,
  helpers,
  assets,
  effects,
} = mustang;

// DOM
const dom = helpers.dom('root');
const audio = helpers.audioElement(audioFile, styles.audio);
const canvas = helpers.canvasElement();

dom.appendChild(audio);
dom.appendChild(canvas);

assets.add('dom', {
  asset: dom,
  type: 'dom',
});

assets.add('canvas', {
  asset: canvas,
  type: 'canvas',
});

effects.add('testEffect', testEffect);

// Fullscreen
const linkEl = document.createElement('a');
const linkElText = document.createTextNode('Fullscreen');
linkEl.appendChild(linkElText);
linkEl.addEventListener('click', () => helpers.toggleFullScreen(true));
document.body.appendChild(linkEl);

// Timeline
const sequence = {
  version: 1,
  timeline: [
    {
      id: 'thing',
      effectId: 'testEffect',
      start: 0,
      end: 3,
      layer: 0,
      parameters: {
        color: '#783456',
      },
    },
    {
      id: 'other-thing',
      effectId: 'testEffect',
      start: 3,
      end: 25,
      layer: 0,
    },
    {
      id: 'last-thing',
      effectId: 'testEffect',
      start: 25,
      end: 96.652001,
      layer: 0,
      parameters: {
        color: '#c48431',
        speed: 6,
      },
    },
  ],
};

timeline.parseData(sequence);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

player.setAudio(audio);

document.getElementById('play').addEventListener('click', () => player.play());
document.getElementById('pause').addEventListener('click', () => player.pause());
document.getElementById('stop').addEventListener('click', () => player.stop());
