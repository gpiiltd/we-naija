import React, { useState } from "react";
import Typography from "../../Components/Typography/Typography";
import { TypographyVariant } from "../../Components/types";
import { Formik, Form } from "formik";
import InputField from "../../Components/Input/InputField";
import { Button } from "@gpiiltd/gpi-ui-library";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    existingPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    existingPassword: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character"
      ),
    newPassword: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character"
      ),
    confirmNewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .trim(),
  });

  const handleForgotPassword = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="flex w-full md:w-[50%] px-4  justify-center items-center ">
        <div className="w-full  ">
          <div className="flex flex-col ">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-black "
            >
              Password reset
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray mt-2"
            >
              Change your password
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
                <Form className="flex flex-col gap-5 text-gray-800">
                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="Existing password"
                    name="existingPassword"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  />

                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="New password"
                    name="newPassword"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  />
                  <InputField
                    placeHolder="Enter your password"
                    type={showConfirmPassword ? "password" : "text"}
                    focusStyle="green"
                    label="Confirm new password"
                    name="confirmNewPassword"
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
    </div>
  );
};

export default PasswordReset;
