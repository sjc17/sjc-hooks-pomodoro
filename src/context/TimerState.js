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
  const [defaultTimes, setDefaultTimes] = useState(
    storage.getItem('defaultTimes') || {
      pomodoro: 25 * 60,
      shortbreak: 5 * 60,
      longbreak: 15 * 60,
    }
  );

  // Timer can run in 3 modes:
  // 'pomodoro' 'shortbreak' 'longbreak'
  // Useful for obtaining default time value from previous state
  const [mode, setMode] = useState('pomodoro');

  // Volume range 0 - 1 inclusive
  const [volume, setVolume] = useState(storage.getItem('volume') || 1);

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

  useEffect(() => {
    storage.setItem('defaultTimes', {
      ...defaultTimes,
    });
  }, [defaultTimes]);

  useEffect(() => {
    storage.setItem('volume', volume);
  }, [volume]);

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
        volume,
        setTime,
        setTimerRunning,
        setMode,
        setDefaultTimes,
        setVolume,
        changeMode,
      }}
    >
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerState;
