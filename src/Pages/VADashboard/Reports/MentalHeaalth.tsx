import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import Icon from "../../../Assets/SvgImagesAndIcons";
import Breadcrumb from "./BreadCrum";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { triggerGetTaskQuestions } from "../../../redux/Services/community/communityServices";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { triggerGetUserProfile } from "../../../redux/Services/settings/settingsServices";
import "react-toastify/dist/ReactToastify.css";

const MentalHeaalth = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any>([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { taskQuestions } = useSelector((state: RootState) => state.community);
  const { userData } = useSelector((state: RootState) => state.user);
  const { userProfileData } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(triggerGetTaskQuestions(id as string) as any);
    dispatch(triggerGetUserProfile({}) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (taskQuestions.data && !taskQuestions.error) {
      setTasks(taskQuestions.data);
    }

    if (taskQuestions.error) {
      toast.error(taskQuestions.error);
    }
  }, [taskQuestions]);

  const indicatorDetails = JSON.parse(
    localStorage.getItem("indicatorDetails") || "{}",
  );

  const kycStatus = userProfileData?.data?.kyc_status || userData?.kyc_status;

  const handleTaskClick = (taskIdentifier: string) => {
    if (kycStatus === "approved") {
      navigate(
        `/verified-agent-dashboard/reports/community-tasks/task/report-form/${taskIdentifier}`,
      );
    } else {
      setTimeout(() => {
        toast.error(
          "You cannot perform this action as your KYC has not been approved",
        );
      }, 100);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex gap-3 items-center">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>
        <Typography variant={TypographyVariant.SUBTITLE}>
          {indicatorDetails.name}
        </Typography>
      </div>
      <Breadcrumb />

      <Typography
        variant={TypographyVariant.SMALL}
        className="pt-1 text-light_gray max-w-lg"
      >
        {indicatorDetails.description}
      </Typography>

      <div className="flex mt-8  flex-col md:px-12 lg:px-52">
        <div className="rounded-lg self-center shadow-lg px-3 py-4 md:px-16 md:py-12 flex flex-col justify-start mb-16">
          <div className="flex flex-col justify-start ">
            <Typography variant={TypographyVariant.SUBTITLE}>
              {indicatorDetails.name}
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-light_gray max-w-lg"
            >
              {indicatorDetails.description}
            </Typography>

            <div className="flex gap-3 ">
              <div className="flex gap-2 items-center ">
                <Icon type="tasks" className="pt-1" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-light_gray"
                >
                  {indicatorDetails.taskCount} tasks
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon type="starPoints" className="pt-2" />
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="pt-2 text-orange"
                >
                  {indicatorDetails.totalPoints} star points
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {taskQuestions.loading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#007A61" size={24} className="mr-6" />
                Loading...
              </div>
            ) : tasks && tasks.length > 0 ? (
              tasks.map((task: any, index: any) => (
                <div key={index} className="flex gap-3 w-full items-center">
                  <div className="border border-d_red rounded-full h-5 w-5 flex items-center justify-center pb-1">
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="pt-1 text-d_red"
                    >
                      {index + 1}
                    </Typography>
                  </div>
                  <div
                    className={`w-full flex justify-between items-center py-4 px-6 gap-6 ${
                      kycStatus === "approved"
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    } shadow rounded-lg bg-white`}
                    onClick={() => handleTaskClick(task.identifier)}
                  >
                    <div>
                      <Typography
                        variant={TypographyVariant.NORMAL}
                        className="font-bold tracking-wide"
                      >
                        {task.question}
                      </Typography>
                    </div>
                    <div className="bg-effect_green p-1 rounded-full">
                      <IoIosArrowForward
                        className="font-extrabold"
                        size={24}
                        color="#007A61"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-center text-light_gray"
              >
                No tasks available
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHeaalth;
