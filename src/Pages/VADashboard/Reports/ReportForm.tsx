import { useEffect, useState } from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import Icon from "../../../Assets/SvgImagesAndIcons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { LuBookMinus } from "react-icons/lu";
import TextAreaField from "../../../Components/Input/TextArea";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@gpiiltd/gpi-ui-library";
import CustomModal from "../../../Components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerAnswerTaskQuestion,
  triggerGetTaskQuestionById,
} from "../../../redux/Services/community/communityServices";
import { toast } from "react-toastify";
import { resetAnswerTaskQuestionState } from "../../../redux/Services/community/communitySlice";

const validationSchema = Yup.object({
  textArea: Yup.string().max(20, "You are allowed a maximum of 20 characters"),
});

const ReportForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskQuestion, setTaskQuestion] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const closeModal = () => setIsModalOpen(false);

  const { taskQuestionById, answerTaskQuestion } = useSelector(
    (state: any) => state.community,
  );

  useEffect(() => {
    dispatch(triggerGetTaskQuestionById(id as string) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (taskQuestionById?.statusCode === 200 && taskQuestionById?.data) {
      setTaskQuestion(taskQuestionById.data);
    }
  }, [taskQuestionById]);

  const giveReport = () => {
    const payload = {
      task: taskQuestion?.identifier,
      answer: answer,
    };

    dispatch(triggerAnswerTaskQuestion(payload) as any);
  };

  useEffect(() => {
    if (answerTaskQuestion?.statusCode === 200 && answerTaskQuestion?.data) {
      toast.success("Report submitted successfully");
      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
        navigate(-1);
      }, 1000);
    }
    if (answerTaskQuestion?.error && answerTaskQuestion?.message) {
      toast.error(`${answerTaskQuestion.message}`);
    }
    dispatch(resetAnswerTaskQuestionState());
  }, [answerTaskQuestion, dispatch, navigate]);

  return (
    <div className="flex mt-8  flex-col md:px-32 ">
      <div className="w-[70%]  rounded-xl self-center shadow-lg px-3 py-4 md:px-12 md:py-12 lg:py-24  flex flex-col justify-start mb-32">
        <div className="flex justify-between gap-3 ">
          <div className="flex gap-2 items-center ">
            <div onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft size={24} className="cursor-pointer" />
            </div>
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-1 text-d_red "
            >
              Task
            </Typography>
            <div className="border border-d_red rounded-full h-5 w-5 flex items-center justify-center pb-1">
              <Typography
                variant={TypographyVariant.SMALL}
                className="pt-1 text-d_red "
              >
                1
              </Typography>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Icon type="starPoints" className="pt-2" />
            <Typography
              variant={TypographyVariant.SMALL}
              className="pt-2 text-orange"
            >
              {taskQuestion?.max_points} star points
            </Typography>
          </div>
        </div>

        {/* main component */}
        <Typography
          variant={TypographyVariant.NORMAL}
          className="font-bold pt-5"
        >
          {taskQuestion?.title}
        </Typography>
        <Icon type="response" className="w-full" />

        <div className="flex gap-1 pt-4">
          <LuBookMinus color="#007A61" />
          <Typography
            variant={TypographyVariant.SMALL}
            className="ext-light_gray"
          >
            Comment
          </Typography>
        </div>
        <Formik
          initialValues={{ textArea: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setAnswer(values.textArea);
          }}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <TextAreaField
                label={""}
                name="textArea"
                placeHolder="Write here..."
              />
              <Button
                text="Submit"
                active={isValid && dirty}
                bg_color="#007A61"
                text_color="white"
                onClick={() => setIsModalOpen(true)}
              />
            </Form>
          )}
        </Formik>
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="  py-2 flex flex-col px-3 gap-3">
            <section className="flex flex-col justify-center items-center gap-4 pb-6">
              <Icon type="warning" />
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-center"
              >
                Are you sure you want to submit?
              </Typography>
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray"
              >
                This action cannot be reversed
              </Typography>
            </section>

            <div className="flex flex-col gap-4 justify-center ">
              <div className="flex flex-col gap-3 ">
                <Button
                  text="Yes, I’m sure"
                  active={true}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                  onClick={giveReport}
                />
                <Button
                  text="Go back"
                  active={true}
                  bg_color="transparent"
                  border_color="#D0D5DD"
                  text_color="#344054"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default ReportForm;
