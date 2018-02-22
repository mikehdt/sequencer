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
          asset: action.asset,
          ...action.extraProps,
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

  const add = (id, asset, extraProps = {}) => {
    setState(reduceState(getState(), {
      type: ADD_ASSET,
      id,
      asset,
      extraProps,
    }));
  };

  const get = (id) => {
    const assetItem = getState().find(asset => asset.id === id);

    if (!assetItem) {
      console.warn(`Can't find asset with ID "${id}"`); // eslint-disable-line no-console
      return {};
    }

    return assetItem.asset;
  };

  const list = () => getState();

  setState(reduceState());

  return {
    add,
    get,
    list,
  };
}

export { Assets };
