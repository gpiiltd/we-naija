import React, { useState } from "react";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import { Button } from "@gpiiltd/gpi-ui-library";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import { useNavigate } from "react-router-dom";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    address: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
  });

  const handleSaveChanges = () => {
    setLoading(!loading);
    // console.log("Form values:", email);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 3000);
  };
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-[50%]">
        <div className="flex flex-col gap-2">
          <Typography variant={TypographyVariant.SUBTITLE}>
            Contact Information
          </Typography>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-gray-500 mt-2"
          >
            Edit your contact information{" "}
          </Typography>
        </div>
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
              <Form className="flex flex-col gap-5">
                <InputField
                  placeHolder="Enter your full name"
                  type="text"
                  focusStyle="green"
                  label="Full Name"
                  name="fullName"
                />
                <InputField
                  type="text"
                  focusStyle="green"
                  label="User Name"
                  name="userName"
                />
                <InputField
                  placeHolder="Enter your residential address"
                  type="text"
                  focusStyle="green"
                  label="Residential Address"
                  name="address"
                />

                <Button
                  text="Save Changes"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                  onClick={handleSaveChanges}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
