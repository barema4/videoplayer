import React from 'react';
import FullSvg from './frame.svg'

const PictureInPicture = ({onClick}) => (
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


export default PictureInPicture;