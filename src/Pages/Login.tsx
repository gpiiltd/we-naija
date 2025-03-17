import { useEffect, useState } from "react";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography/Typography";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../Components/Input/InputField";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@gpiiltd/gpi-ui-library";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store/store";
import { triggerUserLogin } from "../redux/Services/user/UserServices";
import { resetState, setUserEmail } from "../redux/Slices/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const { error, userData, message, loading } = useSelector(
    (state: RootState) => state.user
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .trim(),
  });



const handleLogin = (values:any) => {
  const payload = {
    email: values.email.trim().toLowerCase(),
    password: values.password.trim(),
    user_type: "customer",
  };

  dispatch(triggerUserLogin(payload));
};

useEffect(() => {
  if (userData || error) {
    checkLoginStatus();
  }
}, [userData, error]);

const checkLoginStatus = () => {
  console.log("userdata", userData);
  if (error) {
    toast.error(message);
    dispatch(resetState())
    return;
  }
  if (
    Object.keys(userData).length > 0 &&
    userData.user.email.verified === true
  ) {
    toast.success("Login successful");
    const userEmail = userData?.user?.email?.address.address || "";
    dispatch(setUserEmail(userEmail));
    setTimeout(() => {
      navigate("/verified-agent-dashboard");
      dispatch(resetState())

    }, 3000);
  } else if (
    Object.keys(userData).length > 0 &&
    userData.user.email.verified === false
  ) {
    toast.error("User not verified");
    dispatch(setUserEmail(userData.user.email.address));
    setTimeout(() => {
      navigate("/otp");
    }, 3000);
  }
};
  
  return (
    <AuthPages>
      <ToastContainer />
      <div className="w-full">
        <Typography
          variant={TypographyVariant.SUBTITLE}
          className="text-black md:text-center "
        >
          Login
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-light_gray md:text-center"
        >
          Kindly fill in your details to login up
        </Typography>
        <div className="pt-10 ">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
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
                <div>
                  <InputField
                    placeHolder="Enter your password"
                    type={showPassword ? "password" : "text"}
                    focusStyle="green"
                    label="Password"
                    name="password"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <div onClick={() => navigate("/forgot-password")}>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-orange text-end pt-3 cursor-pointer"
                    >
                      Forgot password?
                    </Typography>
                  </div>
                </div>

                <Button
                  text="Login"
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
              Don't have an account?
            </Typography>
            <Link to="/">
              <Typography
                variant={TypographyVariant.SMALL}
                className="text-orange font-extrabold cursor-pointer"
              >
                Sign up
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </AuthPages>
  );
};

export default Login;
