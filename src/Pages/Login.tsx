import React, { useState} from 'react'
import AuthPages from '../Components/AuthPages';
import Typography from '../Components/Typography/Typography';
import { TypographyVariant } from '../Components/types';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from '../Components/Input/InputField';
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@gpiiltd/gpi-ui-library";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  //const [showConfirmPassword, setShowConfirmPassword] = useState(true);

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
      .max(20, "Password must not exceed 20 characters").trim(),
  });

  return (
    <AuthPages>
    <div className="w-full">
      <Typography
        variant={TypographyVariant.SUBTITLE}
        className="text-black "
      >
        Login
      </Typography>
      <Typography
        variant={TypographyVariant.NORMAL}
        className="text-light_gray "
      >
        Kindly fill in your details to login up
      </Typography>
      <div className="pt-10">
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
              <InputField
                placeHolder="Enter your email address"
                type="text"
                focusStyle="green"
                label="Email address"
                name="email"
              />
              <InputField
                placeHolder="Enter your password"
                type={showPassword ? "password" : "text"}
                focusStyle="green"
                label="Password"
                name="password"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              />
              

              <Button
                text="Login"
                active={isValid && dirty}
                bg_color="#007A61"
                text_color="white"
                onClick={() => console.log("Here we go loginnn")}
                
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
  )
}

export default Login
