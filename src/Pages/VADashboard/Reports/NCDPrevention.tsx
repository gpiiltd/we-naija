import React from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../Assets/SvgImagesAndIcons";
import ProgressBar from "../../../Components/Home/ProgressBar";
import { handleBreadCrumbNavigate } from "../../../utils/handleBreadCrumb";
import Breadcrumb from "./BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetCommunityTaskCategoryById } from "../../../redux/Services/community/communityServices";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/Store/store";
import { resetCommunityTaskCategoryByIdState } from "../../../redux/Services/community/communitySlice";
import { ClipLoader } from "react-spinners";

const NCDPrevention = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [communityTaskCategory, setCommunityTaskCategory] = useState<any>({});
  // const [indicators, setIndicators] = useState<any>({});
  const { communityTaskCategoryById } = useSelector(
    (state: RootState) => state.community,
  );

  useEffect(() => {
    // dispatch(triggerGetAllIndicators({}) as any);
    dispatch(triggerGetCommunityTaskCategoryById(id as string) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (
      communityTaskCategoryById?.statusCode === 200 &&
      communityTaskCategoryById
    ) {
      setCommunityTaskCategory(communityTaskCategoryById.data.data);
    }
    dispatch(resetCommunityTaskCategoryByIdState());
  }, [communityTaskCategoryById, dispatch]);

  return (
    <div>
      <div className="flex gap-3 items-center mb-2">
        <div onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} className="cursor-pointer" />
        </div>
        <Typography variant={TypographyVariant.SUBTITLE}>
          {communityTaskCategory?.name}
        </Typography>
      </div>
      <Breadcrumb />

      <Typography
        variant={TypographyVariant.SMALL}
        className="pt-1 text-light_gray max-w-lg mt-2"
      >
        {communityTaskCategory?.description}
      </Typography>
      <div className="pt-4">
        <Typography variant={TypographyVariant.NORMAL}>
          Indicators ({communityTaskCategory?.indicators?.length}){" "}
        </Typography>{" "}
        <Typography
          variant={TypographyVariant.SMALL}
          className="pt-2 text-light_gray"
        >
          Kindly select the community indicator you would like to perform a task
          on.{" "}
        </Typography>
      </div>
      <div className="grid gap-6 py-6 pb-48 grid-cols-1 md:grid-cols-2">
        {communityTaskCategoryById.loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ClipLoader color="#007A61" size={24} className="mr-6" />
            Loading...
          </div>
        ) : communityTaskCategory?.indicators?.length > 0 ? (
          communityTaskCategory.indicators.map((indicator: any, index: any) => (
            <Card key={index} titleLeft={undefined} titleRight={undefined}>
              <div
                className="py-8 px-6"
                // onClick={() => {
                //   localStorage.setItem("indicatorName", indicator.name);
                //   navigate(
                //     `/verified-agent-dashboard/reports/community-tasks/NCD-prevention/${indicator.identifier}`
                //   );
                // }}

                onClick={() => {
                  const indicatorDetails = {
                    name: indicator.name,
                    description: indicator.description,
                    taskCount: indicator.task_count,
                    totalPoints: indicator.total_points,
                    identifier: indicator.identifier,
                  };
                  localStorage.setItem(
                    "indicatorDetails",
                    JSON.stringify(indicatorDetails),
                  );
                  // localStorage.setItem("indicatorName", indicator.name);
                  // localStorage.setItem("indicatorDescription", indicator.description);
                  handleBreadCrumbNavigate(
                    `/verified-agent-dashboard/reports/community-tasks/indicator/${indicator.name.replace(
                      /\s+/g,
                      "",
                    )}/${indicator.identifier}`,
                    indicator.name,
                    navigate,
                  );
                }}
              >
                <div className="flex gap-2 items-center justify-between cursor-pointer">
                  <div>
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="font-bold tracking-wide"
                    >
                      {indicator.name}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="pt-2 text-light_gray"
                    >
                      {indicator.description}
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
                <div className="flex gap-3">
                  <div className="flex gap-2 items-center justify-center">
                    <Icon type="kyc" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className=" text-light_gray"
                    >
                      {indicator.task_count} tasks
                    </Typography>
                  </div>
                  <div className="flex items-center justify-center gap-2   ">
                    <Icon type="starPoints" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className=" text-light_gray"
                    >
                      {indicator.total_points} points
                    </Typography>
                  </div>
                </div>
                <ProgressBar percentage={50} />
              </div>
            </Card>
          ))
        ) : (
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center text-light_gray"
          >
            No indicators found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default NCDPrevention;
