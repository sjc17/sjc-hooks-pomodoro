import React from 'react';
import sound from './chime.wav';

const Audio = () => {
  return <audio src={sound} type='audio/wav'></audio>;
};

export const playSound = () => {
  document.querySelector('audio').play();
};

export default Audio;
