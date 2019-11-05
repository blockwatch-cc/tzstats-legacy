import React from 'react';

export const BackIcon = ({ fontSize = 14 }) => {
  return (
    <svg width={fontSize} height={fontSize} viewBox="0 0 512 512"  version="1.1">
      <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" stroke='currentColor' fill='currentColor'/>
    </svg>
  );
};

export const FwdIcon = ({ fontSize = 14 }) => {
  return (
    <svg width={fontSize} height={fontSize} viewBox="0 0 512 512"  version="1.1">
      <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " stroke='currentColor' fill='currentColor'/>
    </svg>
  );
};
