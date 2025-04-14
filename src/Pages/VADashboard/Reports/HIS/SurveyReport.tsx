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
// import {
//   firstSetQuestions,
//   secondSetQuestions,
//   thirdSetQuestions,
// } from "./questions";
import { triggerSubmitSurveyReport } from "../../../../redux/Services/institute/instituteServices";
import { RootState } from "../../../../redux/Store/store";
import { toast } from "react-toastify";
import { resetSurveyReportState } from "../../../../redux/Services/institute/instituteSlice";


const Survey = ({ surveyQuestions }: { surveyQuestions: any }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFirstAnswer, setSelectedFirstAnswer] = useState<string>("");
  const [comments, setComments] = useState("");
  // const [selectedSecondAnswer, setSelectedSecondAnswer] = useState<string>("");
  // const [selectedthirdAnswer, setSelectedThirdAnswer] = useState<string>("");

  const dispatch = useDispatch();
  const { surveyReport } = useSelector((state: RootState) => state.institute);

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleFirstQuestion = (value: any) => {
    setSelectedFirstAnswer(value);
  };
  // const handleSecondQuestion = (value: any) => {
  //   setSelectedSecondAnswer(value);
  // };
  // const handleThirdQuestion = (value: any) => {
  //   setSelectedThirdAnswer(value);
  // };

  if (surveyQuestions?.[0]?.identifier) {
    localStorage.setItem("surveyQuestionIdentifier", surveyQuestions[0].identifier);
  }

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
      "You are allowed a maximum of 20 characters"
    ),
  });

  const deleteImage = () => {
    setUploadedFileName(null);
  };
  const submitReport = () => {

    const payload = new FormData();
    payload.append("selected_option", selectedFirstAnswer);
    payload.append("images", uploadedFile as File);
    payload.append("comments", comments); 
    
    console.log("payload>>>", payload);
    for (let pair of Array.from(payload.entries())) {
      console.log(`kye: ${pair[0]} value: ${pair[1]}`);
    }
    dispatch(triggerSubmitSurveyReport(payload) as any);
  };
  useEffect(() => {
    if (surveyReport?.statusCode === 200 && surveyReport?.data) {
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 3000);
    }
    if (surveyReport?.error && surveyReport?.message) {
      toast.error(`${surveyReport.message}`);
    }
    dispatch(resetSurveyReportState());
  }, [
    surveyReport.data,
    surveyReport?.error,
    surveyReport.message,
    surveyReport?.statusCode,
    dispatch,
  ]);
 

  return (
    <div className="  flex flex-col gap-10">
      {currentQuestion === 1 && (
        <section>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            This survey is about the{" "}
            <span className="text-primary_green">
              {localStorage.getItem("surveyIndicatorName")}
            </span>{" "}
            for the above institute. Your response is vital for improving
            healthcare in Nigeria. By honestly assessing our health
            institutions, you help drive the change needed for a healthier
            community. Your responses are confidential—your voice can inspire
            real progress.
          </Typography>
          <div className="flex flex-col gap-3 pt-6">
            <Button
              text="I understand"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={true}
              onClick={handleNext}
            />
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-primary_green underline underline-offset-4 tracking-wide text-center cursor-pointer font-bold"
            >
              Watch tutorial video
            </Typography>
          </div>
        </section>
      )}

      {currentQuestion === 2 &&
        (surveyQuestions?.[0] ? (
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
                QUESTION 1 OF 3
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="tracking-wide text-center"
              >
                {surveyQuestions?.[0]?.title}
              </Typography>
            </div>
            <form>
              <section className="flex flex-col gap-5 w-full">
                {surveyQuestions?.[0]?.options.map((option: any) => (
                  <RadioButton
                    key={option.identifier}
                    label={option.text}
                    value={option.identifier}
                    selectedValue={selectedFirstAnswer}
                    onChange={handleFirstQuestion}
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
                active={true}
                onClick={handlePrev}
              />
              <Button
                text="Proceed"
                text_color="#FFFFFF"
                bg_color="#007A61"
                active={selectedFirstAnswer !== ""}
                onClick={handleNext}
              />
            </div>
          </section>
        ) : (
          <Typography
            variant={TypographyVariant.NORMAL}
            className="tracking-wide text-center text-light_gray"
          >
            No questions for this indicator
          </Typography>
        ))}

      {currentQuestion === 3 && (
        <section className="flex flex-col gap-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            {surveyQuestions?.[0]?.title}
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="tracking-wide text-center text-light_gray"
          >
            Based on your response, kindly provide more details about the
            incident.
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
                <label className=" flex gap-2  items-center">
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
                      className=" text-gray-500"
                    >
                      {uploadedFileSize} KB – 100% uploaded{" "}
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
              Additional comments{" "}
            </Typography>
            <Formik
              initialValues={{ textArea: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form submitted with values:", values);
                setComments(values.textArea);
              }}
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
                      text="Proceed"
                      text_color="#FFFFFF"
                      bg_color="#007A61"
                      active={isValid && dirty}
                      onClick={() => {
                        handleSubmit();
                        submitReport();
                      }} 
                    />
                  </div>
                </Form>
              )}
            </Formik>{" "}
          </div>
        </section>
      )}

      {/* {currentQuestion === 4 && (
        <section className="flex flex-col gap-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Acceptability of service
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography
              variant={TypographyVariant.SMALL}
              className="tracking-wide text-center text-light_gray font-thin"
            >
              QUESTION 2 OF 3
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-center"
            >
              How long did you wait before being attended to?{" "}
            </Typography>
          </div>
          <form>
            <section className="flex flex-col gap-5 w-full">
              {secondSetQuestions.map((option) => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  selectedValue={selectedSecondAnswer}
                  onChange={handleSecondQuestion}
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
              active={true}
              onClick={handlePrev}
            />
            <Button
              text="Proceed"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={selectedSecondAnswer !== ""}
              onClick={handleNext}
            />
          </div>
        </section>
      )}
      {currentQuestion === 5 && (
        <section className="flex flex-col gap-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Acceptability of service
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography
              variant={TypographyVariant.SMALL}
              className="tracking-wide text-center text-light_gray font-thin"
            >
              QUESTION 3 OF 3
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-center"
            >
              If you waited more than 20 mins, what was the reason?{" "}
            </Typography>
          </div>
          <form>
            <section className="flex flex-col gap-5 w-full">
              {thirdSetQuestions.map((option) => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  selectedValue={selectedSecondAnswer}
                  onChange={handleThirdQuestion}
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
              active={true}
              onClick={handlePrev}
            />
            <Button
              text="Proceed"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={selectedthirdAnswer !== ""}
              onClick={submitReport}
            />
          </div>
        </section>
      )} */}

      {/* {currentQuestion === 6 && (
        <section className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-3 px-16">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold tracking-wide text-center"
            >
              Acceptability of service
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-center text-light_gray"
            >
              Kindly share your addition assessment based on the ‘accessibility
              of service” for this institution
            </Typography>
          </div>

          <div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="tracking-wide text-start text-black"
            >
              Additional comments (Optional){" "}
            </Typography>
            <Formik
              initialValues={{ textArea: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form submitted with values:", values);
              }}
            >
              {({ handleSubmit }) => (
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
                      onClick={() => navigate(-1)}
                    />
                    <Button
                      text="Proceed"
                      text_color="#FFFFFF"
                      bg_color="#007A61"
                      active={true}
                      onClick={submitReport}
                      loading={loading}
                    />
                  </div>
                </Form>
              )}
            </Formik>{" "}
          </div>
        </section>
      )} */}

      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="py-3 pb-6 px-5 gap-2 flex flex-col items-center">
          <Icon type="success" />
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-bold tracking-wide text-center"
          >
            Survey successfully submitted{" "}
          </Typography>
          <div>
            <div className="flex gap-1 items-center">
              <Icon type="starPoints" />
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold tracking-wide  text-orange"
              >
                5 star points earned.
              </Typography>
            </div>
            <Typography
              variant={TypographyVariant.SMALL}
              className=" tracking-wide text-center text-light_gray font-thin"
            >
              Keep the good work going!{" "}
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

export default Survey;
