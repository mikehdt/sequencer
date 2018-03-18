import { connectStore } from './Store';
import { PLAYER } from './Player';

export const TIMELINE = 'timeline/TIMELINE';

const TIMELINE_VERSION = 1;

// Sort handlers
const byLayer = (a, b) => a.layer - b.layer;

const splitActiveAndFinished = (animations, time) => (
  // Limitation: By checking item.end <= here, the _very last_ item will not
  // display its last frame. Consideration... either have start/ends always
  // overlap (undesirable), add in specific condition for end of audio (hacky)
  // or just make sure the last item in a sequence has its end set beyond the
  // audio time (hrmmm), automatically adding 0.000001 to the last item (...)
  animations.reduce((acc, item) => ((item.start > time || item.end <= time)
    ? {
      ...acc,
      isFinished: [
        ...acc.isFinished,
        item,
      ],
    }
    : {
      ...acc,
      isActive: [
        ...acc.isActive,
        item,
      ],
    }
  ), { isFinished: [], isActive: [] })
);

function Timeline() {
  const store = connectStore();
  let assets = [];
  let effects = [];
  let animations = [];
  let prevActiveAnimations = [];
  let prevTime = 0;

  const setAnimation = (props) => {
    const {
      start,
      end,
      layer,
      effectId,
      startParams,
    } = props || {};

    const Effect = effects.getData(effectId);

    if (!Effect) {
      console.warn(`Effect "${effectId}" was requested but couldn't be found.`); // eslint-disable-line no-console
      return {};
    }

    const effect = new Effect();

    const animationData = {
      start,
      end,
      layer,
      effect,
      startParams,
    };

    return animationData;
  };

  const update = (time = prevTime) => {
    const isNew = animations.filter(item => (
      item.start <= time && item.end > time && !prevActiveAnimations.includes(item)
    ));

    const splitAnimations = splitActiveAndFinished(prevActiveAnimations, time);

    const {
      isFinished,
      isActive,
    } = splitAnimations;

    // Call effect constructors / destructors if they exist
    isFinished.forEach(item => item.effect && item.effect.end && item.effect.end());

    isNew.forEach((item) => {
      const neededAssets = assets
        .list()
        .filter(asset => item.effect.needs && item.effect.needs.includes(asset.id))
        .reduce((acc, asset) => ({
          ...acc,
          [asset.id]: asset.data,
        }), {});

      return (
        item.effect && item.effect.start && item.effect.start({
          startParams: item.startParams || {},
          neededAssets,
        })
      );
    });

    const activeAnimations = [
      ...isActive,
      ...isNew,
    ].sort(byLayer);

    const commonTimeOffsets = {
      absolute: time,
      frameDelta: time - prevTime,
    };

    activeAnimations.forEach(item => (
      item.effect && item.effect.update({
        ...commonTimeOffsets,
        relative: time - item.start,
        unitInterval: (time - item.start) / (item.end - item.start),
      })
    ));

    prevActiveAnimations = activeAnimations;
    prevTime = time;
  };

  const subscribeToPlayer = () => {
    store.subscribe({ watch: PLAYER, key: 'currentTime', watchFn: update });
  };

  const parseData = (newData, currentAssets, currentEffects) => {
    if (!newData.version || newData.version !== TIMELINE_VERSION) {
      console.error('Timeline parsing failed: version mismatch.'); // eslint-disable-line no-console
      return;
    }

    assets = currentAssets;
    effects = currentEffects;

    const { timeline } = newData;

    animations = timeline
      .map(item => setAnimation(item))
      .sort(byLayer);

    subscribeToPlayer();

    update(prevTime);
  };

  return {
    parseData,
    update,
  };
}

export { Timeline };
