import React from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import ProgressBar from "./ProgressBar";

// Define the props interface
interface SurveysCardProps {
  statusMessage: string;
  responseTimeMessage: string;
  progressPercentage: number;
}

const SurveysCard: React.FC<SurveysCardProps> = ({
  statusMessage,
  responseTimeMessage,
  progressPercentage,
}) => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4">
        {[1, 2, 3, 4].map(() => (
          // <div className="border-[1px] border-solid border-[#D0D5DD] rounded-lg bg-white shadow-md p-2 mt-4">
          <div className="border-[1px] border-solid border[#D0D5DD] rounded-lg bg-white shadow-md mt-3">
            <div className="w-full">
              <section className="flex justify-start w-full">
                <div className="pl-6 pr-6 my-6 w-full">
                  <p className="font-bold text-lg text-black">
                    {responseTimeMessage}
                  </p>
                  <section className="flex justify-between items-center">
                    <p className="font-normal text-[14px] text-[#5E5959] w-auto">
                      {statusMessage}
                    </p>
                    <Icon type="arrowLeftSvg" className="ml-4" />{" "}
                    {/* Adds space between icon and text */}
                  </section>
                  <div className="flex w-fullitems-start justify-start pt-3">
                    <Icon type="timerSurveySvg" className="mt-[2px] mr-2" />{" "}
                    {/* No left margin here */}
                    <p className="font-normal text-[14px] w-auto">6 mins</p>
                  </div>

                  <ProgressBar percentage={progressPercentage} />
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysCard;
