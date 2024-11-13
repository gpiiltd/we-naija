import React, { useState } from "react";
import Typography from "../Components/Typography/Typography";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import InputField from "../Components/Input/InputField";
import { Link } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";
import { useNavigate } from "react-router-dom";
import Icon from "../Assets/SvgImagesAndIcons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import CustomModal from "../Components/Modal";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    passwordReset: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    passwordReset: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("passwordReset")], "Passwords must match")
      .trim(),
  });

  const handleForgotPassword = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <div className="hidden lg:flex pt-12 w-full  flex-col gap-8 md:pb-8 md:bg-teal_green md:h-screen md:gap-12 lg:pt-18 lg:gap-24 lg:w-2/4 lg:pb-0">
        <div className="md:m-4 flex items-center justify-center">
          <Icon type="logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <Icon type="patients" />
            <div className="hidden md:block pt-6 w-[300px]">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-light_gray text-center"
              >
                Let's build a healthy community together
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 pt-5 justify-center items-center md:px-32 lg:px-56">
        <div className="w-full pt-8 lg:pt-0">
          <div className="flex flex-col justify-center items-start lg:items-center pt-6">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-black "
            >
              Reset password
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray "
            >
              Enter new password{" "}
            </Typography>
          </div>

          <div className="pt-8">
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
                <Form className="flex flex-col gap-5">
                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="New Password"
                    name="passwordReset"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  />
                  <InputField
                    placeHolder="Enter your password"
                    type={showConfirmPassword ? "password" : "text"}
                    focusStyle="green"
                    label="Confirm password"
                    name="confirmPassword"
                    helperText="Passwords matched"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={
                      showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                  />

                  <Button
                    text="Save"
                    active={isValid && dirty}
                    bg_color="#007A61"
                    text_color="white"
                    loading={loading}
                    onClick={handleForgotPassword}
                  />
                </Form>
              )}
            </Formik>
           
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        onClose={()=>setShowModal(false)}
      >
        <div className='flex flex-col gap-6 pb-6'>
          <div className="flex flex-col justify-center items-center pt-6">
          <Icon type='success' />

            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-black pt-3 font-extrabold"
            >
              Password changed successfully
            </Typography>
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-light_gray pt-4"
            >
              Great
            </Typography>
          </div>{" "}
          <Button
            text="Proceed to login"
            active={true}
            bg_color="#007A61"
            text_color="white"
            loading={loading}
            onClick={() => {
              setShowModal(false);
              navigate("/login");
            }}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default ForgotPassword;
