function testEffect() {
  const parameters = {
    color: 0xbeefed,
  };

  function start() {}

  function update(progress) {
    console.log('progress', progress, parameters.color);
  }

  function end() {}

  return {
    parameters,
    start,
    update,
    end,
  };
}

export { testEffect };
