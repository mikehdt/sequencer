import 'normalize.css/normalize.css';
import './styles/index.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  if (
    ctx.canvas.scrollWidth !== ctx.canvas.width
    || ctx.canvas.scrollHeight !== ctx.canvas.height
  ) {
    ctx.canvas.width = ctx.canvas.scrollWidth;
    ctx.canvas.height = ctx.canvas.scrollHeight;
    return true;
  }

  return false;
};

const loopFn = () => {
  const hasResized = resizeCanvas();

  if (hasResized) {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
  }

  requestAnimationFrame(loopFn);
};

const startFn = () => {
  window.addEventListener('resize', loopFn);
  loopFn();
};

document.addEventListener('DOMContentLoaded', startFn);
