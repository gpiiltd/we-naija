import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TypographyVariant } from "../../../../Components/types";
import Typography from "../../../../Components/Typography";
import Icon from "../../../../Assets/SvgImagesAndIcons";
import { Button } from "@gpiiltd/gpi-ui-library";
import CustomModal from "../../../../Components/Modal";
import TextAreaField from "../../../../Components/Input/TextArea";
import RadioButton from "../../../../Components/Input/SelectOption";
import { useNavigate } from "react-router-dom";
import imageUploadIcon from "../../../../Assets/svgImages/upload.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { triggerSubmitSurveyReport } from "../../../../redux/Services/institute/instituteServices";
import { RootState } from "../../../../redux/Store/store";
import { toast } from "react-toastify";
import { resetSurveyReportState } from "../../../../redux/Services/institute/instituteSlice";

interface SurveyQuestion {
  identifier: string;
  title: string;
  options: {
    identifier: string;
    text: string;
  }[];
}

const SurveyCopy = ({
  surveyQuestions,
}: {
  surveyQuestions: SurveyQuestion[];
}) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showCommentSection, setShowCommentSection] = useState(false);

  const dispatch = useDispatch();
  const { surveyReport } = useSelector((state: RootState) => state.institute);

  console.log("SURVEY QUESTIONS", surveyQuestions);
  const handleNext = () => {
    if (!surveyQuestions || surveyQuestions.length === 0) return;

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowCommentSection(true);
    }
  };

  const handlePrev = () => {
    if (showCommentSection) {
      setShowCommentSection(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadedFileSize(file.size);
      setUploadedFile(file);
    }
  };

  const validationSchema = Yup.object({
    textArea: Yup.string().max(
      20,
      "You are allowed a maximum of 20 characters",
    ),
  });

  const deleteImage = () => {
    setUploadedFileName(null);
    setUploadedFile(null);
  };

  const submitReport = (values: any) => {
    const payload = new FormData();
    Object.entries(selectedAnswers).forEach(([questionId, answerId]) => {
      payload.append(`question_${questionId}`, answerId);
    });
    if (uploadedFile) {
      payload.append("images", uploadedFile);
    }
    if (values.textArea) {
      payload.append("comment", values.textArea);
    }

    console.log("PAYLOAD", payload);
    for (let pair of Array.from(payload.entries())) {
      console.log(`kye: ${pair[0]} value: ${pair[1]}`);
    }
    dispatch(triggerSubmitSurveyReport(payload) as any);
  };

  useEffect(() => {
    if (surveyReport?.statusCode === 200 && surveyReport?.data) {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
    if (surveyReport?.error && surveyReport?.message) {
      toast.error(`${surveyReport.message}`);
    }
    dispatch(resetSurveyReportState());
  }, [surveyReport, dispatch]);

  const currentQuestion = surveyQuestions?.[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.identifier || "";
  const currentAnswer = selectedAnswers[currentQuestionId] || "";

  if (!surveyQuestions || surveyQuestions.length === 0 || !currentQuestion) {
    return (
      <Typography variant={TypographyVariant.NORMAL} className="text-center">
        No questions available for this survey
      </Typography>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {!showCommentSection ? (
        <section className="flex flex-col gap-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            {localStorage.getItem("surveyIndicatorName")}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography
              variant={TypographyVariant.SMALL}
              className="tracking-wide text-center text-light_gray font-thin"
            >
              QUESTION {currentQuestionIndex + 1} OF {surveyQuestions.length}
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-center"
            >
              {currentQuestion?.title}
            </Typography>
          </div>
          <form>
            <section className="flex flex-col gap-5 w-full">
              {currentQuestion?.options.map((option) => (
                <RadioButton
                  key={option.identifier}
                  label={option.text}
                  value={option.identifier}
                  selectedValue={currentAnswer}
                  onChange={() =>
                    handleAnswerSelect(currentQuestionId, option.identifier)
                  }
                />
              ))}
            </section>
          </form>
          <div className="flex flex-row gap-3">
            <Button
              text="Prev. question"
              text_color="#17191C"
              bg_color="transparent"
              border_color="#17191C"
              active={currentQuestionIndex > 0}
              onClick={handlePrev}
            />
            <Button
              text={
                currentQuestionIndex === surveyQuestions.length - 1
                  ? "Proceed to comments"
                  : "Next question"
              }
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={!!currentAnswer}
              onClick={handleNext}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Additional Comments
          </Typography>
          <section>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-start text-black"
            >
              Kindly upload an image
            </Typography>
            {uploadedFileName ? (
              <section className="flex justify-between items-center w-full border border-primary_green rounded-lg mt-2 p-3">
                <label className="flex gap-2 items-center">
                  <Icon type="imageUploadIcon" />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-black font-bold"
                    >
                      {uploadedFileName}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-gray-500"
                    >
                      {uploadedFileSize} KB – 100% uploaded
                    </Typography>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <RiDeleteBin6Line onClick={deleteImage} />
              </section>
            ) : (
              <label className="block pt-3 cursor-pointer w-full">
                <img
                  src={imageUploadIcon}
                  alt="Upload"
                  className="w-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </section>

          <div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-start text-black"
            >
              Additional comments
            </Typography>
            <Formik
              initialValues={{ textArea: "" }}
              validationSchema={validationSchema}
              onSubmit={submitReport}
            >
              {({ handleSubmit, isValid, dirty }) => (
                <Form onSubmit={handleSubmit}>
                  <TextAreaField
                    label={""}
                    name="textArea"
                    placeHolder="Write here..."
                  />

                  <div className="flex flex-row gap-3 pt-4">
                    <Button
                      text="Prev. question"
                      text_color="#17191C"
                      bg_color="transparent"
                      border_color="#17191C"
                      active={true}
                      onClick={handlePrev}
                    />
                    <Button
                      text="Submit"
                      text_color="#FFFFFF"
                      bg_color="#007A61"
                      active={isValid && dirty}
                      onClick={handleSubmit}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      )}

      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="py-3 pb-6 px-5 gap-2 flex flex-col items-center">
          <Icon type="success" />
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Survey successfully submitted
          </Typography>
          <div>
            <div className="flex gap-1 items-center">
              <Icon type="starPoints" />
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide text-orange"
              >
                5 star points earned.
              </Typography>
            </div>
            <Typography
              variant={TypographyVariant.SMALL}
              className="tracking-wide text-center text-light_gray font-thin"
            >
              Keep the good work going!
            </Typography>
          </div>

          <div className="pt-3 w-full">
            <Button
              text="Okay"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={true}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default SurveyCopy;
