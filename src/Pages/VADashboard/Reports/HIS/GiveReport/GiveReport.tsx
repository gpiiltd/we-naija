import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../../../../Assets/SvgImagesAndIcons";
import Typography from "../../../../../Components/Typography";
import { TypographyVariant } from "../../../../../Components/types";
import { Card } from "@gpiiltd/gpi-ui-library";
// import Survey from "../SurveyReport";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store/store";
import { triggerSurveyIndicatorQuestions } from "../../../../../redux/Services/institute/instituteServices";
import SurveyCopy from "../SurveyReportCopy";

const GiveReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { surveyIndicatorQuestions } = useSelector(
    (state: RootState) => state.institute,
  );
  const [surveyIndicatorQuestionsData, setSurveyIndicatorQuestionsData] =
    useState<any>([]);

  useEffect(() => {
    dispatch(triggerSurveyIndicatorQuestions({ indicatorId: id as string }));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      surveyIndicatorQuestions.statusCode === 200 ||
      surveyIndicatorQuestions.data
    ) {
      setSurveyIndicatorQuestionsData(surveyIndicatorQuestions.data);
    }
    if (surveyIndicatorQuestions.error && surveyIndicatorQuestions.message) {
      console.log("surveyIndicatorQuestions.error");
    }
  }, [
    surveyIndicatorQuestions.statusCode,
    surveyIndicatorQuestions.data,
    surveyIndicatorQuestions.error,
    surveyIndicatorQuestions.message,
  ]);

  return (
    <div className=" flex flex-col items-center justify-center">
      <section className="w-full">
        <div className="flex gap-3 items-center mb-6">
          <div onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={24} className="cursor-pointer" />
          </div>
          <Icon type="homeAvatar" className="pr-2" />
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="font-bold"
          >
            {localStorage.getItem("institutionName")}
          </Typography>
        </div>
      </section>
      <section className="py-6 pb-16 w-full flex justify-center">
        <Card titleLeft={undefined} titleRight={undefined} width="48.61%">
          <div className=" px-16 pt-8 pb-10">
            <SurveyCopy
              surveyQuestions={surveyIndicatorQuestionsData}
              loading={surveyIndicatorQuestions.loading}
            />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default GiveReport;
