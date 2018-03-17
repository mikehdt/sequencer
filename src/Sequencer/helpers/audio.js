function audioElement({ audioFile, volume = 1, className = '' }) {
  const audio = document.createElement('audio');
  audio.src = audioFile;
  audio.volume = volume;
  audio.controls = true;

  if (className) {
    audio.classList.add(className);
  }

  return audio;
}

export { audioElement };
