import React, { useEffect } from "react";
import Typography from "../Components/Typography/Typography";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import InputField from "../Components/Input/InputField";
import { Link } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";
import { useNavigate } from "react-router-dom";
import Icon from "../Assets/SvgImagesAndIcons";
import { useSelector, useDispatch } from "react-redux";
import { triggerForgotPassword } from "../redux/Services/user/UserServices";
import type { AppDispatch } from "../redux/Store/store";
import { RootState } from "../redux/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { resetState, setUserEmail } from "../redux/Slices/user/userSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { error, message,loading} = useSelector((state: RootState) => state.user);

  const initialValues = {
    email: ""
  };

  const handleForgotPassword = (values: any) => {
    const payload = {
      email: values.email.trim().toLowerCase(),
    };
    dispatch(setUserEmail(payload.email));
    dispatch(triggerForgotPassword(payload));
  };

  useEffect(() => {
    if(error) {
      toast.error(error);
    } else if(!error && message) {
      toast(message);
      setTimeout(() => {
        navigate("/forgot-password-otp");
      }, 1000);
    }
    dispatch(resetState());
  }, [error, message, navigate, dispatch]);

  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <ToastContainer />
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
          <div className="flex flex-col justify-center items-center gap-8">
            <Icon type="keys" />
          </div>
          <div className="flex flex-col justify-center items-start lg:items-center pt-6">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-black "
            >
              Forgot password?
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray "
            >
              Enter your email to reset your password{" "}
            </Typography>
          </div>

          <div className="pt-8">
            <Formik
              initialValues={initialValues}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleForgotPassword}
            >
              {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
                <Form className="flex flex-col gap-5">
                  <InputField
                    placeHolder="Enter your email address"
                    type="text"
                    focusStyle="green"
                    label="Email address"
                    name="email"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />

                  <Button
                    text="Reset password"
                    active={isValid && dirty}
                    bg_color="#007A61"
                    text_color="white"
                    loading={loading}
                  />
                </Form>
              )}
            </Formik>
            <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
              <Link to="/login">
                <Typography
                  variant={TypographyVariant.SMALL}
                  className="text-orange font-extrabold cursor-pointer"
                >
                  Go back to login
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
