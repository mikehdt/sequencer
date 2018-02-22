export const FADE_EFFECT_ID = 'fadeEffect';

function fadeEffect(allAssets) {
  const needs = [
    // List of needed assets
    'canvas',
  ];

  const assets = {};

  if (allAssets) {
    // This feels messy, like it should be lifted outside and passed in
    allAssets
      .filter(item => needs.includes(item.id))
      .forEach((item) => {
        assets[item.id] = item.asset; // ???
      });

    assets.ctx = assets.canvas.getContext('2d');
  }

  const parameters = {
    color: 'rgb(255, 255, 255)',
  };

  const start = (initParams) => {
    console.log('effect init params', initParams);
  };

  const update = (progress) => {
    const {
      ctx,
      canvas: {
        width,
        height,
      },
    } = assets;

    const fade = Math.round((1 - progress.unitInterval) * 255);
    parameters.color = `rgb(${fade}, ${fade}, ${fade})`;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = parameters.color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  };


  return {
    id: FADE_EFFECT_ID,
    needs,
    start,
    update,
  };
}

export { fadeEffect };
