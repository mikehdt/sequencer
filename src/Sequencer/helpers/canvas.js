function canvasElement({ width = 1280, height = 720, className = '' } = {}) {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  if (className) {
    canvas.classList.add(className);
  }

  return canvas;
}

export { canvasElement };

// const resize = () => {
//   console.log('canvas was resized I guess');
// };

// window.addEventListener('resize', () => requestAnimationFrame(resize));
// resize();

// Keep here or split out? Maybe make a different helper..?

// Experiments with keeping canvas resized appropriately on redraw
// const resizeCanvas = ctx => false;
// if (ctx.canvas.scrollWidth !== ctx.canvas.width
//   || ctx.canvas.scrollHeight !== ctx.canvas.height
// ) {
//   ctx.canvas.width = ctx.canvas.scrollWidth;
//   ctx.canvas.height = ctx.canvas.scrollHeight;
//   return true;
// }

// const mainLoop = (ctx, firstRun) => {
//   const hasResized = resizeCanvas(ctx) || firstRun;

//   if (hasResized) {
//     ctx.canvas.width = 1280;
//     ctx.canvas.height = 720;
//     // trigger frame redraw?
//   }

//   requestAnimationFrame(window.mainLoop);
// };
//
// window.mainLoop = (frame, context = ctx, firstRun = false) => { mainLoop(context, firstRun); };
// window.mainLoop(0, ctx, true);
