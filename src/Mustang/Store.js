import deepEqual from 'deep-equal';

const global = window || document;

function createStore(initialState = {}) {
  const store = initialState;
  const subscribers = {};

  if (global.store) {
    // eslint-disable-next-line no-console
    console.error('A store already exists!');
    return global.store;
  }

  global.store = {
    getState: () => store,

    clearState: () => {
      Object.keys(store)
        .forEach((element) => {
          // Kind of brutal and messy, but it works... so far
          if (subscribers[element]) {
            delete subscribers[element];
          }

          delete store[element];
        });
    },

    get: (element) => {
      if (store[element]) {
        return store[element];
      }

      // eslint-disable-next-line no-console
      console.warn(`Store key "${element}" has not been set.`);
      return null;
    },

    set: (element, newValue) => {
      console.log(`setting "${element}" to`, newValue);
      const oldValue = store[element];
      const isEqual = deepEqual(oldValue, newValue);

      if (!isEqual) {
        store[element] = newValue;

        if (subscribers[element] && subscribers[element].length) {
          subscribers[element].forEach((watcher) => {
            const { watchFn } = watcher;
            watchFn(newValue, oldValue);
          });
        }
      }
    },

    getSubscribers: () => ({ ...subscribers }),

    subscribe: (watchFn, element, id = false) => {
      if (typeof subscribers[element] === 'undefined') {
        subscribers[element] = [];
      }

      subscribers[element].push({ id, watchFn });
    },

    unsubscribe: (element, id = false) => {
      subscribers[element] = (id !== false)
        ? subscribers[element].filter(watcher => watcher.id !== id)
        : subscribers[element] = [];
    },
  };

  return global.store;
}

function connectStore() {
  if (global.store) {
    return global.store;
  }

  // eslint-disable-next-line no-console
  console.error('Cannot connect to store, no store is available.');
  return {};
}

export {
  createStore,
  connectStore,
};


// createStore({
//   one: {
//     test: 'hello',
//   },
//   two: {
//     test: 'there',
//   },
//   three: {
//     test: 'you',
//   },
// });

// global.store = createStore({
//   one: {
//     two: {
//       three: [{ four: 'hello' }],
//     },
//   },
// });

// const findThing = path => state => path.reduce((keys, searchItem) => (
//   (keys && keys[searchItem])
//     ? keys[searchItem]
//     : null
// ), state);

// console.log(findThing(['one', 'two', 'three', 0, 'four'])(global.store.getState()));
