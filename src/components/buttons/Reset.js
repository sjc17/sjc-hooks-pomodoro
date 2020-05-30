import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';

const Reset = () => {
  const timerContext = useContext(TimerContext);
  const { setTime, setTimerRunning, mode, defaultTimes } = timerContext;
  return (
    <button
      type='button'
      className='btn btn-block btn-warning m-2'
      onClick={() => {
        setTime(defaultTimes[mode]);
        setTimerRunning(false);
      }}
    >
      Reset
    </button>
  );
};

export default Reset;
