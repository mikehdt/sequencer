import { connectStore } from './Store';
import { ASSETS } from './Assets';
import { EFFECTS } from './Effects';

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
  let prevActiveAnimations = [];
  let prevTime = 0;

  const setAnimation = (props) => {
    const {
      id,
      start,
      end,
      layer,
      effectId,
      parameters,
    } = props || {};

const assets = store.get(ASSETS);
const effect = store.get(EFFECTS).find(item => item.id === effectId);

if (effect && effect.init) { effect.init(assets); }

    const animationData = {
      id,
      start,
      end,
      layer,
      effect,
      initParameters: parameters,
    };

    return animationData;
  };

  const update = (time) => {
    const isNew = animations.filter(item => (
      item.start <= time && item.end > time && !prevActiveAnimations.includes(item)
    ));

    const splitAnimations = splitActiveAndFinished(prevActiveAnimations, time);

    const {
      isFinished,
      isActive,
    } = splitAnimations;

    // Call effect constructors / destructors if they exist
    isFinished.forEach(item => (
      item.effect && item.effect.end && item.effect.end()
    ));

    isNew.forEach(item => (
      item.effect && item.effect.start && item.effect.start(item.parameters || {})
    ));

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
    // Put in a stop watching function later ons
    store.subscribe({ watch: 'player', key: 'currentTime', watchFn: update });
  };

  const parseData = (newData) => {
    if (!newData.version || newData.version !== TIMELINE_VERSION) {
      console.error('Timeline parsing failed: version mismatch.'); // eslint-disable-line no-console
      return;
    }

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
