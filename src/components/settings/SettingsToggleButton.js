import React, { useState } from 'react';

const SettingsToggleButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type='button'
      className={`btn btn-link ${hovered ? 'text-white' : 'text-white-50'}`}
      data-toggle='modal'
      data-target='#settingsModal'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i className='fas fa-cog'></i>
    </button>
  );
};

export default SettingsToggleButton;
