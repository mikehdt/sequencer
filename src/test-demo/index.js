import { Mustang } from '../Mustang';
import audioFile from './assets/song.mp3';
import styles from '../styles/audio.scss';

// Player
const mustang = new Mustang();

const {
  player,
  timeline,
  helpers,
} = mustang;

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
        cheese: 'delicious',
      },
    },
    {
      id: 'other-thing',
      effectId: 'testEffect',
      start: 3,
      end: 25,
      layer: 1,
    },
  ],
};

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

timeline.parseData(sequence);
timeline.update(0);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

player.setAudio(audio);
player.setIsPlaying(true);
player.tick();

document.getElementById('play').addEventListener('click', () => player.play());
document.getElementById('pause').addEventListener('click', () => player.pause());
document.getElementById('stop').addEventListener('click', () => player.stop());
document.getElementById('jump').addEventListener('click', () => player.setCurrentTime(3));
