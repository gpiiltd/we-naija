import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

interface InfoCardProps {
  image: string;
  title: string;
  description: string;
  reverse?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  image,
  title,
  description,
  reverse,
}) => {
  return (
    // <div
    //   className={`relative h-[350px] first:flex flex-col md:flex-row lg:flex flex-row${
    //     reverse ? "md:flex-row-reverse" : ""
    //   } items-center bg-transparent rounded-lg md:p-10 gap-6`}
    // >
    //   {/* Image Box */}
    //   <div className="flex-1 flex justify-center">
    //     <Icon type={image} className="w-full" />
    //   </div>

    //   {/* Text Box */}
    //   <div
    //     className={`absolute w-full h-[180px] bottom-[0px] flex flex-col items-start justify-center p-4 ${
    //       reverse ? "right-5 " : "left-5"
    //     } rounded-md bg-[#006C55]`}
    //   >
    //     <Typography
    //       variant={TypographyVariant.NORMAL}
    //       className="text-[#8FF0A4] text-[12px] md:text-2xl font-bold"
    //     >
    //       {title}
    //     </Typography>
    //     <Typography
    //       variant={TypographyVariant.NORMAL}
    //       className="text-white mt-2 text-sm font-light md:text-lg"
    //     >
    //       {description}
    //     </Typography>
    //   </div>
    // </div>
    <>
      {/* === Desktop & Tablet View === */}
      <div
        className={`font-raleway hidden md:flex relative flex-col md:flex-row md:max-w-5xl mx-auto ${
          reverse ? "" : "md:flex-row-reverse"
        } items-center gap-6 md:gap-10`}
      >
        {/* IMAGE */}
        <div className="w-full md:w-[500px] relative">
          <Icon type={image} className="w-full rounded-xl md:rounded-none" />
        </div>

        {/* DESKTOP TEXT CARD */}
        <div
          className={`
          hidden absolute ${
            reverse ? "right-[50px]" : "left-[50px]"
          } md:flex flex-col justify-center w-1/2 bg-[#006C55] md:h-[200px] p-6 text-white rounded-xl
        `}
          // style={{
          //   clipPath: reverse
          //     ? "polygon(0 0, 100% 0, 100% 100%, 40px 100%)"
          //     : "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
          // }}
        >
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#8FF0A4] text-2xl font-bold font-raleway "
          >
            {title}
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-white mt-4 text-md font-light font-raleway "
          >
            {description}
          </Typography>
        </div>
      </div>

      {/* === Mobile View === */}
      <div
        className={` md:hidden relative h-[350px] first:flex flex-col md:flex-row${
          reverse ? "md:flex-row-reverse" : ""
        } items-center bg-transparent rounded-lg md:p-10 gap-6`}
      >
        {/* Image Box */}
        <div className="flex-1 flex justify-center">
          <Icon type={image} className="w-full" />
        </div>

        {/* Text Box */}
        <div
          className={`absolute w-full h-[180px] bottom-[0px] flex flex-col items-start justify-center p-4 ${
            reverse ? "right-5 " : "left-5"
          } rounded-md bg-[#006C55]`}
        >
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#8FF0A4] text-[12px] md:text-2xl font-bold font-raleway"
          >
            {title}
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-white mt-2 text-sm font-light md:text-lg font-raleway "
          >
            {description}
          </Typography>
        </div>
      </div>
    </>
  );
};

const InfoSection: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-16 px-4 md:px-10 ">
      <InfoCard
        image="can1"
        title="SIGN UP"
        description="Begin your journey to make a real difference in healthcare!"
        reverse={false} // Text first, image second
      />
      <InfoCard
        image="can2"
        title="TAKE ON COMMUNITY TASK"
        description="Take On Community Tasks – From promoting mental health awareness to organizing wellness activities, each task you complete earns you Star Points and brings health awareness to those around you."
        reverse={true} // Text first, image second
      />
      <InfoCard
        image="can3"
        title="COMPLETE HEALTH INSTITUTION SURVEYS"
        description="Complete Health Institution Surveys – Share your experiences to improve healthcare facilities. Every survey adds points to your tally and helps improve accountability in our health system."
        reverse={false} // Image first, text second
      />
      <InfoCard
        image="can4"
        title="EARN POINTS, CLIMB THE LEADERBOARD, UNLOCK BADGES"
        description="Watch yourself climb the leaderboard, unlock unique badges, and show the world that you’re a true Health Champion."
        reverse={true} // Text first, image second
      />
      <InfoCard
        image="can5"
        title="WIN PRIZES"
        description="As the campaign wraps up, trade in your accumulated Star Points for fantastic prizes!"
        reverse={false} // Image first, text second
      />
    </div>
  );
};

export default InfoSection;
