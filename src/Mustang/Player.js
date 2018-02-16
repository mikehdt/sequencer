import { connectStore } from './Store';

const MILLISECONDS = 1000;
const PLAYER = 'player';

const reducers = {
  isPlaying: (state, isPlaying) => ({
    ...state,
    isPlaying,
  }),

  currentTime: (state, currentTime) => ({
    ...state,
    currentTime,
  }),

  playbackRate: (state, playbackRate) => ({
    ...state,
    playbackRate,
  }),
};

const convertTimeToSeconds = timeInMs => timeInMs / MILLISECONDS;
const pauseAudio = audio => audio && audio.pause();
const playAudio = audio => audio && audio.play();

export function Player() {
  const store = connectStore();
  let audio = null;

  const defaultState = {
    isPlaying: false,
    currentTime: 0, // ms
    playbackRate: 1,
  };

  store.set('player', defaultState);

  const syncAudio = (time) => {
    if (audio) {
      audio.currentTime = convertTimeToSeconds(time);
    }
  };

  const getStore = () => store.get(PLAYER);
  const getCurrentTime = () => getStore().currentTime;
  const isPlaying = () => getStore().isPlaying;

  return {
    isPlaying,

    setAudio: (newAudio) => {
      pauseAudio(audio);
      audio = newAudio;
      syncAudio(getCurrentTime());

      if (isPlaying()) {
        playAudio(audio);
      }
    },

    play: () => {
      playAudio(audio);
    },

    stop: () => {
      pauseAudio(audio);
    },
  };
}
