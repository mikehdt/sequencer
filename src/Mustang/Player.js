import { connectStore } from './Store';
import {
  IS_PLAYING,
  CURRENT_TIME,
  reduceState,
} from './PlayerReducers';

// Notes:
// * Seek on browser <audio> element thinks it's paused?
// * Could consider using event handlers to pick up <audio> control interaction?
// * Some way to request current audio slice for effects to use as vis input?

// const MILLISECONDS = 1000;
const PLAYER = 'player';

// const convertToSeconds = msTime => msTime / MILLISECONDS;
// const convertToMilliseconds = sTime => sTime * MILLISECONDS;

// const isPlaying = audio => audio && !audio.paused && !audio.ended && audio.readyState > 2;
const playAudio = audio => audio && audio.play();
const pauseAudio = audio => audio && audio.pause();
const syncAudio = (audio, time = 0) => {
  audio.currentTime = time;
};

function Player() {
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

  const setCurrentTime = (time, shouldSyncAudio = true) => {
    const currentState = getState();
    const newState = reduceState(currentState, { type: CURRENT_TIME, time });
    setState(newState);

    // Split concerns? Maybe instead create a new function that composes these
    if (shouldSyncAudio) {
      syncAudio(audio, time);
    }
  };

  const setAudio = (newAudio) => {
    pauseAudio(audio);
    audio = newAudio;
    syncAudio(audio, getCurrentTime());
  };

  const tick = () => {
    const { currentTime } = audio;
    const newTime = currentTime;
    setCurrentTime(newTime, false);

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
  };

  setState(reduceState());

  return {
    setAudio,
    play,
    pause,
    stop,
    // dev
    setCurrentTime,
    setIsPlaying,
    tick,
  };
}

export { Player };
