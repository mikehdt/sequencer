import { canvasElement } from './canvas';
import { audioElement } from './audio';
import { toggleFullScreen } from './fullscreen';

const CANVAS = 'canvas';
const AUDIO = 'audio';
const DOM = 'dom';
const FULLSCREEN_ID = 'fullscreen';
const EVENT_CLICK = 'click';

function bootstrapSequence(sequencer, ROOT_ID, audioFile, {
  canvasClass = '',
  canvasWidth = 1280,
  canvasHeight = 720,
  audioClass = '',
}) {
  const {
    player,
    assets,
  } = sequencer;

  // Not sure if this should be here only, or specified outside for re-use
  const dom = document.getElementById(ROOT_ID);

  assets.add(DOM, dom);

  assets.add(CANVAS, canvasElement({
    width: canvasWidth,
    height: canvasHeight,
    className: canvasClass,
  }));

  assets.add(AUDIO, audioElement({
    audioFile,
    volume: 0.15,
    className: audioClass,
  }));

  player.setAudio(assets.getData(AUDIO));

  // DOM
  dom.appendChild(assets.getData(CANVAS));
  dom.appendChild(assets.getData(AUDIO));

  document.getElementById(FULLSCREEN_ID)
    .addEventListener(EVENT_CLICK, () => toggleFullScreen(true));
}

export { bootstrapSequence };
