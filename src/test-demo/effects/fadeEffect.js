export const FADE_EFFECT_ID = 'fadeEffect';

function fadeEffect() {
  const needs = [
    'canvas',
  ];

  const assets = {};

  const parameters = {
    color: 'rgba(255,255,255, 1)',
  };

  const start = ({ allAssets }) => {
    // This feels messy, like it should be lifted outside and passed in
    allAssets
      .filter(item => needs.includes(item.id))
      .forEach((item) => {
        assets[item.id] = item.asset; // ???
      });

    assets.ctx = assets.canvas.getContext('2d');
  };

  const update = (progress) => {
    const {
      ctx,
      canvas: {
        width,
        height,
      },
    } = assets;

    const fade = (1 - progress.unitInterval);
    parameters.color = `rgba(255,255,255, ${fade})`;

    ctx.save();
    ctx.fillStyle = parameters.color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  };


  return {
    needs,
    start,
    update,
  };
}

export { fadeEffect };
