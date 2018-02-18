function testEffect() {
  const parameters = {
    color: 0xbeefed,
  };

  function start() {}

  function update(progress) {
    console.log('effect update', progress);
  }

  function end() {}

  return {
    parameters,
    start,
    update,
    end,
  };
}

function Effects () {
  console.log('I dunno mate')
}

export { Effects, testEffect };
