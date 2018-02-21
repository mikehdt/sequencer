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
          type: action.type,
          ...action.asset,
        },
      ];
    }

    default: {
      return state;
    }
  }
};

export const ASSETS = 'assets';

function Assets() {
  const store = connectStore();

  const getState = () => store.get(ASSETS);

  const setState = (newState) => {
    store.set(ASSETS, newState);
  };

  const add = (assetId, asset) => {
    setState(reduceState(getState(), {
      type: ADD_ASSET,
      id: assetId,
      asset,
    }));
  };

  const get = assetId => getState().find(asset => asset.id === assetId);

  const list = () => getState();

  setState(reduceState());

  return {
    add,
    get,
    list,
  };
}

export { Assets };
