import { connectStore } from './Store';

// Action types
export const ADD_EFFECT = 'effects/add';
export const REMOVE_EFFECT = 'effects/remove';

// Reducers
const defaultState = [];

export const reduceState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_EFFECT: {
      return [
        ...state,
        {
          id: action.effectId,
          effect: action.effect,
        },
      ];
    }

    case REMOVE_EFFECT: {
      return [
        ...state.filter(effect => effect.id !== action.effectId),
      ];
    }

    default: {
      return state;
    }
  }
};

export const EFFECTS = 'effects';

function Effects() {
  const store = connectStore();

  const getState = () => store.get(EFFECTS);

  const setState = (newState) => {
    store.set(EFFECTS, newState);
  };

  const add = (effectId, effect) => {
    setState(reduceState(getState(), {
      type: ADD_EFFECT,
      effectId,
      effect,
    }));
  };

  const remove = (effectId) => {
    setState(reduceState(getState(), {
      type: REMOVE_EFFECT,
      effectId,
    }));
  };

  const get = effectId => getState().find(effect => effect.id === effectId);

  const list = () => getState();

  setState(reduceState());

  return {
    add,
    remove,
    get,
    list,
  };
}

export { Effects };
