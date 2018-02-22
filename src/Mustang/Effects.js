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
          id: action.id,
          effect: action.effect,
        },
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

  const add = (id, effect) => {
    setState(reduceState(getState(), {
      type: ADD_EFFECT,
      id,
      effect,
    }));
  };

  const get = id => getState().find(effect => effect.id === id);

  const list = () => getState();

  setState(reduceState());

  return {
    add,
    get,
    list,
  };
}

export { Effects };
