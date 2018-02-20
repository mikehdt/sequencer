import { connectStore } from './Store';

// Action types
export const CURRENT_TIME = 'player/current_time';

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


// Notes / Todo:
// * Some way to request current audio slice for effects to use as vis input?

const PLAYER = 'player';

// const isPlaying = audio => audio && !audio.paused && !audio.ended && audio.readyState > 2;
const playAudio = audio => audio && audio.play();
const pauseAudio = audio => audio && audio.pause();
const syncAudioTime = (audio, time = 0) => { audio.currentTime = time; };

function Player() {
  const store = connectStore();
  let audioEl = null;

  const getState = () => store.get(PLAYER);

  const setState = newState => store.set(PLAYER, newState);

  const getCurrentTime = () => getState().currentTime;

  const setCurrentTime = (time) => {
    const currentState = getState();
    const newState = reduceState(currentState, { type: CURRENT_TIME, time });
    setState(newState);
  };

  const tick = () => {
    if (audioEl) {
      const { currentTime } = audioEl;

      setCurrentTime(currentTime);
      requestAnimationFrame(tick);
    }
  };

  const play = () => playAudio(audioEl);

  const pause = () => pauseAudio(audioEl);

  const stop = () => {
    syncAudioTime(audioEl, 0);
    pauseAudio(audioEl);
  };

  const clearAudioHandlers = (audio) => {
    if (!audio) {
      return;
    }

    audio.removeEventListener('play', play);
    audio.removeEventListener('pause', pause);
  };

  const setAudioHandlers = (audio) => {
    audio.addEventListener('play', play);
    audio.addEventListener('pause', pause);
  };

  const clearAudio = (newAudioEl = null) => {
    clearAudioHandlers(audioEl);
    audioEl = newAudioEl;
  };

  const setAudio = (newAudioEl) => {
    clearAudio(newAudioEl);
    syncAudioTime(audioEl, getCurrentTime());
    setAudioHandlers(audioEl);
    requestAnimationFrame(tick);
  };

  setState(reduceState());

  return {
    play,
    pause,
    stop,
    setAudio,
    clearAudio,
  };
}

export { Player };
