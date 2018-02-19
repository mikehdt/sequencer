function TestEffect(initParams) {
  const { canvas } = initParams;

  const needs = {
    // List of needed resources
  };

  const assets = {
    // List of assets
  };

  const parameters = {
    color: '#beefed',
    ctx: null,
  };

  function start(startParams) {
    parameters.ctx = canvas.getContext('2d');
    parameters.color = (startParams && startParams.color) || parameters.color;
  }

  function update(progress) {
    const { ctx } = parameters;
    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = parameters.color;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(360 * progress.unitInterval * (Math.PI / 180));
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  }

  function end() {}

  return {
    needs,
    assets,
    parameters,
    start,
    update,
    end,
  };
}

export { TestEffect };
