export const IS_PLAYING = 'player/is_playing';
export const CURRENT_TIME = 'player/current_time';

const defaultState = {
  isPlaying: false,
  currentTime: 0, // seconds (natural for <audio> elements)
};

export const reduceState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case IS_PLAYING: {
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    }

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
