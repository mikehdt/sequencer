import { connectStore } from './Store';

export const ASSETS = 'assets/ASSETS';

// Action types
export const ADD = 'assets/ADD';

// Reducers
const defaultState = [];

export const reduceState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD: {
      return [
        ...state,
        {
          id: action.id,
          data: action.data,
          ...action.extraProps,
        },
      ];
    }

    default: {
      return state;
    }
  }
};

function Assets(storeKey = ASSETS) {
  if (!storeKey) {
    console.error('A key is required to create a new Assets list.'); // eslint-disable-line no-console
    return {};
  }

  const store = connectStore(storeKey);

  const getState = () => store.get();

  const setState = (newState) => {
    store.set(newState);
  };

  const add = (id, data) => {
    setState(reduceState(getState(), {
      type: ADD,
      id,
      data,
    }));
  };

  const get = id => (
    getState().find(item => item.id === id)
    || console.warn(`Can't find ${storeKey} with ID "${id}"`) // eslint-disable-line no-console
  );

  const getData = id => (
    getState().find(item => item.id === id).data
    || console.warn(`Can't find data for ${storeKey} with ID "${id}"`) // eslint-disable-line no-console
  );

  const list = () => getState();

  setState(reduceState());

  return {
    add,
    get,
    getData,
    list,
  };
}

export { Assets };
