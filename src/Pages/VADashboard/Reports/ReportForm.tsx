import React, { useState } from "react";
import Typography from "../../../Components/Typography";
import { TypographyVariant } from "../../../Components/types";
import Icon from "../../../Assets/SvgImagesAndIcons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { LuBookMinus } from "react-icons/lu";
import TextAreaField from "../../../Components/Input/TextArea";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@gpiiltd/gpi-ui-library";
import CustomModal from "../../../Components/Modal";

const validationSchema = Yup.object({
  textArea: Yup.string()
    .max(20, "Text must be 20 characters or less")
    .required("This field is required"),
});
const ReportForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

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
              15 star points
            </Typography>
          </div>
        </div>

        {/* main component */}
        <Typography variant={TypographyVariant.NORMAL} className="font-bold pt-5">
          What do you understand by mental health?
        </Typography>
        <div className="flex gap-1 pt-4">
          <LuBookMinus color="green" />
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
            console.log("Form submitted with values:", values);
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
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="My Custom Modal"
        >
          <div className="  py-4 flex flex-col ">
            <div className='flex flex-col gap-4 justify-center items-center'>
               <Icon type='warning'/>
            <Typography variant={TypographyVariant.NORMAL}>
              Are you sure you want to submit?
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-light_gray"
            >
              This action cannot be reversed
            </Typography>
            <div className='flex flex-col gap-3 w-full'>
            <Button
                text="Yes, I’m sure"
                active={true}
                bg_color="#007A61"
                text_color="white"
                onClick={() => navigate('/verified-agent-dashboard/reports/community-tasks/NCD-prevention/mental-health-promotion')}
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
