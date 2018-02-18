function audioElement(audioFile, className) {
  const audio = document.createElement('audio');
  audio.src = audioFile;
  audio.controls = true;

  if (className) {
    audio.classList.add(className);
  }

  return audio;
}

export { audioElement };
