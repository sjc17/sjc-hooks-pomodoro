import React from 'react';
import Time from './components/display/Time';
import Start from './components/buttons/Start';
import Stop from './components/buttons/Stop';
import Reset from './components/buttons/Reset';
import ModeButton from './components/buttons/ModeButton';
import SettingsMenu from './components/settings/SettingsMenu';
import SettingsToggleButton from './components/settings/SettingsToggleButton';
import Audio from './components/display/Audio';
import TimerState from './context/TimerState';

import './App.css';

const App = () => {
  return (
    <TimerState>
      <div className='container mt-3'>
        <nav className='navbar navbar-dark bg-primary text-light'>
          <h3>React Pomodoro Timer</h3>
          <SettingsToggleButton />
        </nav>
        <Time />
        <section className='border-top border-primary bg-light d-flex justify-content-center'>
          <ModeButton thisMode={'pomodoro'} text={'Pomodoro'} />
          <ModeButton thisMode={'shortbreak'} text={'Short Break'} />
          <ModeButton thisMode={'longbreak'} text={'Long Break'} />
        </section>
        <section className='border-top border-primary bg-light d-flex justify-content-center'>
          <Start />
          <Stop />
          <Reset />
        </section>
      </div>
      <SettingsMenu />
      <Audio />
    </TimerState>
  );
};

export default App;
