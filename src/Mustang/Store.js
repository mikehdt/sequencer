import { updatedDiff } from 'deep-object-diff';

const global = window || document;

// Nothing fancy, just a pure JS store with some simple up-to-two level ability
// to subscribe to set changes.
function createStore(initialState = {}) {
  if (global.store) {
    console.error('The store has already been instantiated!'); // eslint-disable-line no-console
    return global.store;
  }

  const store = initialState;
  const subscribers = {};
  const WATCHERS_KEY = '__watchers__';

  const getState = () => store;

  const clearState = () => {
    Object.keys(store)
      .forEach((element) => {
        // Kind of brutal and messy, but it works... so far
        if (subscribers[element]) {
          delete subscribers[element];
        }

        delete store[element];
      });
  };

  const getKey = (element) => {
    if (store[element]) {
      return store[element];
    }

    console.warn(`Store key "${element}" has not been initialised.`); // eslint-disable-line no-console
    return null;
  };

  const setKey = (parentKey, newValue) => {
    const oldValue = store[parentKey];
    const diffKeys = Object.keys(updatedDiff(oldValue, newValue));
    const elementSubscribers = subscribers[parentKey] || [];

// ...something funky up with this when working with a vanilla array []
    if (diffKeys.length || typeof oldValue === 'undefined' || oldValue.length !== newValue.length) {
      store[parentKey] = newValue;
    }

    Object.keys(elementSubscribers)
      .filter(key => diffKeys.includes(key) && key !== WATCHERS_KEY)
      .forEach((key) => {
        elementSubscribers[key][WATCHERS_KEY]
          .forEach((watcher) => {
            watcher.watchFn(newValue && newValue[key], oldValue && oldValue[key]);
          });
      });

    if (elementSubscribers[WATCHERS_KEY]) {
      elementSubscribers[WATCHERS_KEY].forEach((watcher) => {
        watcher.watchFn(newValue, oldValue);
      });
    }
  };

  // There is probably a better way to handle different depths of subscribers...
  const subscribeKey = (props) => {
    const {
      watch,
      key,
      watchFn,
      id = false,
    } = props;

    if (typeof subscribers[watch] === 'undefined') { subscribers[watch] = {}; }

    if (key) {
      if (typeof subscribers[watch][key] === 'undefined') {
        subscribers[watch][key] = { [WATCHERS_KEY]: [] };
      }

      subscribers[watch][key][WATCHERS_KEY].push({ id, watchFn });
    } else {
      if (typeof subscribers[watch][WATCHERS_KEY] === 'undefined') {
        subscribers[watch][WATCHERS_KEY] = [];
      }

      subscribers[watch][WATCHERS_KEY].push({ id, watchFn });
    }
  };

  const unsubscribeKey = (props) => {
    const {
      watch,
      key,
      id,
    } = props;

    if (key) {
      subscribers[watch][key][WATCHERS_KEY] = (id)
        ? subscribers[watch][key][WATCHERS_KEY].filter(watcher => watcher.id !== id)
        : subscribers[watch][key][WATCHERS_KEY] = [];
    } else {
      subscribers[watch][WATCHERS_KEY] = (id)
        ? subscribers[watch][WATCHERS_KEY].filter(watcher => watcher.id !== id)
        : subscribers[watch][WATCHERS_KEY] = [];
    }
  };

  global.store = {
    getState,
    clearState,
    get: getKey,
    set: setKey,
    subscribe: subscribeKey,
    unsubscribe: unsubscribeKey,
  };

  return global.store;
}

function connectStore() {
  if (global.store) {
    return global.store;
  }

  console.error('Cannot connect to store, no store is available.'); // eslint-disable-line no-console
  return {};
}

export {
  createStore,
  connectStore,
};


// const findThing = path => state => path.reduce((keys, searchItem) => (
//   (keys && keys[searchItem])
//     ? keys[searchItem]
//     : null
// ), state);

// console.log(findThing(['one', 'two', 'three'])(global.store.getState()));
