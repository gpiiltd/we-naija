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
  const [selectedOption, setSelectedOption] = useState<{
    identifier: string;
    requires_comment: boolean;
    requires_image: boolean;
  } | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const dispatch = useDispatch();
  const { surveyReport } = useSelector((state: RootState) => state.institute);

  console.log("SURVEY QUESTIONS", surveyQuestions);
  const handleNext = async () => {
    if (!surveyQuestions || surveyQuestions.length === 0) return;

    if (
      !showAdditionalInfo &&
      (selectedOption?.requires_image || selectedOption?.requires_comment)
    ) {
      setShowAdditionalInfo(true);
      return;
    }

    // Submit the current question's answer
    const formData = new FormData();
    if (currentQuestionId && currentAnswer) {
      formData.append(`selected_option`, currentAnswer);
    }
    if (uploadedFile) {
      formData.append("images", uploadedFile);
    }
    if (commentText) {
      formData.append("comment", commentText);
    }
    console.log("FORM DATA", formData);
    for (let pair of Array.from(formData.entries())) {
      console.log(`kye: ${pair[0]} value: ${pair[1]}`);
    }

    try {
      await dispatch(triggerSubmitSurveyReport(formData) as any);

      // Only move to next question if we're not on the last one
      if (currentQuestionIndex < surveyQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setUploadedFileName(null);
        setUploadedFileSize(null);
        setUploadedFile(null);
        setCommentText("");
        setShowAdditionalInfo(false);
        setSelectedAnswers((prev) => {
          const newAnswers = { ...prev };
          delete newAnswers[currentQuestionId];
          return newAnswers;
        });
      } else {
        // If it's the last question, show success modal
        setShowModal(true);
      }
    } catch (error) {
      // Handle error if submission fails
      console.error("Failed to submit answer:", error);
      // You might want to show an error message to the user here
    }
  };

  const handlePrev = () => {
    if (showAdditionalInfo) {
      setShowAdditionalInfo(false);
      return;
    }

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(null);
      setUploadedFileName(null);
      setUploadedFileSize(null);
      setUploadedFile(null);
      setCommentText("");
    }
  };

  const handleAnswerSelect = (
    questionId: string,
    answerId: string,
    option: any
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
    setSelectedOption(option);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadedFileSize(file.size);
      setUploadedFile(file);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const isCommentValid = () => {
    if (!selectedOption?.requires_comment) return true;
    return commentText.length > 0 && commentText.length <= 20;
  };

  const validationSchema = Yup.object({
    textArea: Yup.string().max(
      20,
      "You are allowed a maximum of 20 characters"
    ),
  });

  const deleteImage = () => {
    setUploadedFileName(null);
    setUploadedFile(null);
  };

  useEffect(() => {
    if (surveyReport?.statusCode === 200 && surveyReport?.data) {
      // Clear the survey report state after successful submission
      dispatch(resetSurveyReportState());
    }
    if (surveyReport?.error && surveyReport?.message) {
      toast.error(`${surveyReport.message}`);
      dispatch(resetSurveyReportState());
    }
  }, [surveyReport, dispatch]);

  const currentQuestion = surveyQuestions?.[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.identifier || "";
  const currentAnswer = selectedAnswers[currentQuestionId] || "";

  const isNextButtonActive = () => {
    if (!currentAnswer) return false;

    if (showAdditionalInfo) {
      if (selectedOption?.requires_image && !uploadedFile) return false;
      if (
        selectedOption?.requires_comment &&
        (!commentText || commentText.length > 250)
      )
        return false;
    }

    return true;
  };

  if (!surveyQuestions || surveyQuestions.length === 0 || !currentQuestion) {
    return (
      <Typography variant={TypographyVariant.NORMAL} className="text-center">
        No questions available for this survey
      </Typography>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {!showAdditionalInfo ? (
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
                    handleAnswerSelect(
                      currentQuestionId,
                      option.identifier,
                      option
                    )
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
                selectedOption?.requires_image ||
                selectedOption?.requires_comment
                  ? "Proceed"
                  : "Submit Answer"
              }
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={isNextButtonActive()}
              onClick={handleNext}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-6">
          <Typography variant={TypographyVariant.NORMAL} className="text-center mb-4">
            {currentQuestion?.title}
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Based on your response, kindly provide more details about the
            incident.
          </Typography>

          {selectedOption?.requires_image && (
            <div>
              <Typography variant={TypographyVariant.NORMAL} className="mb-4">
                Kindly upload images
              </Typography>
              {uploadedFileName ? (
                <section className="flex justify-between items-center w-full border border-primary_green rounded-lg p-3">
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
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <label className="cursor-pointer w-full">
                    <Icon type="imageUploadIcon" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-gray-500 mt-2"
                    >
                      Kindly upload it as an image or pdf
                    </Typography>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green mt-1"
                    >
                      Choose a file
                    </Typography>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {selectedOption?.requires_comment && (
            <div>
              <Typography variant={TypographyVariant.NORMAL} className="mb-4">
                Additional comments
              </Typography>
              <textarea
                className="w-full p-4 border rounded-lg"
                placeholder="Write here..."
                value={commentText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCommentText(e.target.value)
                }
                rows={6}
              />
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-gray-500 mt-2"
              >
                You are allowed a maximum of 250 characters
              </Typography>
              {commentText.length > 250 && (
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="text-red-500 mt-1"
                >
                  Maximum character limit exceeded
                </Typography>
              )}
            </div>
          )}

          <div className="flex flex-row gap-3 mt-4">
            <Button
              text="Prev. question"
              text_color="#17191C"
              bg_color="transparent"
              border_color="#17191C"
              active={true}
              onClick={handlePrev}
            />
            <Button
              text="Submit Answer"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={isNextButtonActive()}
              onClick={handleNext}
            />
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
