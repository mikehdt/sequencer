import { Mustang } from '../Mustang';
import audioFile from './assets/song.mp3';
import styles from '../styles/audio.scss';

import { TestEffect } from './effects/testEffect';

// Player
const mustang = new Mustang();

const {
  player,
  timeline,
  helpers,
} = mustang;

// DOM
const dom = helpers.dom('root');
const audio = helpers.audioElement(audioFile, styles.audio);
const canvas = helpers.canvasElement();

dom.appendChild(audio);
dom.appendChild(canvas);

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
      effect: new TestEffect({ canvas }),
      start: 0,
      end: 3,
      layer: 0,
      parameters: {
        color: '#783456',
      },
    },
    {
      id: 'other-thing',
      effect: new TestEffect({ canvas }),
      start: 3,
      end: 25,
      layer: 1,
    },
    {
      id: 'last-thing',
      effect: new TestEffect({ canvas }),
      start: 25,
      end: 96.2,
      layer: 1,
      parameters: {
        color: '#c48431',
      },
    },
  ],
};

timeline.parseData(sequence);
timeline.update(0);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

player.setAudio(audio);

document.getElementById('play').addEventListener('click', () => player.play());
document.getElementById('pause').addEventListener('click', () => player.pause());
document.getElementById('stop').addEventListener('click', () => player.stop());
document.getElementById('jump').addEventListener('click', () => player.setCurrentTime(3));
