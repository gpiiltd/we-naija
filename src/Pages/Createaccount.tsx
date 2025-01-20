/* eslint-disable react-hooks/exhaustive-deps */
//input component will be replaced with UI library input component aster testing
import React, { useEffect, useState } from "react";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography";
import { TypographyVariant } from "../Components/types";
import InputField from "../Components/Input/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";
import { useSelector, useDispatch } from "react-redux";
import { triggerUserSignup } from "../redux/Services/user/UserServices";
import type { AppDispatch } from "../redux/Store/store";
import { RootState } from "../redux/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetState } from "../redux/Slices/user/userSlice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { error, userData, message, loading } = useSelector(
    (state: RootState) => state.user
  );

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .trim(),
  });

  const handleSignup = (values: any) => {
    const payload = {
      email: values.email.trim().toLowerCase(),
      full_name: values.fullName.trim(),
      password: values.password.trim(),
      user_type: "customer",
    };
    dispatch(triggerUserSignup(payload));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!error && Object.keys(userData).length > 0) {
      toast("Signup successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    dispatch(resetState());
  }, [error, userData, message, loading]);

  return (
    <AuthPages>
      <ToastContainer />
      <div className="w-full">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-black md:text-center"
        >
          Create Account
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-light_gray md:text-center "
        >
          Kindly fill in your details to sign up
        </Typography>
        <div className="pt-10">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
              <Form className="flex flex-col gap-5">
                <InputField
                  placeHolder="Enter your email address"
                  type="text"
                  focusStyle="green"
                  label="Full Name"
                  name="fullName"
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <InputField
                  placeHolder="Enter your email address"
                  type="text"
                  focusStyle="green"
                  label="Email address"
                  name="email"
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <InputField
                  placeHolder="Enter your password"
                  type={showPassword ? "password" : "text"}
                  focusStyle="green"
                  label="Password"
                  name="password"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  helperText="Password strong"
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <InputField
                  placeHolder="Enter your password"
                  type={showConfirmPassword ? "password" : "text"}
                  focusStyle="green"
                  label="Confirm password"
                  name="confirmPassword"
                  helperText="Passwords matched"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  icon={showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <Button
                  text="Sign Up"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                />
              </Form>
            )}
          </Formik>
          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            <Typography variant={TypographyVariant.SMALL}>
              Already have an account?
            </Typography>
            <Link to="/">
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-orange font-extrabold cursor-pointer"
              >
                Login
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </AuthPages>
  );
};

export default SignUp;
