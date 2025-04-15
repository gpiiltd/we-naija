import React from "react";
import VerificationCard from "../../Components/Home/VerificationCard";
import HomeGoToReportCard from "../../Components/Home/GoToReportCard";
import InstitutionsCard from "../../Components/Home/Institution_card";
import backgroundImage from "../../Assets/svgImages/reportCardBg.svg";
import { useNavigate } from "react-router-dom";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import woman from "../../Assets/svgImages/woman_green.svg";
import { useSelector } from "react-redux";

const PendingKyc = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user.userData);

  return (
    <div>
      <p className="font-normal text-[#5E5959] text-lg">
        Hello,{" "}
        <span className="font-bold text-black">{userData.first_name}</span> 👋
      </p>
      <p className="font-light text-[#5E5959] text-sm">
        Let’s improve health care service together.
      </p>
      <div className="w-full sm:grid sm:grid-cols-1 md:flex lg:flex items-start lg:w-[55rem] mt-4 mb-10">
        <VerificationCard
          statusMessage="Your ID & profile details are being verified"
          progressPercentage={90}
          responseTimeMessage="You would receive a response in less than 12 hours"
        />
        <br />
        <HomeGoToReportCard backgroundImage={backgroundImage} />
      </div>
      <p className="font-bold text-black">Recommended institutes</p>
      <p className="font-light text-[#5E5959] text-sm">
        Below are list of recommend institute to visit and give a report based
        on your residential address.
      </p>
      <InstitutionsCard
        statusMessage="No 5, Lekki view, Lagos Island, Lagos state, Nigeria."
        responseTimeMessage="You would receive a response in less than 12 hours"
        onClick={() => navigate("hospital-details")}
      />

      <div className="h-fit rounded-xl items-center flex  flex-col text-black tracking-wide self-center pt-8 md:pt-24 md:col-span-2">
        <div className="flex flex-col ">
          <img src={woman} alt="heart icon" className="relative" />
          <div className="absolute flex flex-row items-center justify-center px-3 pt-3 md:px-8  md:pt-16">
            <div className="  ">
              <p className="text-xs text-white font-bold md:text-base lg:text-2xl md:font-extrabold">
                Be the Change. Connect with Fellow Health Champions.
              </p>
              <div className="flex pt-2 md:pt-4 ">
                <button
                  onClick={() =>
                    navigate("/verified-agent-dashboard/join-community")
                  }
                  className=" flex items-center gap-2 px-3 py-2 rounded bg-orange text-white  focus:outline-none"
                >
                  <span className="text-xs text-white font-thin md:text-base md:font-bold">
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
  );
};

export default PendingKyc;
