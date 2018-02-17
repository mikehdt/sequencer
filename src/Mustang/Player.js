import { connectStore } from './Store';
import {
  IS_PLAYING,
  CURRENT_TIME,
  reduceState,
} from './PlayerReducers';

// Notes:
// * Seek on browser <audio> element thinks it's paused?
// * Could consider using event handlers to pick up <audio> control interaction?

const MILLISECONDS = 1000;
const PLAYER = 'player';

const defaultState = {
  isPlaying: false,
  currentTime: 0, // ms
};

const convertToSeconds = msTime => msTime / MILLISECONDS;
const convertToMilliseconds = sTime => sTime * MILLISECONDS;

// Seems to get sad if the audio element is `seeked`?
// const isPlaying = audio => audio && !audio.paused && !audio.ended && audio.readyState > 2;
const playAudio = audio => audio && audio.play();
const pauseAudio = audio => audio && audio.pause();
const syncAudio = (audio, time = 0) => {
  audio.currentTime = convertToSeconds(time);
};

export function Player() {
  const store = connectStore();
  let audio = null;

  const getState = () => store.get(PLAYER);

  const setState = newState => store.set(PLAYER, newState);

  const getIsPlaying = () => getState().isPlaying;

  const setIsPlaying = (isPlaying) => {
    const currentState = getState();
    const newState = reduceState(currentState, { type: IS_PLAYING, isPlaying });
    setState(newState);
  };

  const getCurrentTime = () => getState().currentTime;

  const setCurrentTime = (time) => {
    const currentState = getState();
    const newState = reduceState(currentState, { type: CURRENT_TIME, time });
    setState(newState);
  };

  const setAudio = (newAudio) => {
    pauseAudio(audio);
    audio = newAudio;
    syncAudio(audio, getCurrentTime());
  };

  const tick = () => {
    const { currentTime } = audio;
    const newTime = convertToMilliseconds(currentTime);
    setCurrentTime(newTime);

    if (getIsPlaying()) { requestAnimationFrame(tick); }
  };

  const play = () => {
    setIsPlaying(true);
    playAudio(audio);
    requestAnimationFrame(tick);
  };

  const pause = () => {
    pauseAudio(audio);
  };

  const stop = () => {
    setIsPlaying(false);
    pauseAudio(audio);
    setCurrentTime(0);
    syncAudio(audio, 0);
  };

  setState(defaultState);

  return {
    setAudio,
    play,
    pause,
    stop,
  };
}
