import React from "react";

interface LevelBarProps {
  level: number;
}

const LevelBar: React.FC<LevelBarProps> = ({ level }) => {
  return (
    <div className="flex justify-between items-center pt-3">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-[#ED7D31] h-3 rounded-full"
          style={{
            width: `${level}%`,
            minWidth: "50px",
          }}
        ></div>
      </div>
      <span className="ml-4 text-white font-normal text-sm w-20 md:w-22 lg:w-12">
        level {level}
      </span>
    </div>
  );
};

export default LevelBar;
