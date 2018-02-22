const hasFullscreenElement = () => (
  document.fullscreenElement
  || document.webkitFullscreenElement
  || document.mozFullScreenElement
  || document.msFullscreenElement
);

const requestFullscreen = (
  document.body.requestFullscreen
  || document.body.webkitRequestFullscreen
  || document.body.mozRequestFullScreen
  || document.body.msRequestFullscreen
).bind(document.body);

const exitFullscreen = (
  document.exitFullscreen
  || document.webkitExitFullscreen
  || document.mozCancelFullScreen
  || document.msExitFullscreen
).bind(document);

export const toggleFullScreen = (goFullScreen) => {
  if (typeof document === 'undefined' || typeof document.body === 'undefined') {
    console.warn('Fullscreen is not supported in this browser.'); // eslint-disable-line no-console
    return;
  }

  const isFullScreen = !!hasFullscreenElement();

  if (isFullScreen) {
    exitFullscreen();
  } else if (!isFullScreen && goFullScreen) {
    requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }
};
