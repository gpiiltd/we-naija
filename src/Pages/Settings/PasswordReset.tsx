import React, { useEffect, useState, useRef } from "react";
import Typography from "../../Components/Typography/Typography";
import { TypographyVariant } from "../../Components/types";
import { Formik, Form } from "formik";
import InputField from "../../Components/Input/InputField";
import { Button } from "@gpiiltd/gpi-ui-library";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";
import { triggerChangePassword } from "../../redux/Services/settings/settingsServices";
import { RootState, AppDispatch } from "../../redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { resetChangePasswordState } from "../../redux/Services/settings/settingsSlice";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { changePassword } = useSelector((state: RootState) => state.settings);
  const dispatch: AppDispatch = useDispatch();

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
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character",
      ),
    newPassword: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character",
      ),
    confirmNewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .trim(),
  });

  const handleForgotPassword = (values: any) => {
    setLoading(!loading);
    const payload = {
      old_password: values.existingPassword,
      new_password: values.newPassword,
    };

    dispatch(triggerChangePassword(payload));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const formikRef = useRef<any>(null);

  useEffect(() => {
    if (changePassword.message && changePassword.statusCode === 200) {
      toast.success(changePassword.message);
      formikRef.current?.resetForm();
    } else if (changePassword.message && changePassword.statusCode !== 200) {
      toast.error(changePassword.message);
    }
    dispatch(resetChangePasswordState());
  }, [changePassword.message, dispatch]);

  return (
    <div className="flex justify-center items-center md:mt-4">
      <ToastContainer />
      <div className="flex w-full md:w-[50%] px-4  justify-center items-center ">
        <div className="w-full  ">
          <div className="flex flex-col ">
            <div className="flex">
              <span
                onClick={() =>
                  navigate("/verified-agent-dashboard/settings/setting-mobile")
                }
              >
                <Icon type="arrowBackSvg" className="mr-8 md:hidden" />
              </span>

              <Typography variant={TypographyVariant.SUBTITLE}>
                Password reset
              </Typography>
            </div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-light_gray mt-2"
            >
              Change your password
            </Typography>
          </div>

          <div className="pt-8">
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleForgotPassword}
              validationSchema={validationSchema}
            >
              {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
                <Form className="flex flex-col gap-5 text-gray-800">
                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="Existing password"
                    name="existingPassword"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />

                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="New password"
                    name="newPassword"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
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
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />

                  <Button
                    text="Save"
                    active={isValid && dirty}
                    bg_color="#007A61"
                    text_color="white"
                    loading={loading}
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
