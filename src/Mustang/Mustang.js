import audioFile from '../assets/song.mp3';
import data from '../assets/test.json';

import { toggleFullScreen } from '../helpers/fullscreen';
import { createStore } from './Store';
import { Player } from './Player';
import { Timeline } from './Timeline';

// -----

function Mustang() {}

// Audio
const audio = document.createElement('audio');
audio.src = audioFile;
audio.controls = true;
audio.style.position = 'absolute';
audio.style.width = '50rem';
audio.style.left = 'calc(50% - 25rem)';
audio.style.bottom = '2.5rem';
document.body.appendChild(audio);

// Fullscreen
const linkEl = document.createElement('a');
const linkElText = document.createTextNode('Fullscreen');
linkEl.appendChild(linkElText);
linkEl.addEventListener('click', () => toggleFullScreen(true));
document.body.appendChild(linkEl);

// Player
const testStore = createStore();
const testPlayer = new Player();
const testTimeline = new Timeline();

testTimeline.parseData(data);
testTimeline.update(0);

// testStore.subscribe({ watch: 'player', key: 'currentTime', watchFn: val => console.log(val) });

testPlayer.setAudio(audio);
testPlayer.setIsPlaying(true);
testPlayer.tick();

document.getElementById('play').addEventListener('click', () => testPlayer.play());
document.getElementById('pause').addEventListener('click', () => testPlayer.pause());
document.getElementById('stop').addEventListener('click', () => testPlayer.stop());
document.getElementById('jump').addEventListener('click', () => testPlayer.setCurrentTime(3));

export { Mustang };
