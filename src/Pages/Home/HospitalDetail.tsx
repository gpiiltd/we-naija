import React, { useEffect, useState } from "react";
import Icon from "../../Assets/SvgImagesAndIcons";
import SurveysCard from "../../Components/Home/SurveyCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { triggerGetInstituteById } from "../../redux/Services/user/UserServices";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { resetState } from "../../redux/Slices/user/userSlice";
import { toast } from "react-toastify";

function HospitalDetail() {
  const [instituteDetails, setInstituteDetails] = useState<any>(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { instituteData, error, message } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(triggerGetInstituteById(id as string) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (instituteData && !error) {
      const userData = instituteData as any;
      setInstituteDetails(userData.data);
    }

    if (error && !instituteData) {
      console.error("Error fetching institution by id", message);
      toast.error(message);
    }
    dispatch(resetState());
  }, [error, message, instituteData, dispatch]);

  console.log("instituteDetails*****", instituteDetails);

  return (
    <div className="w-full h-[160vh] overscroll-contain">
      <div className="w-full  items-start">
        <div className="flex ">
          <Icon type="arrowBackSvg" className="mr-8" />
          <div className="flex justify-start items-center">
            <Icon type="homeAvatar" className="pr-2 size-12" />
            <p className="font-bold text-lg">
              {instituteDetails?.name} (
              {instituteDetails?.name
                ?.split(" ")
                .map((word: string) => word[0])
                .join("")}
              )
            </p>
          </div>
        </div>
        <div className="w-[70vw] pl-0 pr-4 lg:pl-16 lg:pr-48 md:pl-16 md:pr-48  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 pb-16 mt-4">
          {/* 1 */}
          <div className="flex justify-start items-center pb-2">
            <Icon type="locationGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">
              {instituteDetails?.address}
            </p>
          </div>

          {/* 2 */}
          <div className="flex justify-start items-center pb-2">
            <Icon type="timeGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">
              {instituteDetails?.operation_days}
            </p>
          </div>

          {/* 3 */}
          <div className="flex justify-start items-center pb-2">
            <Icon type="callingGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">
              {instituteDetails?.mobile_number}
            </p>
          </div>

          {/* 4 */}
          <div className="flex justify-start items-center pb-2">
            <Icon type="messageGreenSvg" className="text-[#007A61] pr-2" />
            <p className="font-normal text-sm text-[#5E5959]">
              {instituteDetails?.email}
            </p>
          </div>
        </div>

        <p className="font-bold text-lg">
          Survey list ({instituteDetails?.survey_count})
        </p>
        <p className="font-normal text-sm text-[#5E5959] mt-2">
          Kindly select the survey indicator you would like to report
          <br />
          on this institution.
        </p>
      </div>

      <SurveysCard
        responseTimeMessage="Acceptability of services"
        statusMessage="Lorem ipsum dolor sit amet consectetur. Orci enim pulvinar pulvinar adipiscing."
        progressPercentage={45}
      />

      {/* This is the last content */}
      <div className="w-full bg-slate-200 mt-16 flex px-40 py-14 rounded-lg font-bold text-lg">
        <div className="w-full flex justify-between items-center">
          <p>Have generic feedback or reports on this facility?</p>
          <div className="flex ">
            {/* <button className="border-[1.5px] border-[#5E5959] rounded-lg mt-6 text-[#5E5959] text-sm font-bold items-center px-[5rem] py-[1rem] lg:px-[7rem] sm:px-[5rem] md:px-[5rem]">Show more</button> */}

            <button className="border-[1.5px] px-14 py-3 border-[#5E5959] rounded-lg text-black text-sm font-bold mr-5">
              Upload images
            </button>
            <button className="bg-[#007A61] px-14 py-3 rounded-lg  text-white text-sm font-normal">
              Write a report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetail;
