import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';

const Start = () => {
  const timerContext = useContext(TimerContext);
  const { setTimerRunning } = timerContext;

  return (
    <button
      type='button'
      className='btn btn-block btn-success m-2'
      onClick={() => setTimerRunning(true)}
    >
      Start
    </button>
  );
};

export default Start;
