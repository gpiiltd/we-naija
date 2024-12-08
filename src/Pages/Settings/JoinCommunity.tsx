import React from "react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import backgroundImage from "../../Assets/svgImages/background.svg"; // Import the SVG file
import bigGirlSvg from "../../Assets/svgImages/girlArm.svg";

const JoinCommunity = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div
        className="relative w-full md:w-[50%] h-[300px] rounded-xl flex flex-col items-center justify-center bg-[#007A61] "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <img
          src={bigGirlSvg}
          alt="heart icon"
          className="absolute -bottom-[1rem] right-4 bg-transparent w-[350px] h-[300px]"
        />
        <div className="absolute flex flex-row items-center justify-center px-3  md:px-8  ">
          <div className="  ">
            <p className="text-xs font-bold md:text-base lg:text-2xl md:font-extrabold text-white">
              Be the Change. Connect with Fellow Health Champions.
            </p>
            <div className="flex pt-2 md:pt-4 ">
              <button
                onClick={() => console.log("successful")}
                className=" flex items-center gap-2 px-3 py-2 rounded bg-orange text-white  focus:outline-none"
              >
                <span className="text-xs font-thin md:text-base md:font-bold">
                  Join Community
                </span>
                <PiPaperPlaneTiltFill />
              </button>
            </div>
          </div>
          <div className="w-[30%]	"></div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
