import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';

const Time = () => {
  const timerContext = useContext(TimerContext);
  const { time } = timerContext;

  return (
    <section className='bg-light d-flex justify-content-center'>
      <h1 className='my-5 display-1'>
        {('0' + Math.floor(time / 60).toString()).slice(-2)}:
        {('0' + (time % 60).toString()).slice(-2)}
      </h1>
    </section>
  );
};

export default Time;
