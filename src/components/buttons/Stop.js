import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';

const Stop = () => {
  const timerContext = useContext(TimerContext);
  const { setTimerRunning } = timerContext;

  return (
    <button
      type='button'
      className='btn btn-block btn-danger m-2'
      onClick={() => setTimerRunning(false)}
    >
      Stop
    </button>
  );
};

export default Stop;
