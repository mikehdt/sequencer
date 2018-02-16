import audioFile from '../assets/song.mp3';

import { toggleFullScreen } from '../helpers/fullscreen';
import { createStore } from './Store';
import { Player } from './Player';

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
createStore();
const testPlayer = new Player();

testPlayer.setAudio(audio);

export { Mustang };
