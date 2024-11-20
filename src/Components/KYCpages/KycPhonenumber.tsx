import React, { useState } from "react";
import { Button, Header, Typography } from "@gpiiltd/gpi-ui-library";
import logo from "../Assets/svgImages/logo.svg";
import { TypographyVariant } from "../../Components/types";
import SkipButton from "./SkipButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import Icon from "../../Assets/SvgImagesAndIcons";
import HeaderComponent from "../Header/Header";
import { useNavigate } from "react-router-dom";

const KycPhonenumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    // Handle the proceed action (e.g., send OTP)
    console.log("Proceed with phone number:", phoneNumber);
  };

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters long")
      .typeError("Phone number must be a number"),
  });

  return (
    <>
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
        <div className="bg-white p-8 rounded-lg shadow-lg  lg:px-48 lg:py-36">
          <div className="flex items-center justify-center gap-4">
            <Icon type="mobile" className="w-10 h-10 mb-4" />
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-center mb-4"
            >
              Validate Phone Number
            </Typography>
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center mb-6 text-gray-500"
          >
            A 6-digit code will be sent via SMS to verify this number.
          </Typography>

          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty }) => (
              <Form>
                <div className="flex items-start mb-8">
                  <div className=" flex items-center justify-center w-[40%] h-14    border border-primary_color rounded-l-xl border-r-0">
                    <Icon type="nigerianflag" className="w-6 h-6 mr-4" />

                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-gray-500  "
                    >
                      +234
                    </Typography>
                  </div>
                  <InputField
                    placeHolder="Enter your phone number"
                    type="text"
                    focusStyle="green"
                    label="Phone number"
                    name="phoneNumber"
                  />
                </div>

                <Button
                  text="Proceed"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  onClick={() => navigate("/kyc/enter-otp")}
                />
              </Form>
            )}
          </Formik>
          <div className="flex pt-4 items-center justify-center">
            <SkipButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default KycPhonenumber;
