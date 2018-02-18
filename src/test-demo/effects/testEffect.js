function testEffect() {
  const needs = {
    // List of needed resources
  };

  const assets = {
    // List of assets
  };

  const parameters = {
    color: 0xbeefed,
  };

  function start(initParams) {
    return initParams;
  }

  function update(progress) {
    console.log('effect update', progress);
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

export { testEffect };
