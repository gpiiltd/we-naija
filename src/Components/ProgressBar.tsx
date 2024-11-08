import React from "react";
import { Line } from "rc-progress";
import Typography from "./Typography";
import { TypographyVariant } from "./types";

const ProgressBar = () => {
  return (
    <div className="flex justify-center gap-2">
      <Line percent={100} strokeWidth={6} strokeColor="#D3D3D3" trailWidth={6} />
      <Typography
        variant={TypographyVariant.SMALL}
        className="text-black font-extrabold"
      >
        90%
      </Typography>
    </div>
  );
};

export default ProgressBar;
