import React from 'react';

import PauseSvg from './pause-icon.svg'

const PauseIcon = () => (
  <img
    src={PauseSvg}
    alt="Pause Video"
    style={{
        width: '18px',
        height: '18px',
      }}
  />
);


export default PauseIcon;