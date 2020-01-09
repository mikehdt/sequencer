import { connectStore } from './Store';

const MILLISECONDS = 1000;
const EVENT_PLAY = 'play';
const EVENT_PAUSE = 'pause';
const EVENT_KEYUP = 'keyup';

export const PLAYER = 'player/PLAYER';

// Action types
export const CURRENT_TIME = 'player/CURRENT_TIME';

// Reducers
const defaultState = {
  currentTime: 0, // seconds (natural for <audio> elements)
};

export const reduceState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case CURRENT_TIME: {
      return {
        ...state,
        currentTime: action.time,
      };
    }

    default: {
      return state;
    }
  }
};

const playAudio = audio => audio && audio.play();
const pauseAudio = audio => audio && audio.pause();
const syncAudioTime = (audio, time = 0) => {
  audio.currentTime = time;
};

function Player() {
  const store = connectStore(PLAYER);
  let audioEl = null;
  const prevTime = {
    audio: 0,
    frame: 0,
  };

  const getState = () => store.get();

  const setState = newState => store.set(newState);

  const getCurrentTime = () => getState().currentTime;

  const setCurrentTime = time => {
    setState(
      reduceState(getState(), {
        type: CURRENT_TIME,
        time,
      }),
    );
  };

  const play = () => playAudio(audioEl);

  const pause = () => pauseAudio(audioEl);

  const stop = () => {
    syncAudioTime(audioEl, 0);
    pauseAudio(audioEl);
  };

  const checkPause = e => {
    if (audioEl && e.key && e.key === ' ') {
      const { paused } = audioEl;

      if (paused) {
        play();
      } else {
        pause();
      }
    }
  };

  const tick = currentFrameTime => {
    if (audioEl) {
      const { currentTime: currentAudioTime, paused } = audioEl;

      const { audio: prevAudioTime, frame: prevFrameTime } = prevTime;

      const isPlaying = !paused;

      if (isPlaying && currentAudioTime === prevAudioTime) {
        // Firefox doesn't update audio.currentTime at 60fps, so it animates
        // much more slowly, at around 20fps. Need to use rAF time delta to
        // mitigate. See: https://bugzilla.mozilla.org/show_bug.cgi?id=587465
        const frameDelta = (currentFrameTime - prevFrameTime) / MILLISECONDS;
        setCurrentTime(currentAudioTime + frameDelta);
      } else {
        // Only update previous tick if the audio has also ticked, or if the
        // frame head has been moved whilst playing
        prevTime.audio = currentAudioTime;
        prevTime.frame = currentFrameTime;
        setCurrentTime(currentAudioTime);
      }

      requestAnimationFrame(tick);
    }
  };

  const clearAudioHandlers = audio => {
    if (!audio) {
      return;
    }

    audio.removeEventListener(EVENT_PLAY, play);
    audio.removeEventListener(EVENT_PAUSE, pause);
    window.removeEventListener(EVENT_KEYUP, checkPause);
  };

  const setAudioHandlers = audio => {
    audio.addEventListener(EVENT_PLAY, play);
    audio.addEventListener(EVENT_PAUSE, pause);
    window.addEventListener(EVENT_KEYUP, checkPause);
  };

  const changeAudio = (newAudioEl = null) => {
    clearAudioHandlers(audioEl);
    audioEl = newAudioEl;
  };

  const setAudio = newAudioEl => {
    changeAudio(newAudioEl);
    syncAudioTime(audioEl, getCurrentTime());
    setAudioHandlers(audioEl);
    requestAnimationFrame(tick);
  };

  const setTime = time => {
    setCurrentTime(time);

    if (audioEl) {
      syncAudioTime(audioEl, time);
    }
  };

  setState(reduceState());

  return {
    play,
    pause,
    stop,
    setAudio,
    setTime,
  };
}

export { Player };
