import React, { useState, useEffect, useRef } from 'react';
import TimerContext from './timerContext';
import { playSound } from '../components/display/Audio';

// Provide app-level state and controls
const TimerState = (props) => {
  // Local storage
  const storage = window.localStorage;

  // Remaining time on timer in seconds
  const [time, setTime] = useState(25 * 60);

  // Bool determines whether timer is counting down
  const [timerRunning, setTimerRunning] = useState(false);

  // Default start times for timer
  // Retrieve from storage if possible
  const [defaultTimes, setDefaultTimes] = useState({
    pomodoro: storage.getItem('pomodoro') || 25 * 60,
    shortbreak: storage.getItem('shortbreak') || 5 * 60,
    longbreak: storage.getItem('longbreak') || 15 * 60,
  });

  // Timer can run in 3 modes:
  // 'pomodoro' 'shortbreak' 'longbreak'
  // Useful for obtaining default time value from previous state
  const [mode, setMode] = useState('pomodoro');

  // Holds setTimeout object for timer
  let _timer = useRef(false);

  // Timer effect hook
  useEffect(() => {
    if (timerRunning && time > 0) {
      _timer.current = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      if (_timer.current) {
        // Stop currently running timer, important when user hits "Stop"
        clearTimeout(_timer.current);
        if (time === 0) {
          playSound();
        }
        _timer.current = false;
      }
    }
  }, [timerRunning, time]);

  // Store default times changes
  useEffect(() => {
    storage.setItem('pomodoro', defaultTimes.pomodoro);
    storage.setItem('shortbreak', defaultTimes.shortbreak);
    storage.setItem('longbreak', defaultTimes.longbreak);

    // eslint-disable-next-line
  }, [defaultTimes]);

  // User clicks one of the mode buttons to change to pomodoro/short break/long break
  const changeMode = (modeName) => {
    // Prevent updating mode with the same mode
    if (mode !== modeName) {
      setMode(modeName);
      setTimerRunning(false);
      setTime(defaultTimes[modeName]);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        timerRunning,
        mode,
        defaultTimes,
        setTime,
        setTimerRunning,
        setMode,
        setDefaultTimes,
        changeMode,
      }}
    >
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerState;
