export const EFFECT_ID = 'testEffect';

function testEffect() {
  const needs = [
    'canvas',
  ];

  let assets = {};

  const parameters = {
    color: '#beefed',
    speed: 1,
  };

  const mergeStartParams = (startParams) => {
    Object.keys(startParams)
      .forEach((key) => {
        parameters[key] = startParams[key];
      });
  };

  const start = ({ neededAssets, startParams }) => {
    assets = neededAssets;
    assets.ctx = assets.canvas.getContext('2d');

    mergeStartParams(startParams);
  };

  const update = (progress) => {
    const { ctx } = assets;
    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = parameters.color;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(360 * progress.unitInterval * parameters.speed * (Math.PI / 180));
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  };

  return {
    needs,
    start,
    update,
  };
}

export { testEffect };
