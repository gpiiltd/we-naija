import React from "react";
import Typography from "../../Components/Typography/Typography";
import { TypographyVariant } from "../../Components/types";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import backgroundImage from "../../Assets/svgImages/background.svg"; // Import the SVG file
import bigGirlSvg from "../../Assets/svgImages/girlArm.svg";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";

const JoinCommunity = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  md:mt-4 mb-10">
      <div className="flex md:hidden mb-8">
        <span
          onClick={() =>
            navigate("/verified-agent-dashboard/settings/setting-mobile")
          }
        >
          <Icon type="arrowBackSvg" className="mr-8 " />
        </span>

        <Typography variant={TypographyVariant.SUBTITLE}>
          Join Community
        </Typography>
      </div>
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
