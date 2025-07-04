import React, { useEffect, useState } from "react";
import VerificationCard from "../../Components/Home/VerificationCard";
import HomeGoToReportCard from "../../Components/Home/GoToReportCard";
import InstitutionsCard from "../../Components/Home/Institution_card";
import backgroundImage from "../../Assets/svgImages/reportCardBg.svg";
import { useNavigate } from "react-router-dom";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import woman from "../../Assets/svgImages/woman_green.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { triggerGetUserProfile } from "../../redux/Services/settings/settingsServices";

import { AppDispatch, RootState } from "../../redux/Store/store";
import ReportCards from "../../Components/Home/ReportCards";
import { ClipLoader } from "react-spinners";
import { triggerGetNearbyInstitution } from "../../redux/Services/institute/instituteServices";

const PendingKyc = () => {
  const [institutionsData, setInstitutionsData] = useState<any[]>([]);
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  const { nearbyInstitution } = useSelector(
    (state: RootState) => state.institute,
  );

  const { userProfileData } = useSelector((state: RootState) => state.settings);
  const { data } = userProfileData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(
            triggerGetNearbyInstitution({
              state: data?.state,
              lga: data?.lga,
            }),
          ),
          dispatch(triggerGetUserProfile({})),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (nearbyInstitution.data && !nearbyInstitution.error) {
      setInstitutionsData(nearbyInstitution.data.data?.results);
    }
  }, [nearbyInstitution]);

  const firstName = localStorage.getItem("first_name") || userData?.first_name;

  const isKycApproved = data?.kyc_status === "approved";

  return (
    <div>
      <p className="font-normal text-[#5E5959] text-lg">
        Hello,
        <span className="font-bold text-black ml-1">{firstName}</span> 👋
      </p>
      <p className="font-light text-[#5E5959] text-sm">
        Let's improve health care service together.
      </p>
      {userProfileData.loading ? (
        <div className="flex justify-center items-center w-full h-full p-6 bg-white rounded-lg mx-auto mb-12">
          <ClipLoader color="#007A61" size={24} className="mr-6" />
        </div>
      ) : (
        <div className="w-full sm:grid sm:grid-cols-1 md:flex lg:flex items-start gap-4 mt-4 mb-10">
          {!isKycApproved && (
            <>
              <VerificationCard
                statusMessage="Your ID & profile details are being verified"
                progressPercentage={90}
                responseTimeMessage="You would receive a response in less than 12 hours"
              />
              <HomeGoToReportCard backgroundImage={backgroundImage} />
            </>
          )}

          {isKycApproved && (
            <>
              <HomeGoToReportCard backgroundImage={backgroundImage} />
              <ReportCards
                icon="calendarg"
                title="No. reports completed"
                number={data?.reports_completed}
                link="/verified-agent-dashboard/reports/completed"
              />
              <ReportCards
                icon="starIcon"
                title="Total star points"
                number={data?.star_points}
                link="/verified-agent-dashboard/reports/completed"
              />
            </>
          )}
        </div>
      )}

      <p className="font-bold text-black">Recommended institutes</p>
      <p className="font-light text-[#5E5959] text-sm">
        Below are list of recommend institute to visit and give a report based
        on your residential address.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {nearbyInstitution.loading ? (
          <div className="col-span-3 text-center py-4">
            <ClipLoader color="#007A61" size={24} className="mr-6" />
            <p>Loading institutions...</p>
          </div>
        ) : nearbyInstitution.error ? (
          <div className="col-span-3 text-center py-4">
            <p className="text-red-500">
              Failed to load institutions. Please try again later.
            </p>
          </div>
        ) : !institutionsData || institutionsData.length === 0 ? (
          <div className="col-span-3 text-center py-4">
            <p>No institutions found in your area.</p>
          </div>
        ) : (
          institutionsData.map((institution) => (
            <InstitutionsCard
              key={institution.identifier}
              icon={institution.logo}
              name={institution.name}
              abbreviation={institution.abbreviation}
              address={institution.address}
              operation_days={institution.operation_days}
              opening_time={institution.opening_time}
              closing_time={institution.closing_time}
              onClick={() =>
                navigate(
                  `/verified-agent-dashboard/reports/hospitals/survey-list/${institution?.identifier}`,
                )
              }
            />
          ))
        )}
      </div>

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
