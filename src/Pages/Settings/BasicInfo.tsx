import React, { useState } from "react";
import { TypographyVariant } from "../../Components/types";
import Typography from "../../Components/Typography";
import { Link } from "react-router-dom";
import { Button } from "@gpiiltd/gpi-ui-library";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/SvgImagesAndIcons";
import { AiOutlineDown } from "react-icons/ai";
import DateModal from "../../Components/KYCpages/DateModal";

const BasicInfo = () => {
  const [formData, setFormData] = useState({
    address: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
  });

  const gender = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const nationality = [
    "Nigerian",
    "Ghanaian",
    "Kenyan",
    "South African",
    "British",
    "Canadian",
    "Australian",
    "New Zealand",
    "United States",
  ];
  const [nationalityDropdown, setNationalityDropdown] = useState({
    selected: "",
    isOpen: false,
  });
  const [genderDropdown, setGenderDropdown] = useState({
    selected: "",
    isOpen: false,
  });

  const handleGenderSelect = (state: string) => {
    setGenderDropdown({ selected: state, isOpen: false });
  };

  const handleNationalitySelect = (state: string) => {
    setNationalityDropdown({ selected: state, isOpen: false });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
  };

  const handleDateSelect = (date: string) => {
    setFormData({ ...formData, dateOfBirth: date });
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
    <div className="flex justify-between items-start gap-10 mx-20 mt-4">
      <div className="hidden md:flex  gap-2 w-32 h-32 bg-white items-center justify-center rounded-xl  border border-gray-200">
        <Icon type="avatar" className="w-20 h-20" />
      </div>
      <div className="w-[80%]">
        <div className="flex flex-col gap-2">
          <Typography variant={TypographyVariant.SUBTITLE}>
            Basic Information
          </Typography>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-gray-500"
          >
            Edit your basic information{" "}
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
                  placeHolder="Enter your email address"
                  type="text"
                  focusStyle="green"
                  label="Email address"
                  name="email"
                />

                <div className="relative">
                  {/* <label className="text-sm font-medium mb-1">By State</label> */}
                  <input
                    type="text"
                    value={genderDropdown.selected}
                    placeholder="Gender"
                    readOnly
                    onClick={() =>
                      setGenderDropdown({
                        ...genderDropdown,
                        isOpen: !genderDropdown.isOpen,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-4 text-md focus:outline-teal-700  text-gray-400"
                  />
                  <div
                    className="absolute right-2 top-6 cursor-pointer text-gray-500"
                    onClick={() =>
                      setGenderDropdown({
                        ...genderDropdown,
                        isOpen: !genderDropdown.isOpen,
                      })
                    }
                  >
                    <AiOutlineDown size={20} />
                  </div>
                  {genderDropdown.isOpen && (
                    <ul className="absolute w-full border border-gray-300 bg-white rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
                      {gender.map((state, index) => (
                        <li
                          key={index}
                          onClick={() => handleGenderSelect(state)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                        >
                          {state}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onClick={() => setIsModalOpen(true)} // Open modal on click
                    readOnly
                    placeholder=" " // Add a space to trigger the floating effect
                    className="border border-gray-300 rounded-md w-full h-14 p-1 pb-0 text-gray-400 pl-4 pt-2 focus:outline-teal-700"
                  />
                  <label
                    className={`absolute left-4 top-2 transition-all duration-200 transform ${
                      formData.dateOfBirth
                        ? "top-[2px] left-2  md:text-md text-gray-700"
                        : " text-2xl text-gray-500"
                    }`}
                  >
                    Date of birth
                  </label>
                  <Icon
                    type="calendar"
                    className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </div>

                <div className="relative -mt-2">
                  {/* <label className="text-sm font-medium mb-1">By State</label> */}
                  <input
                    type="text"
                    value={nationalityDropdown.selected}
                    placeholder="Nationality"
                    readOnly
                    onClick={() =>
                      setNationalityDropdown({
                        ...nationalityDropdown,
                        isOpen: !nationalityDropdown.isOpen,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-4 text-md focus:outline-teal-700  text-gray-400"
                  />
                  <div
                    className="absolute right-2 top-6 cursor-pointer text-gray-500"
                    onClick={() =>
                      setNationalityDropdown({
                        ...nationalityDropdown,
                        isOpen: !nationalityDropdown.isOpen,
                      })
                    }
                  >
                    <AiOutlineDown size={20} />
                  </div>
                  {nationalityDropdown.isOpen && (
                    <ul className="absolute w-full border border-gray-300 bg-white rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto z-50">
                      {nationality.map((state, index) => (
                        <li
                          key={index}
                          onClick={() => handleNationalitySelect(state)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                        >
                          {state}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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

      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default BasicInfo;
