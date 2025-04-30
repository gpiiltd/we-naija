import React from "react";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import LandingBg from "../../Assets/svgImages/landing-bg.svg";
import Icon from "../../Assets/SvgImagesAndIcons";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import { Button } from "@gpiiltd/gpi-ui-library";
import TextAreaField from "../../Components/Input/TextArea";

const ContactView = () => {
  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    fName: Yup.string().required("First Name is required").trim(),

    lName: Yup.string().required("Last Name is required").trim(),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    phone: Yup.number().required("Phone Number is required"),
    message: Yup.string().required("Message is required").trim(),
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-10 mt-16 md:mt-0 lg:mt-0">
      <Typography
        variant={TypographyVariant.TITLE}
        className="text-4xl font-bold text-gray-800 mb-2"
      >
        CONTACT US
      </Typography>
      <Typography
        variant={TypographyVariant.SMALL}
        className="max-w-md text-[#5C5C5C] mb-8 mt-4 font-light text-center"
      >
        Have any question or feedback, feel free to reach out to us. We are
        always available to help.
      </Typography>

      {/* contact view section */}
      <div className="bg-white w-full flex flex-col md:flex-row max-w-5xl">
        {/* Left Section */}
        <div className="bg-green-800 text-white p-6 md:p-8 relative w-full basis-1/3">
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${LandingBg})`,
              zIndex: 0,
            }}
          ></div>
          <div className="flex flex-col justify-between h-full py-2">
            <div>
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="font-bold mb-2"
              >
                Contact Information
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-light mb-6 text-sm text-[#E5E7EB]"
              >
                Fill up the form and we’ll get back to you in few hours.
              </Typography>
              <div className="space-y-4 mb-6 md:mt-10">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">
                    <IoCall />
                  </span>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="font-light text-[#E5E7EB]"
                  >
                    +29000000000
                  </Typography>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">
                    <MdEmail />
                  </span>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="font-light text-[#E5E7EB]"
                  >
                    hello@mail.com
                  </Typography>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">
                    <IoLocation />
                  </span>
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="font-light text-[#E5E7EB]"
                  >
                    33. New York City, United States.
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <ul className="flex space-x-6 md:space-x-6">
                <li className="cursor-pointer">
                  <Icon type="facebookContact" />
                </li>
                <li className="cursor-pointer">
                  <Icon type="xContact" />
                </li>
                <li className="cursor-pointer">
                  <Icon type="insta2Contact" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-8 md:p-8 w-full basis-2/3">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    placeHolder="First Name"
                    type="text"
                    focusStyle="green"
                    label="First Name"
                    name="fName"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <InputField
                    placeHolder="Last Name"
                    type="text"
                    focusStyle="green"
                    label="Last Name"
                    name="lName"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    placeHolder="Email address"
                    type="text"
                    focusStyle="green"
                    label="Email address"
                    name="email"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <InputField
                    placeHolder="Phone Number"
                    type="text"
                    focusStyle="green"
                    label="Phone Number"
                    name="phone"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </div>
                {/* <TextArea
                  placeHolder="Message"
                  type="text"
                  focusStyle="green"
                  label="Message"
                  name="message"
                /> */}

                <TextAreaField
                  label={""}
                  name="message"
                  placeHolder="Write message here..."
                />

                <div className="w-[15rem] mt-8">
                  <Button
                    text="Send message"
                    active={isValid && dirty}
                    //active={true}
                    bg_color="#007A61"
                    text_color="white"
                    loading={false}
                    onClick={() => {}}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
