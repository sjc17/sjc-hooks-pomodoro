import React, { useContext } from 'react';
import TimerContext from '../../context/timerContext';
import { playSound } from '../display/Audio';

const SettingsMenu = () => {
  const timerContext = useContext(TimerContext);
  const { defaultTimes, setDefaultTimes } = timerContext;
  const storage = window.localStorage;

  return (
    <div className='modal fade' id='settingsModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Settings</h5>
            <button type='button' className='close' data-dismiss='modal'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='input-group'>
              <div className='input-group-prepend w-75'>
                <span className='input-group-text w-100'>
                  Pomodoro Length (Minutes)
                </span>
              </div>
              <input
                type='number'
                min='1'
                className='form-control'
                placeholder='25'
                value={Math.floor(defaultTimes.pomodoro / 60)}
                onChange={(e) => {
                  if (!isNaN(e.target.value) && e.target.value)
                    setDefaultTimes({
                      ...defaultTimes,
                      pomodoro: parseInt(e.target.value) * 60,
                    });
                }}
                id='input-pomodoro'
              />
            </div>
            <div className='input-group'>
              <div className='input-group-prepend w-75'>
                <span className='input-group-text w-100'>
                  Short Break Length (Minutes)
                </span>
              </div>
              <input
                type='number'
                min='1'
                className='form-control'
                placeholder='5'
                value={Math.floor(defaultTimes.shortbreak / 60)}
                onChange={(e) => {
                  if (!isNaN(e.target.value) && e.target.value)
                    setDefaultTimes({
                      ...defaultTimes,
                      shortbreak: parseInt(e.target.value) * 60,
                    });
                }}
                id='input-shortbreak'
              />
            </div>
            <div className='input-group'>
              <div className='input-group-prepend w-75'>
                <span className='input-group-text w-100'>
                  Long Break Length (Minutes)
                </span>
              </div>
              <input
                type='number'
                min='1'
                className='form-control'
                placeholder='15'
                value={Math.floor(defaultTimes.longbreak / 60)}
                onChange={(e) => {
                  if (!isNaN(e.target.value) && e.target.value)
                    setDefaultTimes({
                      ...defaultTimes,
                      longbreak: parseInt(e.target.value) * 60,
                    });
                }}
                id='input-longbreak'
              />
            </div>
            <div className='input-group my-3'>
              <div className='input-group-prepend mx-3'>Volume</div>
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                className='flex-grow-1 mx-3'
                id='input-volume'
                defaultValue={storage.getItem('volume') || '1'}
                onChange={(e) => {
                  storage.setItem('volume', e.target.value);
                  document.querySelector('audio').volume = e.target.value;
                }}
              />
            </div>
            <div className='input-group my-3'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => playSound()}
              >
                Play Sound
              </button>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                setDefaultTimes({
                  pomodoro: 25 * 60,
                  shortbreak: 5 * 60,
                  longbreak: 15 * 60,
                });
                document.querySelector('audio').volume = '1';
                document.querySelector('#input-volume').value = '1';
              }}
            >
              Reset to defaults
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
