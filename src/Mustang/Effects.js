function testEffect() {
  const parameters = {
    color: 0xbeefed,
  };

  function start() { console.log('effect start'); }

  function update(progress) {
    console.log('effect update', progress);
  }

  function end() { console.log('effect end'); }

  return {
    parameters,
    start,
    update,
    end,
  };
}

export { testEffect };
