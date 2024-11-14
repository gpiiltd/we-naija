import React from 'react';
import { Line } from 'rc-progress';
import Typography from './Typography';
import { TypographyVariant } from './types';


interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  const getStrokeColor = () => {
    if (percent < 50) return '#007A61'; 
    if (percent < 75) return '#007A61'; 
    return '#007A61'; 
  };

  return (
    <div className="flex justify-center gap-2">
      <Line 
        percent={percent} 
        strokeWidth={4} 
        strokeColor={getStrokeColor()} 
        trailWidth={4} 
      />
      <Typography
        variant={TypographyVariant.SMALL}
        className="text-black font-extrabold"
      >
        {percent}%
      </Typography>
    </div>
  );
};

export default ProgressBar;