import { useEffect } from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import blue_card from "../../../Assets/svgImages/blue_card.svg";
import red_card from "../../../Assets/svgImages/red_card.svg";
import woman from "../../../Assets/svgImages/woman.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { handleBreadCrumbNavigate } from "../../../utils/handleBreadCrumb";

const Reports = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const originalBreadCrumb = [
      {
        path: "/verified-agent-dashboard/reports",
        label: "Report",
        active: true,
      },
    ];
    localStorage.setItem("breadcrumb", JSON.stringify(originalBreadCrumb));
  }, []);

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

      <div className="grid gap-8  md:grid-cols-2">
        <div className="border h-fit rounded-xl shadow relative flex flex-col justify-start text-white tracking-wide">
          <img src={red_card} alt="heart icon" />
          <div className="py-6 mb-12 md:py-2 lg:py-2 absolute lg:pt-4">
            <div className="px-4 lg:p-6">
              <h3 className="font-bold text-sm md:text-lg lg:text-3xl lg:font-extrabold lg:leading-6">
                Community Task{" "}
              </h3>
              <div className="flex flex-col gap-1 lg:pt-2 lg:pr-52">
                <p className="text-xs md:text-sm lg:leading-6 lg:text-base font-thin">
                  As a Health Hero, complete curated tasks to deepen your health
                  knowledge, provide valuable data, and{" "}
                  <span className="font-extrabold">earn star points.</span>
                </p>
                <div className="flex h-7 justify-center w-[50%] mt-2 md:w-[40%] lg:w-[50%] lg:h-12 md:mt-6">
                  <Button
                    text="View"
                    active={true}
                    bg_color="transparent"
                    onClick={() =>
                      handleBreadCrumbNavigate(
                        "/verified-agent-dashboard/reports/community-tasks",
                        "Community task",
                        navigate,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border h-fit rounded-xl shadow relative flex flex-col justify-start text-white tracking-wide">
          <img src={blue_card} alt="heart icon" />
          <div className="py-6 mb-12 md:py-2 lg:py-2 absolute lg:pt-4">
            <div className="px-4 lg:p-6">
              <h3 className="font-bold text-sm md:text-lg lg:text-3xl lg:font-extrabold lg:leading-6">
                Health Institution Survey
              </h3>
              <div className="flex flex-col gap-1 lg:pt-2 lg:pr-52">
                <p className="text-xs md:text-sm lg:leading-6 lg:text-base font-thin">
                  Take part in surveys at our partners' health institutes,
                  provide feedback on key indicators, and{" "}
                  <span className="font-extrabold">earn star points.</span>
                </p>
                <div className="flex h-7 justify-center w-[50%] mt-2 md:w-[40%] lg:w-[50%] lg:h-12 md:mt-6">
                  <Button
                    text="View"
                    active={true}
                    bg_color="transparent"
                    onClick={() =>
                      handleBreadCrumbNavigate(
                        "/verified-agent-dashboard/reports/hospitals",
                        "Health inst. survey",
                        navigate,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit rounded-xl items-center flex  flex-col text-black tracking-wide self-center pt-8 md:pt-24 md:col-span-2">
          <div className="flex flex-col ">
            <img src={woman} alt="heart icon" className="relative" />
            <div className="absolute flex flex-row items-center justify-center px-3 pt-3 md:px-8  md:pt-16">
              <div className="  ">
                <p className="text-xs font-bold md:text-base lg:text-2xl md:font-extrabold">
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
      </div>
    </div>
  );
};

export default Reports;
