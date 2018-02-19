import { connectStore } from './Store';

const TIMELINE_VERSION = 1;

const setAnimation = (props) => {
  const {
    id,
    start,
    end,
    layer,
    effect,
    parameters,
  } = props || {};

  const animationData = {
    id,
    start,
    end,
    layer,
    effect,
    parameters,
  };

  return animationData;
};

// Sort handlers
const byLayer = (a, b) => a.layer - b.layer;

const sortFinishedAnimations = (animations, time) => (
  animations.reduce((acc, item) => ((item.start > time || item.end <= time)
    ? {
      ...acc,
      isFinished: [
        ...acc.isFinished,
        item,
      ],
    } : {
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
  let animations = [];
  let activeAnimations = [];
  let prevTime = 0;

  const parseData = (newData) => {
    if (!newData.version || newData.version !== TIMELINE_VERSION) {
      console.error('Timeline parsing failed: version mismatch.'); // eslint-disable-line no-console
      return;
    }

    const { timeline } = newData;

    animations = timeline
      .map(item => setAnimation(item))
      .sort(byLayer);
  };

  const update = (time) => {
    const commonTimeOffsets = {
      absolute: time,
      frameDelta: time - prevTime,
    };

    const isNew = animations
      .filter(item => item.start <= time && item.end > time && !activeAnimations.includes(item));

    const {
      isFinished,
      isActive,
    } = sortFinishedAnimations(activeAnimations, time);

    // Call effect constructors / destructors if they exist
    isFinished.forEach(item => item.effect.end && item.effect.end());
    isNew.forEach(item => item.effect.start && item.effect.start(item.parameters));

    activeAnimations = [
      ...isActive,
      ...isNew,
    ].sort(byLayer);

    activeAnimations.forEach(item => item.effect.update({
      ...commonTimeOffsets,
      relative: time - item.start,
      unitInterval: (time - item.start) / (item.end - item.start),
    }));

    prevTime = time;
  };

  // Put in a watch / stop watching function later ons
  store.subscribe({ watch: 'player', key: 'currentTime', watchFn: update });

  return {
    parseData,
    update,
  };
}

export { Timeline };
