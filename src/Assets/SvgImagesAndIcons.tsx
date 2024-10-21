import React, { FC } from 'react';
import { Svgprops } from './types';

const Icon:FC<Svgprops> = ({ type, className }) => {
  const renderIcon = () => {
    switch (type) {
      case 'star':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
          </svg>
        );
      case 'heart':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'check':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M9 16.17L4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default Icon ;
