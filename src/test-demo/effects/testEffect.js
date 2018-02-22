// Common Effect wrapper?

function testEffect(initParams) {
  const { canvas } = initParams;

  const needs = {
    // List of needed resources
  };

  const assets = {
    // List of assets
  };

  const parameters = {
    color: '#beefed',
    speed: 1,
    ctx: null,
  };

  function start(startParams) {
    parameters.ctx = canvas.getContext('2d');
    parameters.color = (startParams && startParams.color) || parameters.color;
    parameters.speed = (startParams && startParams.speed) || parameters.speed;
  }

  function update(progress) {
    const { ctx } = parameters;
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
    id: 'testEffect',
    needs,
    assets,
    parameters,
    start,
    update,
    end,
  };
}

export { testEffect };
