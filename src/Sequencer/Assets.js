import { connectStore } from './Store';

// Action types
export const ADD_ASSET = 'assets/add';

// Reducers
const defaultState = [];

export const reduceState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_ASSET: {
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

function Assets(storeKey) {
  if (!storeKey) {
    console.error('A key is required to create a new Assets list.'); // eslint-disable-line no-console
    return {};
  }

  const store = connectStore();

  const getState = () => store.get(storeKey);

  const setState = (newState) => {
    store.set(storeKey, newState);
  };

  const add = (id, data) => {
    setState(reduceState(getState(), {
      type: ADD_ASSET,
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
