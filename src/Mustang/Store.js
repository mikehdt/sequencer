import { diff } from 'deep-object-diff';

const global = window || document;
const checkUndefined = (theItem, initValue) => (typeof theItem !== 'undefined' ? theItem : initValue);

// Subscribers could probably be reworked with Proxies

// Nothing fancy, just a pure JS store with some simple up-to-two level ability
// to subscribe to set changes.
function createStore(initialState = {}) {
  if (global.store) {
    console.error('The store has already been initialised!'); // eslint-disable-line no-console
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

    console.warn(`Store key "${element}" hasn't been set.`); // eslint-disable-line no-console
    return null;
  };

  const setKey = (parentKey, newValue) => {
    const oldValue = store[parentKey];
    const diffKeys = Object.keys(diff(oldValue, newValue));
    const elementSubscribers = subscribers[parentKey] || [];

    if (diffKeys.length || typeof oldValue === 'undefined') {
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

    subscribers[watch] = checkUndefined(subscribers[watch], {});

    if (key) {
      subscribers[watch][key] = checkUndefined(subscribers[watch][key], { [WATCHERS_KEY]: [] });
      subscribers[watch][key][WATCHERS_KEY] = [
        ...subscribers[watch][key][WATCHERS_KEY],
        {
          id,
          watchFn,
        },
      ];
    } else {
      subscribers[watch][WATCHERS_KEY] = checkUndefined(subscribers[watch][WATCHERS_KEY], []);
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

  console.error("Can't connect to store, store hasn't been initialised."); // eslint-disable-line no-console
  return {};
}

export {
  createStore,
  connectStore,
};
