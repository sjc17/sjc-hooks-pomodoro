import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';

// Pomodoro, Short Break, Long Break buttons
const ModeButton = ({ thisMode, text }) => {
  const timerContext = useContext(TimerContext);
  const { mode, changeMode } = timerContext;
  return (
    <button
      type='button'
      className={`btn btn-block btn-primary m-2 ${
        mode === thisMode ? 'active' : ''
      }`}
      onClick={() => {
        changeMode(thisMode);
      }}
    >
      {text}
    </button>
  );
};

export default ModeButton;
