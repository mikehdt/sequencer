// Common Effect wrapper?

export const TEST_EFFECT_ID = 'testEffect';

function testEffect(allAssets) {
  const needs = [
    // List of needed resources
    'canvas',
  ];

  const assets = {};

  const parameters = {
    color: '#beefed',
    speed: 1,
  };

  if (allAssets) {
    // This feels messy, like it should be lifted outside and passed in
    allAssets
      .filter(item => needs.includes(item.id))
      .forEach((item) => {
        assets[item.id] = item.asset; // ???
      });

    assets.ctx = assets.canvas.getContext('2d');
  }

  function start(startParams) {
    parameters.color = (startParams && startParams.color) || parameters.color;
    parameters.speed = (startParams && startParams.speed) || parameters.speed;
  }

  function update(progress) {
    const { ctx } = assets;
    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = parameters.color;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(360 * progress.unitInterval * parameters.speed * (Math.PI / 180));
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  }

  function end() {}

  return {
    id: TEST_EFFECT_ID,
    needs,
    start,
    update,
    end,
  };
}

export { testEffect };
