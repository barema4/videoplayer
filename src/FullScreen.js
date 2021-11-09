import React from 'react';
import FullSvg from './full.svg'

const FullScreenIcon = ({onClick}) => (
  <img
    src={FullSvg}
    alt="Video"
    style={{
        width: '18px',
        height: '18px'
      }}
      onClick={onClick}
  />
);


export default FullScreenIcon;