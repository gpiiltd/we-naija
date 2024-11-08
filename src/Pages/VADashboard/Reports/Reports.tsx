import React from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import blue_card from "../../../Assets/svgImages/blue_card.svg";
import red_card from "../../../Assets/svgImages/red_card.svg";
import woman from "../../../Assets/svgImages/woman.svg";
import { useNavigate } from 'react-router-dom';
import { Button } from "@gpiiltd/gpi-ui-library";

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-black font-extrabold"
        >
          Reports
        </Typography>
      </div>
      <Typography variant={TypographyVariant.SMALL} className="text-light_gray">
        Kindly select the type of report type you would like to participate in
        today.{" "}
      </Typography>
      <div className="flex flex-col md:flex-row gap-8 md:justify-between w-full">
        {/* first card */}
        <div className="border  md:w-[350px] lg:w-[670px]  h-fit rounded-xl shadow relative flex flex-col justify-start text-white tracking-wide">
          <img src={red_card} alt="heart icon" />
          <div className="py-6 mb-12 md:py-2 lg:py-2 absolute lg:pt-8">
            <div className="px-4 lg:p-6">
              <h3 className="font-bold text-sm md:text-lg  lg:text-3xl lg:font-extrabold lg:lg:leading-6">
Community Task              </h3>
              <div className=" flex flex-col gap-1 lg:pt-2 lg:pr-52">
                <p className="text-xs md:text-sm lg:leading-6 lg:text-base font-thin">
                As a Health Hero, complete curated tasks to deepen your health knowledge, provide valuable data, and {" "}
                  <span className="font-extrabold">earn star points.</span>
                </p>
                <div className="flex h-7 justify-center w-[50%] mt-2  md:w-[40%] lg:w-[50%] lg:h-12">
  <Button text="View" active={true} bg_color="transparent"       onClick={() => navigate('/verified-agent-dashboard/reports/community-tasks')}
  />
</div>
              </div>
            </div>
          </div>
        </div>
        {/* second card */}
        <div className="border  md:w-[350px] lg:w-[670px]  h-fit rounded-xl shadow relative flex flex-col justify-start text-white tracking-wide">
          <img src={blue_card} alt="heart icon" />
          <div className="py-6 mb-12 md:py-2 lg:py-2 absolute lg:pt-8">
            <div className="px-4 lg:p-6">
              <h3 className="font-bold text-sm md:text-lg  lg:text-3xl lg:font-extrabold lg:lg:leading-6">
                Health Institution Survey{" "}
              </h3>
              <div className=" flex flex-col gap-1 lg:pt-2 lg:pr-52">
                <p className="text-xs md:text-sm lg:leading-6 lg:text-base font-thin">
                Take part in surveys at our partners health institutes, provide feedback on key indicators, and {" "}
                  <span className="font-extrabold">earn star points.</span>
                </p>
                <div className="flex h-7 justify-center w-[50%] mt-2  md:w-[40%] lg:w-[50%] lg:h-12">
  <Button text="View" active={true} bg_color="transparent" />
</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" md:w-[600px] lg:w-[916px] rounded-xl relative flex tracking-wide self-center pt-8 md:pt-24">
        <img src={woman} alt="heart icon" />
        <div className="absolute px-4 py-2 md:px-16  md:py-12">
          <div className="flex flex-col md:gap-3 lg:gap-8 pr-[100px] md:pr-[150px] lg:pr-[400px]">
            <h3 className="text-sm md:text-base lg:text-2xl font-extrabold">
              Be the Change. Connect with Fellow Health Champions.
            </h3>
            <div className="flex justify-center  w-[50%] md:w-[40%] lg:w-[50%]">
              <Button
                text="Join community"
                active={true}
                bg_color="#ED7D31"
                text_color="white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
